import { Grid, Typography } from "@mui/material";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
import React from "react";
import skills from "../../const/skills";
import useContractReadWithType from "../../lib/useContractReadWithType";
import {
  Reward,
  StakedCharacter,
  StakedTool,
} from "../../types/ContractStructs";
import { useGameContext } from "./GameArea";
import Inventory from "./Inventory";
import NotPerformingActivity from "./NotPerformingActivity";
import OwedRewards from "./OwedRewards";

type Props = {};

export default function GameplayContainer({}: Props) {
  const address = useAddress();
  const { characterContract, activeSkill } = useGameContext();

  // Load Skill Contract for active skill
  const { contract: skillContract } = useContract(
    skills[activeSkill.get()].contractAddress
  );

  // Load Owed Experience Points
  const { data: owedExperiencePoints, isLoading: loadingOwedExperiencePoints } =
    useContractReadWithType<BigNumber>(
      skillContract,
      "calculateOwedExperiencePoints",
      address
    );

  // Load Owed Rewards
  const { data: owedRewards, isLoading: loadingOwedRewards } =
    useContractReadWithType<Reward[]>(
      skillContract,
      "calculateOwedRewards",
      address
    );

  // Load Staked Character
  const { data: stakedCharacter, isLoading: loadingStakedCharacter } =
    useContractReadWithType<StakedCharacter>(
      skillContract,
      "stakedCharacters",
      address
    );

  // Load Staked Tool
  const { data: stakedTool, isLoading: loadingStakedTool } =
    useContractReadWithType<StakedTool>(skillContract, "stakedTools", address);

  return (
    <Grid container direction="column" alignItems="center">
      {/* XP */}
      <Grid container item xs={12} direction="row" alignItems={"center"}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          XP Available:
        </Typography>
        <Typography variant="body2">
          {loadingOwedExperiencePoints
            ? "Loading..."
            : owedExperiencePoints?.toNumber()}
        </Typography>
      </Grid>

      {/* Rewards */}
      <Grid container item xs={12} direction="row" alignItems={"center"}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          Rewards Available:
        </Typography>
        <Typography variant="body2">
          {loadingOwedRewards ? (
            "Loading..."
          ) : (
            <OwedRewards rewards={owedRewards} />
          )}
        </Typography>
      </Grid>

      {/* Gameplay Animation */}
      <Grid
        container
        item
        xs={12}
        direction="column"
        alignItems={"center"}
        sx={{ mt: 8 }}
      >
        {/* If they have a staked character and tool, they're performing this skill.  */}
        {loadingStakedCharacter || loadingStakedTool ? (
          <Typography variant="body1">Loading...</Typography>
        ) : stakedCharacter.isStaked && stakedTool.isStaked ? (
          <Typography variant="body1">Performing Skill...</Typography>
        ) : (
          <Grid container direction="column" alignItems={"center"} gap={3}>
            <NotPerformingActivity />
            <Inventory />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
