import { ChainId } from "@thirdweb-dev/sdk";

// Environment detector
const env = process.env.NODE_ENV;

export const CHAIN_ID =
  env === "development" ? ChainId.Goerli : ChainId.Polygon;
