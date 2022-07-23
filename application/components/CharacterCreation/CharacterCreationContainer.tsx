import { Box, Button, Grid, Typography } from "@mui/material";
import { useAddress, useContract, useMetamask } from "@thirdweb-dev/react";
import React, { useRef, useState } from "react";
import characterProperties from "../../const/character";
import theme from "../../const/mui/theme";
import Character from "../../types/Character";
import CharacterPreview from "./CharacterPreview";
import CharacterPropertyOptionContainer from "./CharacterPropertyOptionContainer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PLAYER_CHARACTERS_ADDRESS } from "../../const/contractAddresses";

export default function CharacterCreationContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileScreenQuery = useMediaQuery("(max-width:1200px)");
  const address = useAddress();
  const connectWallet = useMetamask();

  const { contract } = useContract(PLAYER_CHARACTERS_ADDRESS);

  const [character, setCharacter] = useState<Character>({
    base: {
      color: 0,
      type: 0,
    },
  });

  console.log(character);

  async function mintCharacter() {
    console.log("minting character");

    if (!canvasRef || !canvasRef.current) {
      return;
    }

    // Base 64 encode the canvas
    const characterImage = canvasRef.current.toDataURL();

    // Send the request to the server
    const response = await fetch("/api/generate-mint-signature-for-character", {
      method: "POST",
      body: JSON.stringify({
        address,
        character,
        characterImage,
      }),
    });

    const signedPayload = await response.json();

    console.log(signedPayload);

    const nft = await contract?.nft.signature.mint(signedPayload);
  }

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
          justifyContent={mobileScreenQuery ? "center" : "space-between"}
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
            <Typography variant="h2" style={{ textAlign: "center" }}>
              Character Creation
            </Typography>

            {!mobileScreenQuery && (
              <Typography variant="body1" sx={{ my: 2 }}>
                Select the attributes of your character NFT
              </Typography>
            )}
          </Grid>
          <Grid item sx={{ mb: 1 }}>
            <Grid container justifyContent="center" item>
              <CharacterPreview character={character} canvasRef={canvasRef} />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => (address ? mintCharacter() : connectWallet())}
                sx={{
                  mt: 2,
                  display: "flex",
                  width: 256,
                  height: 48,
                }}
              >
                {address ? "Mint My NFT" : "Connect Wallet"}
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
