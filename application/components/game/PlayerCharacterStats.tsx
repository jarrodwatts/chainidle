import { Grid, Typography } from "@mui/material";
import { useContractRead } from "@thirdweb-dev/react";
import React from "react";
import skills from "../../const/skills";
import { useGameContext } from "./GameArea";

type Props = {};

export default function PlayerCharacterStats({}: Props) {
  const { ownedCharacter, characterContract, activeSkill } = useGameContext();
  const {
    data: character,
    nft: characterNft,
    isLoading: loadingCharacter,
  } = ownedCharacter;

  const { data: currentSkillLevel } = useContractRead(
    characterContract,
    "getSkillLevel",
    characterNft?.metadata.id,
    skills[activeSkill.get()].contractSkillName
  );

  if (loadingCharacter) {
    return (
      <Grid container direction="column" style={{ width: 240 }}>
        <Typography variant="h6">Loading...</Typography>
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ width: 240, border: "1px solid grey", borderRadius: 16 }}
    >
      <Grid item xs={12}>
        <img
          src={(characterNft?.metadata?.image as string) || ""}
          alt={(characterNft?.metadata?.name as string) || ""}
        />
      </Grid>

      <Grid container item xs={12} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="body2">
            {skills[activeSkill.get()].displayName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{currentSkillLevel?.toNumber()}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
