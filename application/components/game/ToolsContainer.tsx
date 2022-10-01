import { Button, Grid, Typography } from "@mui/material";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React from "react";
import useContractReadWithType from "../../lib/useContractReadWithType";

type Props = {
  contractAddress: string;
};

export default function ToolsContainer({ contractAddress }: Props) {
  const router = useRouter();
  const address = useAddress();

  // Load Tool Contract
  const { contract } = useContract(contractAddress);
  const { data: contractName } = useContractReadWithType<string>(
    contract,
    "name"
  );

  // Load the tools this user owns
  const { data: nfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    contract,
    address
  );

  console.log("owned NFTs for", contractName, ":", nfts);

  return (
    <Grid item direction="row" alignItems="center">
      {loadingOwnedNfts ? (
        <div>Loading...</div>
      ) : nfts?.length === 0 ? (
        <Grid container direction="column" alignItems="center" gap={2}>
          <Grid item xs={12}>
            <Typography variant="body2">{"no tools :("}</Typography>
          </Grid>{" "}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(`/shop`)}
            >
              want tool? go shop
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" alignItems="center">
          {nfts?.map((nft) => (
            <Grid
              key={nft.metadata.id.toString()}
              item
              style={{ width: 240, border: "1px solid grey", borderRadius: 16 }}
            >
              <ThirdwebNftMedia metadata={nft.metadata} />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}
