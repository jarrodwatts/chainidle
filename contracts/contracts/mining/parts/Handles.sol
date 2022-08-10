//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../../interface/IPart.sol";
import "@thirdweb-dev/contracts/drop/DropERC1155.sol";

/*
    ERC-1155 Collection of Pickaxe NFTs for mining
*/
contract Handles is DropERC1155, IPart {
    mapping (uint256 => PartStat) public partStats;

    function updatePartStats(
        uint256 _tokenId, 
        uint256 _powerLevelIncreaseBasisPoints, 
        uint256 _usageRateIncreaseBasisPoints
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        partStats[_tokenId] = PartStat(
            _powerLevelIncreaseBasisPoints, 
            _usageRateIncreaseBasisPoints
        );
    }

    function getPartStats(uint256 _tokenId) public view returns (PartStat memory) {
        return partStats[_tokenId];
    }

}