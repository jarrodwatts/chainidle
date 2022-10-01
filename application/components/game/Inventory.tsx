import { capitalize, Grid, Typography } from "@mui/material";
import { useContract } from "@thirdweb-dev/react";
import React from "react";
import skills from "../../const/skills";
import useContractReadWithType from "../../lib/useContractReadWithType";
import { StakedTool } from "../../types/ContractStructs";
import { useGameContext } from "./GameArea";
import ToolsContainer from "./ToolsContainer";

type Props = {};

export default function Inventory({}: Props) {
  const { activeSkill } = useGameContext();
  const skill = skills[activeSkill.get()];

  // Load a list of valid tool contract addresses for this smart contract
  const { contract: skillContract } = useContract(skill.contractAddress);

  // Load the list of valid tool contract addresses
  const { data: validToolContractAddresses, isLoading: loadingTools } =
    useContractReadWithType<string[]>(skillContract, "viewAllToolAddresses");

  console.log(validToolContractAddresses);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: 1, mt: 5 }}>
        <Typography variant="h6" color="primary">
          {capitalize(skill.displayName)} Inventory
        </Typography>
      </Grid>

      <Grid
        container
        item
        xs={12}
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {loadingTools ? (
          <Typography variant="body2">Loading...</Typography>
        ) : (
          validToolContractAddresses.map((address) => (
            <ToolsContainer key={address} contractAddress={address} />
          ))
        )}
      </Grid>
    </Grid>
  );
}
