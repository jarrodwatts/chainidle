//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../../interface/ITool.sol";
import "@thirdweb-dev/contracts/base/ERC1155LazyMint.sol";
import "@thirdweb-dev/contracts/extension/DropSinglePhase1155.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "@thirdweb-dev/contracts/extension/PrimarySale.sol";
import "@thirdweb-dev/contracts/lib/CurrencyTransferLib.sol";

/*
    ERC-1155 Collection of Pickaxe NFTs for mining
*/
contract Pickaxes is ERC1155LazyMint, DropSinglePhase1155, PermissionsEnumerable, PrimarySale, ITool {
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

    function ownsToken(uint256 _tokenId, address _address) public view override(ITool) returns (bool) {
        uint256 bal = balanceOf[_address][_tokenId];
        return bal > 0;
    }

    function toolBalance(address _owner, uint256 _tokenId) public view override(ITool) returns (uint256) {
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
    ) ERC1155LazyMint(_name, _symbol, _royaltyRecipient, _royaltyBps) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupPrimarySaleRecipient(_primarySaleRecipient);
    }

    function collectPriceOnClaim(
        address _primarySaleRecipient,
        uint256 _quantityToClaim,
        address _currency,
        uint256 _pricePerToken
    ) internal virtual override(DropSinglePhase1155) {
        if (_pricePerToken == 0) {
            return;
        }

        uint256 totalPrice = _quantityToClaim * _pricePerToken;

        if (_currency == CurrencyTransferLib.NATIVE_TOKEN) {
            if (msg.value != totalPrice) {
                revert("Must send total price.");
            }
        }

        address saleRecipient = _primarySaleRecipient == address(0) ? primarySaleRecipient() : _primarySaleRecipient;
        CurrencyTransferLib.transferCurrency(_currency, msg.sender, saleRecipient, totalPrice);
    }

    function transferTokensOnClaim(
        address _to,
        uint256 _tokenId,
        uint256 _quantityBeingClaimed
    ) internal virtual override {
        _mint(_to, _tokenId, _quantityBeingClaimed, "");
    }

    function _canSetClaimConditions() internal view virtual override returns (bool) {
        return msg.sender == owner();
    }

    function _canSetPrimarySaleRecipient()
        internal
        override
        view
        returns (bool)
    {
        return hasRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

}