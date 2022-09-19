//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../../interface/ITool.sol";
import "@thirdweb-dev/contracts/base/ERC1155Drop.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

/*
    ERC-1155 Collection of Pickaxe NFTs for mining
*/
contract Pickaxes is ERC1155Drop, PermissionsEnumerable, ITool {
    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping(uint256 => ToolStat) public toolStats;

    function updateToolStats(
        uint256 _tokenId,
        uint256 _powerLevel,
        uint256 _usageRate
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        toolStats[_tokenId] = ToolStat(_powerLevel, _usageRate);
    }

    function getToolStats(uint256 _tokenId)
        public
        view
        returns (ToolStat memory)
    {
        return toolStats[_tokenId];
    }

    function ownsToken(uint256 _tokenId, address _address)
        public
        view
        override(ITool)
        returns (bool)
    {
        uint256 bal = balanceOf[_address][_tokenId];
        return bal > 0;
    }

    function toolBalance(address _owner, uint256 _tokenId)
        public
        view
        override(ITool)
        returns (uint256)
    {
        return balanceOf[_owner][_tokenId];
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) public override(ERC1155, ITool) {
        ERC1155.safeTransferFrom(from, to, tokenId, amount, data);
    }

    function lazyMint(
        uint256 _amount,
        string calldata _baseURIForTokens,
        bytes calldata _data
    ) public virtual override returns (uint256 batchId) {
        uint256 tokenId = nextTokenIdToMint();
        super.lazyMint(_amount, _baseURIForTokens, _data);
        uint256 powerLevel = nextTokenIdToMint();
        uint256 usageRate = 1;
        updateToolStats(tokenId, powerLevel, usageRate);

        return batchId;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient
    )
        ERC1155Drop(
            _name,
            _symbol,
            _royaltyRecipient,
            _royaltyBps,
            _primarySaleRecipient
        )
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupPrimarySaleRecipient(_primarySaleRecipient);
    }
}
