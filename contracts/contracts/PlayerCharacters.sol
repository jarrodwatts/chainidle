//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@thirdweb-dev/contracts/base/ERC721SignatureMint.sol";
import "@thirdweb-dev/contracts/extension/Permissions.sol";

/**
    This is the player NFT Drop contract.
    - It is an ERC-721A NFT Collection contract that contains lazy-minted "player" NFTs with on-chain metadata.
    - Each player NFT contains a variable amount of mappings that represent the player's skill experience.

    For example, a player can have a mapping for "strength" with a value of 500, and a mapping for "agility" with a value of 321.
    These metadata mappings must ONLY be updatable by the permitted roles configured.
*/

contract PlayerCharacters is ERC721SignatureMint, Permissions {
    // Mapping of token ID -> mapping of skill -> experience.
    mapping (uint256 => mapping(string => uint256)) public playerSkillExperience;

    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps,
        address _primarySaleRecipient
    ) ERC721SignatureMint(_name, _symbol, _royaltyRecipient, _royaltyBps, _primarySaleRecipient) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function updatePlayerSkill(
        uint256 _tokenId, 
        string calldata _skill, 
        uint256 _value
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        playerSkillExperience[_tokenId][_skill] = playerSkillExperience[_tokenId][_skill] +  _value;
    }

    // playerSkillExperience is the raw XP data.
    // There is a formula to convert raw XP to level
    // - To be level 1, you need 69 XP points.
    // - To be level 2, you need 69 + (69 * 0.069) = 73.761
    // - To be level 3, you need 73.761 + (73.761 * 0.069) = 78.850509
    // - To be level 4, you need 78.850509 + (78.850509 * 0.069) = 84.29119412
    // This repeats until you reach level 99, where you need 47716.01882 XP points.
    // Anything above that number is considered level 99 and cannot be claimed anymore.

    // This has got to be the worst way possibkle to write it but math is too hard for me to reverse this into a formula
    function getSkillLevel(uint256 _tokenId, string calldata _skill) public view returns (uint256) {
        uint256 experienceOfPlayerSkill = playerSkillExperience[_tokenId][_skill];
        uint256 nice = 69;
        uint256 lol = 1000;
        uint256 level = 1;

        if (experienceOfPlayerSkill < 69) {
            return level;
        } else {
            uint256 experienceRequired = 69;

            while (experienceOfPlayerSkill >= experienceRequired) {
                experienceRequired = experienceRequired +  (experienceRequired * (nice * lol));
                level = level + 1;
            }
            return level;
        }
    }
}

