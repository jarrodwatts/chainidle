//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IReward {
    function getRarityLevel() external view returns (uint256);
}