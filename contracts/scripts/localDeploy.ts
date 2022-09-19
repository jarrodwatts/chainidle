import { ethers } from "hardhat";
import { formatBytes32String, keccak256 } from "ethers/lib/utils";

async function main() {
  const [owner, addr1, addr2] = await ethers.getSigners();

  const PlayerCharactersFactory = await ethers.getContractFactory(
    "PlayerCharacters"
  );
  const BasePickaxesFactory = await ethers.getContractFactory("Pickaxes");
  const MiningFactory = await ethers.getContractFactory("Mining");
  const StoneFactory = await ethers.getContractFactory("Stone");
  const IronFactory = await ethers.getContractFactory("Iron");

  // Deploy Characters
  const playerCharacters = await PlayerCharactersFactory.connect(owner).deploy(
    "name",
    "symbol",
    owner.address,
    500,
    owner.address
  );
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

  console.log("Deployment complete");
  console.log("playerCharacters.address", playerCharacters.address);
  console.log("basePickaxes.address", basePickaxes.address);
  console.log("stone.address", stone.address);
  console.log("iron.address", iron.address);
  console.log("mining.address", mining.address);

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

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
