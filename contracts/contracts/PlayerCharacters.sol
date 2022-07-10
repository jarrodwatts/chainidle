//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@thirdweb-dev/contracts/drop/DropERC721.sol";

/**
    This is the player NFT Drop contract.
    - It is an ERC-721 NFT Collection contract that contains lazy-minted "player" NFTs with on-chain metadata.
    - It implements thirdweb contracts to make it "droppable", meaning other wallets can claim/mint the lazy-minted NFTs.
    - Each player NFT contains a variable amount of mappings that represent the player's skill experience.

    For example, a player can have a mapping for "strength" with a value of 500, and a mapping for "agility" with a value of 321.
    These metadata mappings must ONLY be updatable by the permitted roles configured.
*/
contract PlayerCharacters is DropERC721 {

    // Mapping of token ID -> mapping of skill -> experience.
    mapping (uint256 => mapping(string => uint256)) public playerSkillExperience;

    function updatePlayerSkill(uint256 _tokenId, string calldata _skill, uint256 _value) public 
    onlyRole(DEFAULT_ADMIN_ROLE)
    {
        playerSkillExperience[_tokenId][_skill] = playerSkillExperience[_tokenId][_skill] +  _value;
    }
    
}
