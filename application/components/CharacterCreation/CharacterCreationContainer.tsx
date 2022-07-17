import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import characterProperties from "../../const/character";
import theme from "../../const/mui/theme";
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
      <Grid
        container
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={5}
      >
        <Grid
          container
          item
          direction="row"
          xs={12}
          alignItems="center"
          justifyContent="space-between"
          style={{
            marginTop: 32,
            position: "sticky",
            width: "100%",
            top: 0,
            zIndex: 1,
            backgroundColor: theme.palette.background.default,
            borderBottom: `3px solid ${theme.palette.divider}`,
          }}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h2">Character Creation</Typography>

            <Typography variant="body1" sx={{ my: 2 }}>
              Select the attributes of your character NFT
            </Typography>
          </Grid>
          <Grid item direction="column" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
              <CharacterPreview character={character} />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  display: "flex",
                  width: 256,
                  height: 48,
                }}
              >
                Mint My NFT
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          rowGap={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          style={{
            position: "relative",
          }}
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
