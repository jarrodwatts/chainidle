import deployReleasedContract from "./deploy/deployReleasedContract";
import provideConstructorArguments from "./deploy/provideConstructorArguments";
import lazyMintPickaxes from "./mining/mintPickaxe";
import mintRewardsToMining from "./mining/mintRewardsToMining";
import setupClaimPhasesForPickaxes from "./mining/setupClaimPhasesForPickaxes";
import fs from "fs";

export const releaserAddress = "0xb371d1C5629C70ACd726B20a045D197c256E1054";

export const allContracts = {
  playerCharacters: {
    contractName: "PlayerCharacters",
    deployedAddress: "",
  },
  pickaxes: {
    contractName: "Pickaxes",
    deployedAddress: "",
  },
  stone: {
    contractName: "Stone",
    deployedAddress: "",
  },
  iron: {
    contractName: "Iron",
    deployedAddress: "",
  },

  // Mining depends on playerCharacters,pickaxes,stone,iron
  mining: {
    contractName: "Mining",
    deployedAddress: "",
  },
};

(async () => {
  // Deploy Core Contracts

  // TODO: This could be optimized by deploying non-dependent contracts in parallel
  for (const contract in allContracts) {
    const deployedAddress = await deployReleasedContract(
      allContracts[contract as keyof typeof allContracts].contractName,

      provideConstructorArguments(
        allContracts[contract as keyof typeof allContracts].contractName,
        allContracts
      )
    );
    allContracts[contract as keyof typeof allContracts].deployedAddress =
      deployedAddress;

    console.log(
      "Deployed",
      allContracts[contract as keyof typeof allContracts].contractName,
      "at ",
      deployedAddress
    );

    // Print out all deployed addresses into a file for easy access
    fs.writeFileSync(
      "./deployedAddresses.json",
      JSON.stringify(allContracts, null, 2)
    );
  }

  // Setup Pickaxes
  await lazyMintPickaxes(allContracts.pickaxes.deployedAddress);
  await setupClaimPhasesForPickaxes(allContracts.pickaxes.deployedAddress);

  // Setup ERC20 Rewards
  await mintRewardsToMining(
    [allContracts.stone.deployedAddress, allContracts.iron.deployedAddress],
    allContracts.mining.deployedAddress
  );
})();
