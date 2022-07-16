import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import characterProperties from "../../const/character";
import Character from "../../types/Character";
import CharacterPreview from "./CharacterPreview";
import CharacterPropertyOptionContainer from "./CharacterPropertyOptionContainer";

export default function CharacterCreationContainer() {
  const [character, setCharacter] = useState<Character>({
    base: {
      color: 0,
      type: 0,
    },
  });

  console.log(character);

  return (
    <Box
      sx={{
        my: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" style={{ position: "sticky" }}>
        Character Creation
      </Typography>

      <Typography variant="body1" sx={{ my: 2 }}>
        Select the attributes of your character NFT
      </Typography>

      <Grid item container display="flex" justifyContent="center" spacing={2}>
        {/* Preview */}
        <Grid item xs={12} sm={6} md={3}>
          <CharacterPreview character={character} />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={9}
          display="flex"
          flexDirection="column"
          rowGap={2}
        >
          {(
            Object.keys(characterProperties) as Array<
              keyof typeof characterProperties
            >
          ).map((c, i) => (
            <CharacterPropertyOptionContainer
              itemCategory={c}
              character={character}
              setCharacter={setCharacter}
              key={i}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
