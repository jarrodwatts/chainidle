import { capitalize, Grid, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import characterProperties from "../../const/character";
import colorNameToHexMapping from "../../const/colorNameToHexMapping";
import theme from "../../const/mui/theme";
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
  const mobileScreenQuery = useMediaQuery("(max-width:900px)");

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
              } else {
                // If they select a color when type is not set, set type to 0
                setCharacter({
                  ...character,
                  [itemCategory]: {
                    type: 0,
                    color: i,
                  },
                });
              }
            }}
            style={{
              cursor: "pointer",
              width: mobileScreenQuery ? 16 : 32,
              borderRadius: "50%",
              height: mobileScreenQuery ? 16 : 32,
              marginRight: 4,
              border: `3px solid`,
              borderColor:
                character[itemCategory]?.color === i
                  ? theme.palette.primary.main
                  : "rgba(255,255,255,0.3)",
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
