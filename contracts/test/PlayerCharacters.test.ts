import { expect } from "chai";
import { ethers } from "hardhat";

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Player Characters", function () {
  // We define a fixture to reuse the same setup in every test. We use
  // loadFixture to run this setup once, snapshot that state, and reset Hardhat
  // Network to that snapshopt in every test.
  async function deployPlayerCharactersFixture() {
    // Get the ContractFactory and Signers here.
    const PlayerCharactersFactory = await ethers.getContractFactory(
      "PlayerCharacters"
    );
    const [owner, addr1, addr2] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // its deployed() method, which happens onces its transaction has been
    // mined.
    const playerCharacters = await PlayerCharactersFactory.connect(
      owner
    ).deploy("name", "symbol", owner.address, 500, owner.address);

    await playerCharacters.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { PlayerCharactersFactory, playerCharacters, owner, addr1, addr2 };
  }

  // `it` is another Mocha function. This is the one you use to define each
  // of your tests. It receives the test name, and a callback function.
  //
  // If the callback function is async, Mocha will `await` it.
  it("Should deploy the contract", async function () {
    // We use loadFixture to setup our environment, and then assert that
    // things went well
    const { playerCharacters, owner } = await loadFixture(
      deployPlayerCharactersFixture
    );

    // `expect` receives a value and wraps it in an assertion object. These
    // objects have a lot of utility methods to assert values.

    // This test expects the owner variable stored in the contract to be
    // equal to our Signer's owner.
    expect(await playerCharacters.owner()).to.equal(owner.address);
  });

  it("Should mint a character to a wallet", async function () {
    const { playerCharacters, addr1 } = await loadFixture(
      deployPlayerCharactersFixture
    );

    await playerCharacters.mintTo(addr1.address, "uri");

    const bal = await playerCharacters.balanceOf(addr1.address);

    expect(bal).to.equal(1);
  });

  it("Should reject non-admin wallet from updating player XP", async function () {
    const { playerCharacters, addr1 } = await loadFixture(
      deployPlayerCharactersFixture
    );

    await expect(
      playerCharacters.connect(addr1).updatePlayerSkill(0, "MINING", 10)
    ).to.be.reverted;
  });

  it("Should update player XP from an admin wallet", async function () {
    const { playerCharacters, owner } = await loadFixture(
      deployPlayerCharactersFixture
    );

    await playerCharacters.connect(owner).updatePlayerSkill(0, "MINING", 10);
    const skill = await playerCharacters.playerSkillExperience(0, "MINING");
    expect(skill).to.equal(10);

    await playerCharacters.connect(owner).updatePlayerSkill(0, "MINING", 10);
    await playerCharacters.connect(owner).updatePlayerSkill(0, "MINING", 10);
    const skillNow = await playerCharacters.playerSkillExperience(0, "MINING");
    expect(skillNow).to.equal(30);
  });

  it("Should reject non-admin wallet from minting", async function () {
    const { playerCharacters, addr1 } = await loadFixture(
      deployPlayerCharactersFixture
    );

    await expect(playerCharacters.connect(addr1).mintTo(addr1.address, "uri"))
      .to.be.reverted;
  });

  describe("Player Character Skills", function () {
    it("Should Return 1 when not started skill", async function () {
      const { playerCharacters } = await loadFixture(
        deployPlayerCharactersFixture
      );

      const level = await playerCharacters.getSkillLevel(0, "MINING");

      expect(level).to.equal(1);
    });

    it("Should Return 2 when started skill", async function () {
      const { playerCharacters, owner } = await loadFixture(
        deployPlayerCharactersFixture
      );

      await playerCharacters.connect(owner).updatePlayerSkill(0, "MINING", 70);

      const level = await playerCharacters.getSkillLevel(0, "MINING");

      expect(level).to.equal(2);
    });
  });
});
