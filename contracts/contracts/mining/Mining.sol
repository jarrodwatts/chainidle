//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../interface/IStake.sol";
import "../interface/IReward.sol";
import "../interface/ITool.sol";
import "../PlayerCharacters.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


/*
    This is the interface that all base tools purchasable from the shop must implement.
    - When you stake, it needs to know the contract address of the staked token per user.
*/

contract Mining is IStake, ReentrancyGuard {
    bytes32 public constant SKILL_NAME = bytes32("Mining");

    // Character NFTs
    PlayerCharacters public characterContract;
    // Tokens addresses that can be rewarded
    ITool[] public toolsContracts;
    // Tools addresses that can be staked
    IReward[] public rewardsContracts;

    // Mapping of player addresses to their staked tokens
    mapping(address => uint256) public stakedCharacters;
    mapping(address => StakedTool) public stakedTools;

    constructor(
        PlayerCharacters _characterContract,
        IReward[] memory _rewardsContracts
    ) {
        characterContract = _characterContract;
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
        // Must have > 0 characters to stake
        require(
            characterContract.balanceOf(msg.sender) > 0,
            "You do not have the character token to stake"
        );

        // Must have > 0 tools to stake
        require(
            _toolContractAddress.balanceOf(msg.sender, _toolTokenId) > 0,
            "You do not have the tool token to stake"
        );

        // Transfer character token to staking contract
        characterContract.safeTransferFrom(
            msg.sender,         // from 
            address(this),      // to 
            _playerTokenId     // id
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
        stakedCharacters[msg.sender] = _playerTokenId;
        stakedTools[msg.sender] = StakedTool(_toolContractAddress, _toolTokenId);
    }

    function unstake(
        uint256 _playerTokenId,
        address _toolContractAddress,
        uint256 _toolTokenId
    ) external nonReentrant {
        // TODO: Implement

    }

    function claimRewardsAndExperiencePoints(
        address _playerAddress
    ) external nonReentrant {
        // TODO: Implement

    }

    
    ////////////////////////////////////////////////////////////////////
    // View //
    ////////////////////////////////////////////////////////////////////


    // The name of the skill that is improved by this staking contract.
    function skillName() public pure returns (bytes32) {
        return SKILL_NAME;
    }

    // The tokens that are owed to the player.
    function calculateRewards(
        address _playerAddress
    ) external view returns (Reward[] memory) {
        // TODO: Implement

    }

    // The experience points that are owed to the player.
    function calculateExperiencePoints(
        address _playerAddress
    ) external view returns (uint256) {
        // TODO: Implement

    }
}