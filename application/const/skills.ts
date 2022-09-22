import {
  IRON_ADDRESS,
  MINING_ADDRESS,
  PICKAXES_ADDRESS,
  STONE_ADDRESS,
} from "./contractAddresses";

const skills = {
  pickaxe: {
    displayName: "mining",
    icon: `/icons/pickaxe/silver.png`,
    contractSkillName: "MINING",
    contractAddress: MINING_ADDRESS,
    toolAddresses: [PICKAXES_ADDRESS],
    rewardAddresses: [IRON_ADDRESS, STONE_ADDRESS],
  },
};

export default skills;
