import { Grid, Typography } from "@mui/material";
import React from "react";
import skills from "../../const/skills";
import ToolShop from "./ToolShop";

type Props = {
  skill: typeof skills[keyof typeof skills];
};

export default function ShopsForSkillContainer({ skill }: Props) {
  // Each skill has an array of tool contracts that should be edition drops

  return (
    <Grid container direction="column" alignItems="center">
      {skill.toolAddresses.map((toolContract) => (
        <ToolShop
          toolContract={toolContract}
          skill={skill}
          key={toolContract}
        />
      ))}
    </Grid>
  );
}
