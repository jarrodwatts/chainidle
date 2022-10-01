import { BigNumber } from "ethers";

export type Reward = {
  rewardContract: string;
  amount: BigNumber;
};

export type StakedTool = {
  toolContract: string;
  toolTokenId: BigNumber;
  isStaked: boolean;
};

export type Staker = {
  stakerAddress: string;
  isStaked: boolean;
};

export type StakedCharacter = {
  characterTokenId: BigNumber;
  isStaked: boolean;
};
