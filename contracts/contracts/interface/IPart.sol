//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface IPart {
    struct PartStat {
        uint256 powerLevelIncreaseBasisPoints;
        uint256 usageRateIncreaseBasisPoints;
    }

    // This should probably also expose the common functionality between ERC-721 and ERC-1155 tokens
    // Since we can have multiwrap (upgraded) tools or base tools

    function getPartStats(uint256 _tokenId) external view returns (PartStat memory);

    function updatePartStats(
        uint256 _tokenId,
        uint256 _powerLevelIncreaseBasisPoints, 
        uint256 _usageRateIncreaseBasisPoints
    ) external;
}