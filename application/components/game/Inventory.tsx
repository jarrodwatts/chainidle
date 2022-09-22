import { capitalize, Grid, Typography } from "@mui/material";
import { useContract } from "@thirdweb-dev/react";
import React from "react";
import skills from "../../const/skills";
import { useGameContext } from "./GameArea";
import Tool from "./Tool";

type Props = {};

export default function Inventory({}: Props) {
  const { activeSkill } = useGameContext();
  const skill = skills[activeSkill.get()];

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 3 }}>
        <Typography variant="h6">
          {capitalize(skill.displayName)} Inventory
        </Typography>
      </Grid>

      {/* For each tool address, render tool component  */}
      {skill.toolAddresses.map((ta) => (
        <Grid item xs={4} key={ta}>
          <Tool contractAddress={ta} />
        </Grid>
      ))}
    </Grid>
  );
}
