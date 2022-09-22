import { Grid } from "@mui/material";
import {
  useAddress,
  useContract,
  useContractRead,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import React from "react";

type Props = {
  contractAddress: string;
};

export default function Tool({ contractAddress }: Props) {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data } = useContractRead(contract, "name");

  const { data: nfts } = useOwnedNFTs(contract, address);

  console.log(data);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ border: "1px solid pink", borderRadius: 16 }}
    >
      {contract?.getAddress()}
    </Grid>
  );
}
