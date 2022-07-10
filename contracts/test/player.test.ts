import hre from "hardhat";
import { expect } from "chai";
import { ethers } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Player", function () {
  let playerFactory: ethers.ContractFactory;
  let player: any;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    playerFactory = await hre.ethers.getContractFactory("Player");
    [owner, addr1, addr2, ...addrs] = await hre.ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    player = await playerFactory.deploy();
  });

  it("Should update a player skill when it doesn't exist", async function () {
    const skill = "skill";
    const level = 1;

    await player.connect(owner).updatePlayerSkill(owner.address, skill, level);

    // View the playerSkillExperience mapping and check correct
    const playerSkillExperience = await player
      .connect(owner)
      .playerSkillExperience(owner.address, skill);
    expect(playerSkillExperience).to.equal(level);
  });

  it("Should update a player skill when it already exists", async function () {
    const skill = "skill";
    const level = 1;

    await player.connect(owner).updatePlayerSkill(owner.address, skill, level);

    // View the playerSkillExperience mapping and check correct
    const playerSkillExperience = await player
      .connect(owner)
      .playerSkillExperience(owner.address, skill);
    expect(playerSkillExperience).to.equal(level);

    // Update the playerSkillExperience mapping and check correct
    const newLevel = 2;
    await player
      .connect(owner)
      .updatePlayerSkill(owner.address, skill, newLevel);

    const playerSkillExperience2 = await player
      .connect(owner)
      .playerSkillExperience(owner.address, skill);
    expect(playerSkillExperience2).to.equal(level + newLevel);
  });
});
