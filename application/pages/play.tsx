import { Button, Grid } from "@mui/material";
import {
  ConnectWallet,
  useContract,
  useClaimNFT,
  useAddress,
  useContractData,
} from "@thirdweb-dev/react";
import React from "react";
import {
  IRON_ADDRESS,
  MINING_ADDRESS,
  PICKAXES_ADDRESS,
  PLAYER_CHARACTERS_ADDRESS,
  STONE_ADDRESS,
} from "../const/contractAddresses";

type Props = {};

export default function Play({}: Props) {
  const address = useAddress();
  // Player Characters
  const { contract: playerCharacters } = useContract(PLAYER_CHARACTERS_ADDRESS);

  // Pickaxes
  const { contract: pickaxes } = useContract(PICKAXES_ADDRESS);

  // Tokens (Iron, Stone)
  const { contract: iron } = useContract(IRON_ADDRESS);
  const { contract: stone } = useContract(STONE_ADDRESS);

  // Mining
  const { contract: mining } = useContract(MINING_ADDRESS);

  // == functions ==
  async function claimPickaxe() {
    console.log(pickaxes);
    const tx = await pickaxes?.edition.drop?.claim?.to(address, 0, 1);
  }

  async function stake() {
    // set approval
    const approve1tx = await pickaxes?.call(
      "setApprovalForAll",
      MINING_ADDRESS,
      true
    );
    const approve2tx = await playerCharacters?.call(
      "setApprovalForAll",
      MINING_ADDRESS,
      true
    );

    const tx = await mining?.call("stake", 0, PICKAXES_ADDRESS, 0);
  }

  async function viewInfo() {
    const tx = await mining?.call("calculateOwedRewards", address);
    console.log(tx);
  }

  return (
    <Grid
      container
      spacing={5}
      style={{ height: "50vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <h1>test zone</h1>

        <ConnectWallet />

        <hr />

        <h2>Pickaxes</h2>

        <Button variant="contained" color="primary" onClick={claimPickaxe}>
          Claim Pickaxe
        </Button>

        <h2>Mining</h2>

        <Button variant="contained" color="primary" onClick={stake}>
          Stake
        </Button>

        <Button variant="contained" color="primary" onClick={viewInfo}>
          View Info
        </Button>
      </Grid>
    </Grid>
  );
}
