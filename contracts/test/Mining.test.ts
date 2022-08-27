/* eslint-disable prettier/prettier */
import { expect } from "chai";
import { ethers } from "hardhat";

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { formatBytes32String } from "ethers/lib/utils";

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Mining", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshopt in every test.
  async function setupMiningFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const PlayerCharactersFactory = await ethers.getContractFactory(
      "PlayerCharacters"
    );
    const BasePickaxesFactory = await ethers.getContractFactory("Pickaxes");
    const MiningFactory = await ethers.getContractFactory("Mining");
    const StoneFactory = await ethers.getContractFactory("Stone");
    const IronFactory = await ethers.getContractFactory("Iron");

    // Deploy Characters
    const playerCharacters = await PlayerCharactersFactory.connect(
      owner
    ).deploy("name", "symbol", owner.address, 500, owner.address);
    await playerCharacters.deployed();

    // Deploy Pickaxes (Tool)
    const basePickaxes = await BasePickaxesFactory.connect(owner).deploy(
      "name",
      "symbol",
      owner.address,
      500,
      owner.address
    );
    await basePickaxes.deployed();

    // Deploy Stone (Token 1)
    const stone = await StoneFactory.connect(owner).deploy("name", "symbol");
    await stone.deployed();

    // Deploy Iron (Token 2)
    const iron = await IronFactory.connect(owner).deploy("name", "symbol");
    await iron.deployed();

    // Deploy Mining (Stake)
    const mining = await MiningFactory.connect(owner).deploy(
      playerCharacters.address,
      [basePickaxes.address],
      [(stone.address, iron.address)]
    );
    await mining.deployed();

    // === Set up Player Characters ===
    await playerCharacters.connect(owner).mintTo(addr1.address, "uri1");
    await playerCharacters.connect(owner).mintTo(addr2.address, "uri2");
    await playerCharacters
      .connect(owner)
      .grantRole(formatBytes32String("UPGRADER_ROLE"), mining.address);

    // === Set up Pickaxes ===
    await basePickaxes.connect(owner).lazyMint(10, "basePickaxesURI", []);
    await basePickaxes.connect(owner).setClaimConditions(
      0,
      {
        currency: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        maxClaimableSupply: 100,
        merkleRoot:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        pricePerToken: 0,
        quantityLimitPerTransaction: 100,
        startTimestamp: 0,
        supplyClaimed: 0,
        waitTimeInSecondsBetweenClaims: 0,
      },
      false
    );
    await basePickaxes.connect(addr1).claim(
      addr1.address,
      0,
      1,
      "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      0,
      {
        proof: [
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        ],
        maxQuantityInAllowlist: 0,
      },
      []
    );

    // === Set up Stone + Iron ===
    await stone.connect(owner).mint(mining.address, 100);
    await iron.connect(owner).mint(mining.address, 100);

    // Fixtures can return anything you consider useful for your tests
    return {
      playerCharacters,
      basePickaxes,
      stone,
      iron,
      mining,
      owner,
      addr1,
      addr2,
    };
  }

  it("General flow 1", async function () {
    const { owner, addr1, playerCharacters, basePickaxes, mining } =
      await loadFixture(setupMiningFixture);

    await basePickaxes.deployed();

    // Set approval
    await basePickaxes.connect(addr1).setApprovalForAll(mining.address, true);
    await playerCharacters
      .connect(addr1)
      .setApprovalForAll(mining.address, true);

    // Stake a character and a pickaxe onto Mining
    await mining.connect(addr1).stake(0, basePickaxes.address, 0);

    // Expect mappings to be updated
    const stakedChar = await mining.connect(addr1).stakedTools(addr1.address);
    const stakedTool = await mining.connect(addr1).stakedTools(addr1.address);
    expect(stakedChar.isStaked).to.equal(true);
    expect(stakedTool.isStaked).to.equal(true);

    // View owed rewards
    const owedRewards = await mining
      .connect(addr1)
      .calculateOwedRewards(addr1.address);

    const owedExp = await mining
      .connect(addr1)
      .calculateOwedExperiencePoints(addr1.address);

    console.log(owedExp);
  });
});
