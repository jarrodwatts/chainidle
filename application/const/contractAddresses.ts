import { ChainId } from "@thirdweb-dev/sdk";

// Environment detector
const env = process.env.NODE_ENV;

export const CHAIN_ID = env === "development" ? ChainId.Mumbai : ChainId.Mumbai;

// https://thirdweb.com/mumbai/0xfa9498b12058056D33B7867FBAD64E6367Fc4B86/
export const MINING_ADDRESS =
  env === "development"
    ? "0xfa9498b12058056D33B7867FBAD64E6367Fc4B86"
    : "0xfa9498b12058056D33B7867FBAD64E6367Fc4B86";

// https://thirdweb.com/mumbai/0x38a8F01B1a5642db4650726caCE8e8177c3967f2/
export const PLAYER_CHARACTERS_ADDRESS =
  env === "development"
    ? "0x38a8F01B1a5642db4650726caCE8e8177c3967f2"
    : "0x38a8F01B1a5642db4650726caCE8e8177c3967f2";

// https://thirdweb.com/mumbai/0xB90f8ad1F071F805f2DdEF03650D138aC6492f9F/
export const PICKAXES_ADDRESS =
  env === "development"
    ? "0xB90f8ad1F071F805f2DdEF03650D138aC6492f9F"
    : "0xB90f8ad1F071F805f2DdEF03650D138aC6492f9F";

// https://thirdweb.com/mumbai/0xd60b3C58AAff3C6adCE699C4a8659E51Ea2EA002/
export const IRON_ADDRESS =
  env === "development"
    ? "0xd60b3C58AAff3C6adCE699C4a8659E51Ea2EA002"
    : "0xd60b3C58AAff3C6adCE699C4a8659E51Ea2EA002";

// https://thirdweb.com/mumbai/0x22849F913B6f9CB00e5E1eB72A29a8896088dF5A/
export const STONE_ADDRESS =
  env === "development"
    ? "0x22849F913B6f9CB00e5E1eB72A29a8896088dF5A"
    : "0x22849F913B6f9CB00e5E1eB72A29a8896088dF5A";
