//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@thirdweb-dev/contracts/multiwrap/Multiwrap.sol";
import "../../interface/IPart.sol";
import "../../interface/ITool.sol";

/**
*/
contract UpgradedPickaxes is Multiwrap, ITool {
    enum TokenTypes {
        part,
        tool
    }

    // Array of contracts that are allowed to be wrapped and their types
    mapping(address => TokenTypes) public tokenTypes;

    bytes32 private constant MINTER_ROLE = keccak256("MINTER_ROLE");

    mapping (uint256 => ToolStat) public toolStats;

    constructor() Multiwrap(nativeTokenWrapper) {}

    function addAllowedToken(address _token, TokenTypes _type) public onlyRole(DEFAULT_ADMIN_ROLE) {
        tokenTypes[_token] = _type;
    }

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

    ////////////////////////////////////////////////////////////////////
    // Overrides //
    ////////////////////////////////////////////////////////////////////

    function balanceOf(
        address _owner, 
        uint256 _tokenId
    ) public view override returns (uint256) {
        return ERC721Upgradeable.balanceOf(_owner);
    }

    function ownsToken(uint256 _tokenId, address _address) public view override returns (bool) {
        return ERC721Upgradeable.ownerOf(_tokenId) == _address;
    }

    function safeTransferFrom(
        address from, 
        address to, 
        uint256 tokenId, 
        uint256 amount,
        bytes memory data
    ) public override {
        return ERC721Upgradeable.safeTransferFrom(from, to, tokenId);
    }

    function wrap(
        Token[] calldata _tokensToWrap,
        string calldata _uriForWrappedToken,
        address _recipient
    ) external payable override virtual nonReentrant onlyRoleWithSwitch(MINTER_ROLE) returns (uint256 tokenId)  {
        // Check all tokens to wrap are allowed to be wrapped
           
        // Enforce only 1 part and only 1 tool allowed to be wrapped
        // This also ensures they are the right contracts
        require(
            _tokensToWrap.length == 2 &&
            (
                tokenTypes[_tokensToWrap[0].assetContract] == TokenTypes.part &&
                tokenTypes[_tokensToWrap[1].assetContract] == TokenTypes.tool
            ) || (
                tokenTypes[_tokensToWrap[0].assetContract] == TokenTypes.tool &&
                tokenTypes[_tokensToWrap[1].assetContract] == TokenTypes.part
            ),
            "Exactly one part and one tool allowed to be wrapped"
        );

        uint256 tokenIdBeingMinted = nextTokenIdToMint;

        Multiwrap(this).wrap(_tokensToWrap, _uriForWrappedToken, _recipient);

        // Extract the tool and the part from the tokens being wrapped by checking the type
        ITool toolContractAddress;
        IPart partContractAddress;
        uint256 toolTokenId;
        uint256 partTokenId;

        for (uint256 i = 0; i < _tokensToWrap.length; i++) {
            if (tokenTypes[_tokensToWrap[i].assetContract] == TokenTypes.tool) {
                toolContractAddress = ITool(_tokensToWrap[i].assetContract);
                toolTokenId = _tokensToWrap[i].tokenId;
            } else if (tokenTypes[_tokensToWrap[i].assetContract] == TokenTypes.part) {
                partContractAddress = IPart(_tokensToWrap[i].assetContract);
                partTokenId = _tokensToWrap[i].tokenId;
            }
        }

        // Calculate the power level and usage rate of the tokens being wrapped.
        ToolStat memory newToolStats = calculateNewToolStats(
            toolContractAddress, 
            toolTokenId, 
            partContractAddress, 
            partTokenId
        );

        // Update the power level and usage rate of the newly minted token.
        updateToolStats(tokenIdBeingMinted, newToolStats.powerLevel, newToolStats.usageRate);

        return tokenIdBeingMinted;
    }


    ////////////////////////////////////////////////////////////////////
    // View //
    ////////////////////////////////////////////////////////////////////


    function calculateNewToolStats(
        ITool _tool, 
        uint256 _toolTokenId, 
        IPart _part, 
        uint256 _partTokenId
    ) public view returns (ToolStat memory) {
        ToolStat memory thisToolStats = _tool.getToolStats(_toolTokenId);
        IPart.PartStat memory thisPartStats = _part.getPartStats(_partTokenId);

        // New power level = thisToolStats.powerLevel increased by the powerLevelIncreaseBasisPoints
        uint256 newPowerLevel = thisToolStats.powerLevel + ((thisPartStats.powerLevelIncreaseBasisPoints / 100 / 100) * thisToolStats.powerLevel);
        uint256 newUsageRate = thisToolStats.usageRate + ((thisPartStats.usageRateIncreaseBasisPoints / 100 / 100) * thisToolStats.usageRate);

        return ToolStat(newPowerLevel, newUsageRate);
    }
}
