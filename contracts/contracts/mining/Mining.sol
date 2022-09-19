//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../interface/IStake.sol";
import "../interface/IReward.sol";
import "../interface/ITool.sol";
import "../PlayerCharacters.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

/*
    This is the interface that all base tools purchasable from the shop must implement.
    - When you stake, it needs to know the contract address of the staked token per user.
*/

contract Mining is IERC721Receiver, IStake, ReentrancyGuard {
    string public constant SKILL_NAME = "MINING";

    // Character NFTs
    PlayerCharacters public characterContract;
    // Tokens addresses that can be rewarded
    ITool[] public toolsContracts;
    // Tools addresses that can be staked
    IReward[] public rewardsContracts;

    // Mapping of player addresses to their staked tokens
    mapping(address => StakedCharacter) public stakedCharacters;
    mapping(address => StakedTool) public stakedTools;
    mapping (address => uint256) public playerLastUpdate;


    constructor(
        PlayerCharacters _characterContract,
        ITool[] memory _toolsContracts,
        IReward[] memory _rewardsContracts
    ) {
        characterContract = _characterContract;
        toolsContracts = _toolsContracts;
        rewardsContracts = _rewardsContracts;
    }

    ////////////////////////////////////////////////////////////////////
    // Core //
    ////////////////////////////////////////////////////////////////////


    // When you stake, you transfer both:
    // - A pickaxe token (from either UpgradedPickaxes or BasePickaxes) to the staking contract
    // - A character token (from PlayerCharacters) to the staking contract
    function stake(
        uint256 _playerTokenId,
        ITool _toolContractAddress,
        uint256 _toolTokenId
    ) external nonReentrant {
        // Must own the character they're trying to stake
        require(
            characterContract.ownerOf(_playerTokenId) == msg.sender,
            "You must own the character to stake it"
        );

        // Must own the tool they're trying to stake
        require(
            _toolContractAddress.ownsToken(_toolTokenId, msg.sender),
            "You must own the tool to stake it"
        );

        // Check if they already have a player/tool staked and send it back.
        if (stakedCharacters[msg.sender].isStaked == true) {
            // Update mappings
            stakedCharacters[msg.sender] = StakedCharacter(
                stakedCharacters[msg.sender].characterTokenId,
                false
            );

            // Transfer character token to player
            characterContract.safeTransferFrom(
                address(this),                                      // from 
                msg.sender,                                         // to 
                stakedCharacters[msg.sender].characterTokenId       // id
            );
        }

        if (stakedTools[msg.sender].isStaked == true) {
            // Transfer tool token to player
            stakedTools[msg.sender].toolContract.safeTransferFrom(
                address(this),      // from 
                msg.sender,         // to 
                stakedTools[msg.sender].toolTokenId,       // id
                1,                  // amount
                "Unstaking tool"    // data
            );

            stakedTools[msg.sender] = StakedTool(
                stakedTools[msg.sender].toolContract,
                _toolTokenId,
                false
            );
        }

        // Transfer character token to staking contract
        characterContract.safeTransferFrom(
            msg.sender,         // from 
            address(this),      // to 
            _playerTokenId      // id
        );

        // Transfer tool token to staking contract
        _toolContractAddress.safeTransferFrom(
            msg.sender,         // from 
            address(this),      // to 
            _toolTokenId,       // id
            1,                  // amount
            "Staking tool"      // data
        );

        // Update mappings
        stakedCharacters[msg.sender] = StakedCharacter(
            _playerTokenId,
            true
        );

        stakedTools[msg.sender] = StakedTool(_toolContractAddress, _toolTokenId, true);

        if (playerLastUpdate[msg.sender] != 0) {
            Reward[] memory owedRewards = calculateOwedRewards(msg.sender);
            uint256 owedExperiencePoints = calculateOwedExperiencePoints(msg.sender);

            // For each reward, transfer the amount to the player
            for (uint256 i = 0; i < owedRewards.length; i++) {
                owedRewards[i].rewardContract.transfer(
                    msg.sender,
                    owedRewards[i].amount
                );
            }

            // Call updatePlayerSkill from this contract
            characterContract.updatePlayerSkill(
                stakedCharacters[msg.sender].characterTokenId,
                SKILL_NAME,
                owedExperiencePoints
            );

        }
        // Update the player's last update
        playerLastUpdate[msg.sender] = block.timestamp;
    }

    function unstake() external nonReentrant {
        // Must have > 0 characters staked to unstake
        require(
            stakedCharacters[msg.sender].isStaked == true,
            "You do not have any characters staked to unstake"
        );

        // Must have > 0 tools staked to unstake
        require(
            stakedTools[msg.sender].isStaked == true,
            "You do not have any tools staked to unstake"
        );

        // Transfer tool token to player
        stakedTools[msg.sender].toolContract.safeTransferFrom(
            address(this),      // from 
            msg.sender,         // to 
            stakedTools[msg.sender].toolTokenId,       // id
            1,                  // amount
            "Unstaking tool"    // data
        );

        // Transfer character token to player
        characterContract.safeTransferFrom(
            address(this),      // from 
            msg.sender,         // to 
            stakedCharacters[msg.sender].characterTokenId      // id
        );

        // Update mappings
        stakedCharacters[msg.sender] = StakedCharacter(
            stakedCharacters[msg.sender].characterTokenId,
            false
        );

        stakedTools[msg.sender] = StakedTool(
            stakedTools[msg.sender].toolContract,
            stakedTools[msg.sender].toolTokenId,
            false
        );
    }

    function claimRewardsAndExperiencePoints() external nonReentrant {
        Reward[] memory owedRewards = calculateOwedRewards(msg.sender);
        uint256 owedExperiencePoints = calculateOwedExperiencePoints(msg.sender);

        // For each reward, transfer the amount to the player
        for (uint256 i = 0; i < owedRewards.length; i++) {
            owedRewards[i].rewardContract.transfer(
                msg.sender,
                owedRewards[i].amount
            );
        }

        // Update the character NFT's experience points (TODO: It won't have permission to do this)
        characterContract.updatePlayerSkill(
            stakedCharacters[msg.sender].characterTokenId,
            SKILL_NAME,
            owedExperiencePoints
        );

        // Update the player's last update
        playerLastUpdate[msg.sender] = block.timestamp;
    }
  
    ////////////////////////////////////////////////////////////////////
    // View //
    ////////////////////////////////////////////////////////////////////

    // The tokens that are owed to the player.
    // Rewards are based on the experience level of the character nft's skill
    // and the stats of the tool nft.
    function calculateOwedRewards(
        address _playerAddress
    ) public view returns (Reward[] memory) {
        // The power level determines the rarity level of the rewards that can be given.
        // from the rewardsContracts array (they are in order of rarity)
        ITool.ToolStat memory toolPowerStats = stakedTools[_playerAddress].toolContract.getToolStats(
            stakedTools[_playerAddress].toolTokenId
        );

        uint256 characterSkillLevel = characterContract.getSkillLevel(
            stakedCharacters[_playerAddress].characterTokenId,
            SKILL_NAME
        );

        Reward[] memory rewards = new Reward[](toolPowerStats.powerLevel);

        uint256 rewardIndex = 0;
        // Iterate over power level to 1 
        for (uint256 i = toolPowerStats.powerLevel; i > 0; i--) {
            // You get i * character skill level * tool usage rate of the rewardIndex'th reward
            // TODO: This is always going to round down. We cannot have decimal rewards.
            uint256 rewardAmountPerBlock = i * characterSkillLevel * toolPowerStats.usageRate;
            Reward memory reward = Reward(
                rewardsContracts[rewardIndex],
                rewardAmountPerBlock * (block.timestamp - playerLastUpdate[_playerAddress])
            );
            rewards[rewardIndex] = reward;
            rewardIndex++;
        }

        return rewards;
    }

    // The experience points that are owed to the player.
    function calculateOwedExperiencePoints(
        address _playerAddress
    ) public view returns (uint256) {
        // TODO: Probably figure this out a bit more,
        // For now, we just give 1 experience point per block.
        return 1 * (block.timestamp - playerLastUpdate[_playerAddress]);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"));
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) external returns (bytes4) {
        return bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"));
    }
}