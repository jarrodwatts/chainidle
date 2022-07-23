import { ChainId } from "@thirdweb-dev/sdk";

// Environment detector
const env = process.env.NODE_ENV;

export const CHAIN_ID =
  env === "development" ? ChainId.Goerli : ChainId.Polygon;

export const PLAYER_CHARACTERS_ADDRESS =
  env === "development"
    ? "0x6F22d378d328C691E0B786a3f2f5Ff474f6AD35e"
    : "0x6F22d378d328C691E0B786a3f2f5Ff474f6AD35e";

export const PICKAXES_ADDRESS =
  env === "development"
    ? "0xFB76Cb220793F570fFFb671813A05fCae0A7AE9A"
    : "0xFB76Cb220793F570fFFb671813A05fCae0A7AE9A";
