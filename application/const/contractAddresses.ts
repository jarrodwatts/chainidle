import { ChainId } from "@thirdweb-dev/sdk";

// Environment detector
const env = process.env.NODE_ENV;

export const CHAIN_ID = env === "development" ? ChainId.Mumbai : ChainId.Mumbai;

// https://thirdweb.com/mumbai/0x48293A6b8c907c015625A1B6CE52d4A2BDf81fB7/
export const MINING_ADDRESS =
  env === "development"
    ? "0x48293A6b8c907c015625A1B6CE52d4A2BDf81fB7"
    : "0x48293A6b8c907c015625A1B6CE52d4A2BDf81fB7";

// https://thirdweb.com/mumbai/0x648190e23d6aaC07007f472F9de69B0Dc53d0a09/
export const PLAYER_CHARACTERS_ADDRESS =
  env === "development"
    ? "0x648190e23d6aaC07007f472F9de69B0Dc53d0a09"
    : "0x648190e23d6aaC07007f472F9de69B0Dc53d0a09";

// https://thirdweb.com/mumbai/0xDef48AC1728B0C17047830F831b5da7CC1Bce665/
export const PICKAXES_ADDRESS =
  env === "development"
    ? "0xDef48AC1728B0C17047830F831b5da7CC1Bce665"
    : "0xDef48AC1728B0C17047830F831b5da7CC1Bce665";

// https://thirdweb.com/mumbai/0x2979Ed391CbF5d4243f7eE42709b66b95912CC99/
export const IRON_ADDRESS =
  env === "development"
    ? "0x2979Ed391CbF5d4243f7eE42709b66b95912CC99"
    : "0x2979Ed391CbF5d4243f7eE42709b66b95912CC99";

// https://thirdweb.com/mumbai/0x7a21d78baA2cdb273E68F564cc1b4f0d2d7fCF44/
export const STONE_ADDRESS =
  env === "development"
    ? "0x7a21d78baA2cdb273E68F564cc1b4f0d2d7fCF44"
    : "0x7a21d78baA2cdb273E68F564cc1b4f0d2d7fCF44";
