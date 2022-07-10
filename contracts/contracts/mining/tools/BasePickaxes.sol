//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../../interface/ITool.sol";
import "@thirdweb-dev/contracts/drop/DropERC1155.sol";

/*
    ERC-1155 Collection of Pickaxe NFTs for mining
*/
contract Pickaxes is DropERC1155, ITool {
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping (uint256 => ToolStat) public toolStats;

    function updateToolStats(
        uint256 _tokenId, 
        uint256 _powerLevel, 
        uint256 _usageRate
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        toolStats[_tokenId] = ToolStat(_powerLevel, _usageRate);
    }

    function getToolStats(uint256 _tokenId) public view returns (ToolStat memory) {
        return toolStats[_tokenId];
    }

    function balanceOf(
        address _owner, 
        uint256 _tokenId
    ) public view override(ERC1155Upgradeable, ITool) returns (uint256) {
        return ERC1155Upgradeable.balanceOf(_owner, _tokenId);
    }

    function safeTransferFrom(
        address from, 
        address to, 
        uint256 tokenId, 
        uint256 amount,
        bytes memory data
    ) public override(ERC1155Upgradeable, ITool) {
        return ERC1155Upgradeable.safeTransferFrom(from, to, tokenId, amount, data);

    }

    // Override lazyMint function to add on-chain info
    function lazyMint(uint256 _amount, string calldata _baseURIForTokens) external override onlyRole(MINTER_ROLE) {
        DropERC1155(this).lazyMint(_amount, _baseURIForTokens);

        // Then, update the power level and usage rate of the newly lazy minted token
        updateToolStats(nextTokenIdToMint - 1, nextTokenIdToMint, 1);
    }
}