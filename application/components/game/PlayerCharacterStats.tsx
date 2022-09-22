import { Grid, Typography } from "@mui/material";
import { useContractRead } from "@thirdweb-dev/react";
import React from "react";
import skills from "../../const/skills";
import { useGameContext } from "./GameArea";

type Props = {};

export default function PlayerCharacterStats({}: Props) {
  const { ownedCharacter, characterContract } = useGameContext();
  const {
    data: character,
    nft: characterNft,
    isLoading: loadingCharacter,
  } = ownedCharacter;

  const { data } = useContractRead(
    characterContract,
    "getSkillLevel",
    characterNft?.metadata.id,
    skills["pickaxe"].contractSkillName
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
          src={characterNft?.metadata?.image}
          alt={characterNft?.metadata?.name}
        />
      </Grid>

      <Grid container item xs={12} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="body2">Mining</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{data?.toNumber()}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
