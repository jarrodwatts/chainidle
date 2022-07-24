//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IReward {
    function getRarityLevel() external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);
}