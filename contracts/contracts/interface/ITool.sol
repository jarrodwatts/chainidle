//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

interface ITool {
    struct ToolStat {
        uint256 powerLevel;
        uint256 usageRate;
    }

    function getToolStats(uint256 _tokenId) external view returns (ToolStat memory);

    function updateToolStats(uint256 _tokenId, uint256 _powerLevel, uint256 _usageRate) external;

    function balanceOf(address _owner, uint256 _tokenId) external view returns (uint256);

    function safeTransferFrom(
        address from, 
        address to, 
        uint256 tokenId, 
        uint256 amount,
        bytes memory data
    ) external;

}