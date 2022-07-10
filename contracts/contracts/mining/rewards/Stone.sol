//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../../interface/IReward.sol";
import "@thirdweb-dev/contracts/token/TokenERC20.sol";

/*
    ERC-1155 Collection of Pickaxe NFTs for mining
*/
contract Stone is TokenERC20, IReward {
    uint256 rarityLevel = 1;

    function getRarityLevel() external view returns (uint256) {
        return rarityLevel;
    }
    
    constructor() TokenERC20(primarySaleRecipient) {}
}