import { Grid } from "@mui/material";
import React from "react";
import { Reward } from "../../types/ContractStructs";
import RewardItem from "./RewardItem";

type Props = {
  rewards: Reward[];
};

export default function OwedRewards({ rewards }: Props) {
  if (rewards.length === 0) {
    return <span>None</span>;
  }

  return (
    <Grid container direction="row">
      {rewards.map((reward, index) => (
        <Grid item key={index}>
          <RewardItem reward={reward} />
        </Grid>
      ))}
    </Grid>
  );
}
