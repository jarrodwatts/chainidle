import React from "react";
import { Grid } from "@mui/material";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { MINING_ADDRESS } from "../../const/contractAddresses";

type Props = {};

export default function GameArea({}: Props) {
  const { contract } = useContract(MINING_ADDRESS);
  const { data: characterContractAddress } = useContractRead(
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
