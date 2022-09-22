import { allContracts } from "../index";

const fundsRecipient = "0xb371d1C5629C70ACd726B20a045D197c256E1054";

export default function provideConstructorArguments(
  contractName: string,
  contracts: typeof allContracts
): any[] {
  switch (contractName) {
    case "PlayerCharacters":
      return ["Player Characters", "PC", fundsRecipient, 0, fundsRecipient];

    case "Pickaxes":
      return ["Pickaxes", "PICK", fundsRecipient, 0, fundsRecipient];

    case "Iron":
      return ["Iron", "IRON"];

    case "Stone":
      return ["Stone", "STONE"];

    case "Mining":
      return [
        // character contract
        contracts.playerCharacters.deployedAddress,
        // tools contract array
        [contracts.pickaxes.deployedAddress],
        // resources contract array
        [contracts.stone.deployedAddress, contracts.iron.deployedAddress],
      ];

    default:
      return [];
  }
}
