import { Button, Grid, Typography } from "@mui/material";
import {
  NFT,
  Erc721OrErc1155,
  useActiveClaimCondition,
  ThirdwebNftMedia,
  useClaimNFT,
  useAddress,
} from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/contracts/smart-contract";
import { BaseContract, BigNumber, BigNumberish } from "ethers";
import React from "react";
import { useErrorState } from "../../context/ErrorContext";
import { useLoadingState } from "../../context/LoadingContext";
import { useSuccessState } from "../../context/SuccessContext";
import useTransactionFn from "../../lib/enforce/useTransactionFn";
import { useGameContext } from "../game/GameArea";

type Props = {
  contract: SmartContract<BaseContract> | undefined;
  nft: NFT<Erc721OrErc1155>;
};

export default function ShopItem({ contract, nft }: Props) {
  const { data: claimCondition, isLoading: loadingClaimCondition } =
    useActiveClaimCondition(contract, nft.metadata.id);

  const { mutateAsync: claimNft } = useClaimNFT(contract);
  const address = useAddress();

  const enforcer = useTransactionFn();
  const { setLoading } = useLoadingState();
  const { setError } = useErrorState();
  const { setSuccess } = useSuccessState();

  async function buyItem(id: BigNumberish) {
    try {
      setLoading({
        loading: true,
        message: "buying item...",
      });

      // Claim NFT
      const tx = await claimNft({
        quantity: 1,
        to: address!,
        tokenId: id,
      });

      console.log(tx);

      setSuccess({
        message: "Item bought!",
        success: true,
      });
    } catch (error) {
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
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 16,
        border: "1px solid grey",
        padding: 16,
      }}
    >
      {/* Metadata */}
      <Grid item>
        <ThirdwebNftMedia metadata={nft.metadata} style={{ height: 96 }} />
      </Grid>
      <Grid item sx={{ mt: 1 }}>
        <Typography> {nft.metadata.name}</Typography>
      </Grid>

      {/* Conditions */}
      <Grid item sx={{ mt: 1 }}>
        {loadingClaimCondition ? (
          <div>loading...</div>
        ) : (
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="h6" color="primary">
                {claimCondition?.price.toNumber()}{" "}
                {claimCondition?.currencyMetadata.symbol}
              </Typography>
            </Grid>

            {/* Buy Button */}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  enforcer({ fn: () => buyItem(nft.metadata.id) }).fn()
                }
                sx={{
                  mt: 1,
                  display: "flex",
                  width: "100%",
                  height: 48,
                }}
              >
                {
                  enforcer({
                    text: "Buy Item",
                  }).text
                }
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
