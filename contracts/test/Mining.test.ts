/* eslint-disable prettier/prettier */
import { expect } from "chai";
import { ethers } from "hardhat";

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { formatBytes32String, keccak256 } from "ethers/lib/utils";

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
      [stone.address, iron.address]
    );
    await mining.deployed();

    // Mint stone and iron to mining contract
    await stone.connect(owner).mint(mining.address, 100);
    await iron.connect(owner).mint(mining.address, 100);

    // === Set up Player Characters ===
    await playerCharacters.connect(owner).mintTo(addr1.address, "uri1");
    await playerCharacters.connect(owner).mintTo(addr1.address, "uri2");
    await playerCharacters.connect(owner).mintTo(addr2.address, "uri3");

    // Expect me to own both token id 0 and 1 of player characters
    expect(await playerCharacters.balanceOf(addr1.address)).to.equal(2);

    await playerCharacters
      .connect(owner)
      .grantRole(formatBytes32String("UPGRADER_ROLE"), mining.address);

    const miningHasRole = await playerCharacters
      .connect(addr1)
      .hasRole(keccak256(formatBytes32String("sdasdasdasd")), mining.address);

    console.log("miningHasRole", miningHasRole);

    // === Set up Pickaxes ===
    await basePickaxes.connect(owner).lazyMint(1, "basePickaxesURI", []);
    const toolStats = await basePickaxes.connect(owner).getToolStats(0);
    expect(toolStats.powerLevel).to.equal(1);

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
      0, // token id
      5, // quantity
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
    const {
      owner,
      addr1,
      playerCharacters,
      basePickaxes,
      mining,
      iron,
      stone,
    } = await loadFixture(setupMiningFixture);

    console.log("Owner:", owner.address);
    console.log("Addr1:", addr1.address);
    console.log("Mining:", mining.address);
    console.log("PlayerCharacters:", playerCharacters.address);
    console.log("BasePickaxes:", basePickaxes.address);
    console.log("Stone:", stone.address);
    console.log("Iron:", iron.address);

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

    // Increase block by 1 (can be used to test time-dependent functions)
    const blockNum = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const timestamp = block.timestamp;
    await ethers.provider.send("evm_mine", [timestamp + 100]);

    // View owed rewards
    const owedRewards = await mining
      .connect(addr1)
      .calculateOwedRewards(addr1.address);

    const owedExp = await mining
      .connect(addr1)
      .calculateOwedExperiencePoints(addr1.address);

    console.log("R:", owedRewards);
    console.log("E:", owedExp);

    // Try to stake again
    await mining.connect(addr1).stake(1, basePickaxes.address, 0);

    // Expect mappings to be updated
    const stakedChar2 = await mining.connect(addr1).stakedTools(addr1.address);
    const stakedTool2 = await mining.connect(addr1).stakedTools(addr1.address);
    expect(stakedChar2.isStaked).to.equal(true);
    expect(await playerCharacters.balanceOf(addr1.address)).to.equal(1);

    expect(stakedTool2.isStaked).to.equal(true);
    expect(stakedTool2.toolTokenId).to.equal(0);
    expect(await basePickaxes.balanceOf(addr1.address, 0)).to.equal(4);
  });
});
