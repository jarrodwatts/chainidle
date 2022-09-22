import { Container, Grid, Typography } from "@mui/material";
import { useContract, useAddress, useOwnedNFTs } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import CharacterCreationContainer from "../components/CharacterCreation/CharacterCreationContainer";
import GameArea from "../components/game/GameArea";
import ConnectWalletDonowall from "../components/overlay/ConnectWalletDonowall";
import { PLAYER_CHARACTERS_ADDRESS } from "../const/contractAddresses";
import { useLoadingState } from "../context/LoadingContext";

export default function Play() {
  const { loading, setLoading } = useLoadingState();
  const address = useAddress();

  const { contract: playerCharactersContract } = useContract(
    PLAYER_CHARACTERS_ADDRESS
  );
  const { data: ownedNfts, isLoading: loadingNftBalance } = useOwnedNFTs(
    playerCharactersContract,
    address
  );

  useEffect(() => {
    if (!address) {
      return;
    }

    if (loadingNftBalance) {
      setLoading({
        loading: true,
        message: "loading ur characterz...",
      });
    } else {
      setLoading({
        loading: false,
        message: "",
      });
    }
  }, [address, loadingNftBalance, setLoading]);

  if (!address) {
    return <ConnectWalletDonowall />;
  }

  if (loadingNftBalance) {
    return null;
  }

  if (ownedNfts?.length && ownedNfts.length === 0) {
    return (
      <Container maxWidth="lg">
        <CharacterCreationContainer />
      </Container>
    );
  }

  // User already has an NFT. Ready to play!
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 9,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{
            width: "100%",
            marginTop: 2,
            textAlign: "center",
            padding: 0,
          }}
        >
          <Typography variant="h1">yo</Typography>
          <Typography variant="body2" sx={{ mt: 3 }}>
            let&apos;s play
          </Typography>

          <img src={ownedNfts?.[0].metadata.image || ""} />

          <GameArea />
        </Grid>
      </Container>
    </>
  );
}
