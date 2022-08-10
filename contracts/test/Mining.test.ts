// /* eslint-disable prettier/prettier */
// import { expect } from "chai";
// import { ethers } from "hardhat";

// // We use `loadFixture` to share common setups (or fixtures) between tests.
// // Using this simplifies your tests and makes them run faster, by taking
// // advantage of Hardhat Network's snapshot functionality.
// import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

// // `describe` is a Mocha function that allows you to organize your tests.
// // Having your tests organized makes debugging them easier. All Mocha
// // functions are available in the global scope.
// //
// // `describe` receives the name of a section of your test suite, and a
// // callback. The callback must define the tests of that section. This callback
// // can't be an async function.
// describe("Mining", function () {
//   // We define a fixture to reuse the same setup in every test. We use
//   // loadFixture to run this setup once, snapshot that state, and reset Hardhat
//   // Network to that snapshopt in every test.
//   async function setupMiningFixture() {
//     const [owner, addr1, addr2] = await ethers.getSigners();

//     const PlayerCharactersFactory = await ethers.getContractFactory(
//       "PlayerCharacters"
//     );
//     const BasePickaxesFactory = await ethers.getContractFactory("Pickaxes");
//     const MiningFactory = await ethers.getContractFactory("Mining");
//     const StoneFactory = await ethers.getContractFactory("Stone");
//     const IronFactory = await ethers.getContractFactory("Iron");

//     // Deploy Characters
//     const playerCharacters = await PlayerCharactersFactory.connect(
//       owner
//     ).deploy("name", "symbol", owner.address, 500, owner.address);
//     await playerCharacters.deployed();

//     // Deploy Pickaxes (Tool)
//     const basePickaxes = await BasePickaxesFactory.connect(owner).deploy();
//     await basePickaxes.deployed();

//     // Deploy Stone (Token 1)
//     const stone = await StoneFactory.connect(owner).deploy();
//     await stone.deployed();

//     // Deploy Iron (Token 2)
//     const iron = await IronFactory.connect(owner).deploy();
//     await iron.deployed();

//     // Deploy Mining (Stake)
//     const mining = await MiningFactory.connect(owner).deploy(
//       basePickaxes.address,
//       [stone.address, iron.address]
//     );
//     await mining.deployed();

//     // Fixtures can return anything you consider useful for your tests
//     return {
//       playerCharacters,
//       basePickaxes,
//       stone,
//       iron,
//       mining,
//       owner,
//       addr1,
//       addr2,
//     };
//   }

//   // `it` is another Mocha function. This is the one you use to define each
//   // of your tests. It receives the test name, and a callback function.
//   //
//   // If the callback function is async, Mocha will `await` it.
//   it("Should deploy the contract", async function () {
//     // We use loadFixture to setup our environment, and then assert that
//     // things went well
//     const { playerCharacters, owner } = await loadFixture(setupMiningFixture);

//     // `expect` receives a value and wraps it in an assertion object. These
//     // objects have a lot of utility methods to assert values.

//     // This test expects the owner variable stored in the contract to be
//     // equal to our Signer's owner.
//     expect(await playerCharacters.owner()).to.equal(owner.address);
//   });

//   it("Should be able to stake a player and pickaxe into the mining contract", async function () {
//     const {
//       playerCharacters,
//       basePickaxes,
//       stone,
//       iron,
//       mining,
//       owner,
//       addr1,
//     } = await loadFixture(setupMiningFixture);

//     // Mint a player token
//     const player = await playerCharacters
//       .connect(owner)
//       .mintTo(addr1.address, "uri");

//     // Mint a pickaxe token
//     const lazyMinted = await basePickaxes.connect(owner).lazyMint(1, "uri");
//   });
// });
