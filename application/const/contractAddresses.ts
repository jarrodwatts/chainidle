import { ChainId } from "@thirdweb-dev/sdk";

// Environment detector
const env = process.env.NODE_ENV;

export const CHAIN_ID = env === "development" ? ChainId.Mumbai : ChainId.Mumbai;

// https://thirdweb.com/mumbai/0x48293A6b8c907c015625A1B6CE52d4A2BDf81fB7/
export const MINING_ADDRESS =
  env === "development"
    ? "0xC48b7E67a3b1e2c45FB77fBa020E5C9d7C49Aef2"
    : "0xC48b7E67a3b1e2c45FB77fBa020E5C9d7C49Aef2";

// https://thirdweb.com/mumbai/0x648190e23d6aaC07007f472F9de69B0Dc53d0a09/
export const PLAYER_CHARACTERS_ADDRESS =
  env === "development"
    ? "0xFc9acAdceC225b903b973a7d6ba4B7750172E8dc"
    : "0xFc9acAdceC225b903b973a7d6ba4B7750172E8dc";

// https://thirdweb.com/mumbai/0xDef48AC1728B0C17047830F831b5da7CC1Bce665/
export const PICKAXES_ADDRESS =
  env === "development"
    ? "0x0D785Af2B384D571b88c21468410E8f63A368D98"
    : "0x0D785Af2B384D571b88c21468410E8f63A368D98";

// https://thirdweb.com/mumbai/0x2979Ed391CbF5d4243f7eE42709b66b95912CC99/
export const IRON_ADDRESS =
  env === "development"
    ? "0xA988C578eA0eBC224E46eef4FF6CB8912710da2c"
    : "0xA988C578eA0eBC224E46eef4FF6CB8912710da2c";

// https://thirdweb.com/mumbai/0x7a21d78baA2cdb273E68F564cc1b4f0d2d7fCF44/
export const STONE_ADDRESS =
  env === "development"
    ? "0xBE40586769F601a62DD063D6147DBeD146cae3F3"
    : "0xBE40586769F601a62DD063D6147DBeD146cae3F3";
