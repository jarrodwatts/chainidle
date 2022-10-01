import { useContract } from "@thirdweb-dev/react";
import React from "react";
import { Reward } from "../../types/ContractStructs";

type Props = {
  reward: Reward;
};

export default function RewardItem({ reward }: Props) {
  // Load reward contract

  const { contract: rewardContract } = useContract(reward.rewardContract);

  console.log(rewardContract);

  return <div>RewardItem</div>;
}
