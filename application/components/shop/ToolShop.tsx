import { Grid } from "@mui/material";
import { useContract, useNFT, useNFTs } from "@thirdweb-dev/react";
import React from "react";
import skills from "../../const/skills";
import ShopItem from "./ShopItem";

type Props = {
  // is skill required here?
  skill: typeof skills[keyof typeof skills];
  toolContract: string;
};

export default function ToolShop({ skill, toolContract }: Props) {
  const { contract } = useContract(toolContract);
  const { data: nfts, isLoading: loadingNfts } = useNFTs(contract);

  return (
    <Grid
      container
      item
      xs={12}
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ m: 2 }}
    >
      {loadingNfts ? (
        <div>loading...</div>
      ) : (
        nfts?.map((nft) => (
          <Grid item xs={6} md={4} lg={3} key={nft.metadata.id.toString()}>
            <ShopItem contract={contract} nft={nft} />
          </Grid>
        ))
      )}
    </Grid>
  );
}
