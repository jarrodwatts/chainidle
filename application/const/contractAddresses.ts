import { ChainId } from "@thirdweb-dev/sdk";

// Environment detector
const env = process.env.NODE_ENV;

export const CHAIN_ID = env === "development" ? ChainId.Mumbai : ChainId.Mumbai;

export const MINING_ADDRESS =
  env === "development"
    ? "0x05CfCb3906D7Aae930273C7ccA4820aF867385d6"
    : "0x05CfCb3906D7Aae930273C7ccA4820aF867385d6";

export const PLAYER_CHARACTERS_ADDRESS =
  env === "development"
    ? "0x9817efF0d4b7354623d58F0A265677Ee00377aC6"
    : "0x9817efF0d4b7354623d58F0A265677Ee00377aC6";

export const PICKAXES_ADDRESS =
  env === "development"
    ? "0x0de100C64945557eB26F3066BB1E96e5a3F3A45f"
    : "0x0de100C64945557eB26F3066BB1E96e5a3F3A45f";

export const IRON_ADDRESS =
  env === "development"
    ? "0x0c07f4358506Bee452c0638A4B835A16FC99eB50"
    : "0x0c07f4358506Bee452c0638A4B835A16FC99eB50";

export const STONE_ADDRESS =
  env === "development"
    ? "0xc3b18df09cf3E0Cca6E56b9e606DA326D7C4F4aa"
    : "0xc3b18df09cf3E0Cca6E56b9e606DA326D7C4F4aa";
