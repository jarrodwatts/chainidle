import { Grid, Typography } from "@mui/material";
import React from "react";
import skills from "../../const/skills";
import { useGameContext } from "./GameArea";

type Props = {};

export default function NotPerformingActivity({}: Props) {
  const { activeSkill } = useGameContext();

  return (
    <Grid container direction="column" alignItems={"center"}>
      <Grid item xs={12}>
        <Typography variant="body1">
          hey, ur not {skills[activeSkill.get()].displayName} atm
        </Typography>

        <Typography variant="body2">
          wanna do it ? here&apos;s what u got:
        </Typography>
      </Grid>
    </Grid>
  );
}
