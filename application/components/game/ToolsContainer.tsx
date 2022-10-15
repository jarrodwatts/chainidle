import { Button, Grid, Typography } from "@mui/material";
import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { BigNumberish } from "ethers";
import { useRouter } from "next/router";
import React from "react";
import skills from "../../const/skills";
import useTransactionFn from "../../lib/enforce/useTransactionFn";
import useContractReadWithType from "../../lib/useContractReadWithType";
import { useGameContext } from "./GameArea";
import { useErrorState } from "../../context/ErrorContext";
import { useLoadingState } from "../../context/LoadingContext";
import { useSuccessState } from "../../context/SuccessContext";

type Props = {
  contractAddress: string;
};

export default function ToolsContainer({ contractAddress }: Props) {
  const router = useRouter();
  const address = useAddress();
  const enforcer = useTransactionFn();
  const { activeSkill, ownedCharacter, characterContract } = useGameContext();

  const { setLoading } = useLoadingState();
  const { setError } = useErrorState();
  const { setSuccess } = useSuccessState();

  // Connect to active tool contract
  const { contract: skillContract } = useContract(
    skills[activeSkill.get()].contractAddress
  );

  // Load Tool Contract
  const { contract: toolContract } = useContract(contractAddress);
  const { data: contractName } = useContractReadWithType<string>(
    toolContract,
    "name"
  );

  // Load the tools this user owns
  const { data: nfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    toolContract,
    address
  );

  async function equipItem(id: BigNumberish) {
    setLoading({
      loading: true,
      message: "equippin it...",
    });

    console.log({
      1: ownedCharacter?.nft?.metadata?.id,
      // tool contract address
      2: contractAddress,
      // tool token ID
      3: id,
    });

    try {
      console.log(skillContract);

      // First, check approval of both the tool and the character
      const approvedForTool = await toolContract?.call(
        "isApprovedForAll",
        address,
        skillContract?.getAddress()
      );

      const approvedForCharacter = await characterContract?.call(
        "isApprovedForAll",
        address,
        skillContract?.getAddress()
      );

      console.log({
        approvedForTool,
        approvedForCharacter,
      });

      // If not approved, approve both
      if (!approvedForTool) {
        await toolContract?.call(
          "setApprovalForAll",
          skillContract?.getAddress(),
          true
        );
      }

      if (!approvedForCharacter) {
        await characterContract?.call(
          "setApprovalForAll",
          skillContract?.getAddress(),
          true
        );
      }

      const tx = await skillContract?.call(
        "stake",
        // character token ID
        ownedCharacter?.nft?.metadata?.id,
        // tool contract address
        contractAddress,
        // tool token ID
        id,
        {
          gasLimit: 9900000, // override default gas limit
        }
      );

      setSuccess({
        success: true,
        message: "Equipped!",
      });
    } catch (error) {
      console.error(error);
      setError({
        error: true,
        message: "o no .. failed :((((((",
      });
    } finally {
      setLoading({
        loading: false,
        message: "",
      });
    }
  }

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
              style={{
                width: 260,
                border: "1px solid grey",
                borderRadius: 16,
                padding: 8,
              }}
            >
              {/* Metadata */}
              <Grid item>
                <ThirdwebNftMedia
                  metadata={nft.metadata}
                  style={{ height: 96 }}
                />
              </Grid>
              <Grid item sx={{ mt: 1 }}>
                <Typography> {nft.metadata.name}</Typography>
              </Grid>

              <Grid item sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    enforcer({ fn: () => equipItem(nft.metadata.id) }).fn()
                  }
                >
                  {
                    enforcer({
                      text: "equip",
                    }).text
                  }
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  );
}
