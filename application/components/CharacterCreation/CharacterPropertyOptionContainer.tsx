import { Grid } from "@mui/material";
import React from "react";
import characterProperties from "../../const/character";
import CharacterPropertyOption from "./CharacterPropertyOption";

type Props = {
  itemCategory: keyof typeof characterProperties;
};

export default function CharacterPropertyOptionContainer({
  itemCategory,
}: Props) {
  return (
    <Grid
      item
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {characterProperties?.[itemCategory].files?.map((file, index) => (
        <CharacterPropertyOption
          property={characterProperties[itemCategory]}
          file={file}
          col={index}
          row={0}
          key={index}
        />
      ))}
    </Grid>
  );
}
