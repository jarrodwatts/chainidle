import React from "react";
import { Grid } from "@mui/material";
import { useContract, useContractData } from "@thirdweb-dev/react";
import { MINING_ADDRESS } from "../../const/contractAddresses";

type Props = {};

export default function GameArea({}: Props) {
  const { contract } = useContract(MINING_ADDRESS);
  const { data: characterContractAddress } = useContractData(
    contract,
    "characterContract"
  );

  console.log(characterContractAddress);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item></Grid>
    </Grid>
  );
}
