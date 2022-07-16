import { capitalize, Grid, Typography } from "@mui/material";
import React from "react";
import characterProperties from "../../const/character";
import colorNameToHexMapping from "../../const/colorNameToHexMapping";
import Character from "../../types/Character";
import CharacterPropertyOption from "./CharacterPropertyOption";

type Props = {
  itemCategory: keyof typeof characterProperties;
  character: Character;
  setCharacter: (character: Character) => void;
};

export default function CharacterPropertyOptionContainer({
  itemCategory,
  character,
  setCharacter,
}: Props) {
  return (
    <Grid item>
      <Grid
        container
        display="flex"
        flexDirection="row"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h4" sx={{ mb: 1, mr: 2 }}>
            {capitalize(itemCategory)}
          </Typography>
        </Grid>
        {characterProperties[itemCategory].colors.map((c, i) => (
          <Grid
            item
            key={i}
            role="button"
            onClick={() => {
              if (character[itemCategory] !== undefined) {
                setCharacter({
                  ...character,
                  [itemCategory]: {
                    ...character[itemCategory],
                    color: i,
                  },
                });
              }
            }}
            style={{
              cursor: "pointer",
              width: 32,
              borderRadius: "50%",
              height: 32,
              marginRight: 4,
              border: `1px solid grey`,
              backgroundColor: colorNameToHexMapping[itemCategory][c],
            }}
          />
        ))}
      </Grid>

      <Grid container display="flex" flexDirection="row" spacing={1}>
        {/* Types of item */}
        {characterProperties?.[itemCategory].files?.map((file, index) => (
          <CharacterPropertyOption
            property={characterProperties[itemCategory]}
            file={file}
            col={0} // This should be changed to be calculated based on selected color (passed in as props)
            row={
              character[itemCategory]?.color
                ? character[itemCategory]?.color * 8
                : 0
            } // 8 = animation frames of walking.
            key={index}
            index={index}
            character={character}
            setCharacter={setCharacter}
          />
        ))}
      </Grid>
    </Grid>
  );
}
