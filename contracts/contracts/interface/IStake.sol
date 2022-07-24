//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./ITool.sol";
import "./IReward.sol";

/*
This is an interface that all the 'staker' contracts must implement.
Users stake their Player ERC-1155 NFT along with a Tool (ERC-1155) or Upgraded Tool (ERC-721)

Each tool has:
    - Power Level (What level rarity tokens can be earned)
    - Usage Rate (How fast rewards are provided)

Each player has:
    - A set of skills and experience points for each skill

The staking contracts will therefore have:
- A way to stake the tool + player ERC-1155 NFT (Begin action)
- A way to unstake the tool + player ERC-1155 NFT (End action)
- A way to calculate the rewards the player is currently owed
- A way to calculate the experience points the player is currently owed
- A way to claim the rewards the player is currently owed
*/

interface IStake {
    struct StakedTool {
        ITool toolContract;
        uint256 toolTokenId;
        bool isStaked;
    }

    struct Staker {
        address stakerAddress;
        bool isStaked;
    }
    
    struct StakedCharacter {
        uint256 characterTokenId;
        bool isStaked;
    }

    struct Reward {
        IReward rewardContract;
        uint256 amount;
    }

    ////////////////////////////////////////////////////////////////////
    // Core //
    ////////////////////////////////////////////////////////////////////

    function stake(
        uint256 _playerTokenId,
        ITool _toolContractAddress,
        uint256 _toolTokenId
    ) external;

    function unstake(
        uint256 _playerTokenId,
        uint256 _toolTokenId
    ) external;

    function claimRewardsAndExperiencePoints() external;

    ////////////////////////////////////////////////////////////////////
    // Update //
    ////////////////////////////////////////////////////////////////////

    // TODO: Way to add a token to the rewards pool


    ////////////////////////////////////////////////////////////////////
    // View //
    ////////////////////////////////////////////////////////////////////

    // The tokens that are owed to the player.
    function calculateOwedRewards(
        address _playerAddress
    ) external view returns (Reward[] memory);

    // The experience points that are owed to the player.
    function calculateOwedExperiencePoints(
        address _playerAddress
    ) external view returns (uint256);
}