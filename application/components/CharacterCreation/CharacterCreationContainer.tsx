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
import reorderCharacterKeysForLayering from "../../lib/reorderCharacterKeysForLayering";
import { useLoadingState } from "../../context/LoadingContext";
import useTransactionFn from "../../lib/enforce/useTransactionFn";
import { useSuccessState } from "../../context/SuccessContext";
import { useErrorState } from "../../context/ErrorContext";

export default function CharacterCreationContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mobileScreenQuery = useMediaQuery("(max-width:1200px)");
  const address = useAddress();
  const enforcer = useTransactionFn();

  const { contract } = useContract(PLAYER_CHARACTERS_ADDRESS);
  const { setLoading } = useLoadingState();
  const { setError } = useErrorState();
  const { setSuccess } = useSuccessState();

  const [character, setCharacter] = useState<Character>({
    base: {
      color: 0,
      type: 0,
    },
  });

  async function mintCharacter() {
    try {
      if (!canvasRef || !canvasRef.current) {
        return;
      }

      setLoading({
        loading: true,
        message: "minting ur character...",
        character: character,
      });

      // Send the request to the server
      const response = await fetch(
        "/api/generate-mint-signature-for-character",
        {
          method: "POST",
          body: JSON.stringify({
            address,
            character,
          }),
        }
      );

      const signedPayload = await response.json();

      const nft = await contract?.erc721?.signature?.mint(signedPayload);

      setSuccess({
        success: true,
        message: "woohoooooooooo",
        character: character,
      });
    } catch (error) {
      console.error(error);
      setError({
        error: true,
        message: "oh no it died ...",
      });
    } finally {
      setLoading({
        loading: false,
        message: "",
      });
    }
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
              <CharacterPreview
                character={character}
                canvasRef={canvasRef}
                style={{ marginTop: -24 }}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => enforcer({ fn: mintCharacter }).fn()}
                sx={{
                  mt: 2,
                  display: "flex",
                  width: 256,
                  height: 48,
                }}
              >
                {
                  enforcer({
                    text: "Mint Character",
                  }).text
                }
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
          {reorderCharacterKeysForLayering(
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
