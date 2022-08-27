//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../../interface/IReward.sol";
import "@thirdweb-dev/contracts/base/ERC20Base.sol";

contract Iron is ERC20Base, IReward {
    uint256 rarityLevel = 2;

    function getRarityLevel() external view returns (uint256) {
        return rarityLevel;
    }

    function transfer(address to, uint256 amount) public override(ERC20, IReward) returns (bool) {
        return super.transfer(to, amount);
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC20Base(_name, _symbol) {
    }
    
}