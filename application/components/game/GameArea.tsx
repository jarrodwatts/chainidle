import React, { createContext, useContext, useState } from "react";

import {
  Erc721OrErc1155,
  NFT,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { PLAYER_CHARACTERS_ADDRESS } from "../../const/contractAddresses";
import GameSidebar from "../GameSidebar";
import skills from "../../const/skills";
import Character from "../../types/Character";
import { SmartContract } from "@thirdweb-dev/sdk/dist/declarations/src/contracts/smart-contract";
import { BaseContract } from "ethers";
import formatNftQueryToCharacter from "../../lib/format/formatNftQueryToCharacter";
import PlayerCharacterStats from "./PlayerCharacterStats";
import { Grid } from "@mui/material";
import Inventory from "./Inventory";
import AnimationCanvas from "../CharacterActionAnimation/AnimationCanvas";
import GameplayAnimation from "./GameplayAnimation";
import GameplayContainer from "./GameplayContainer";

// === Game Context ===
type GameContextType = {
  activeSkill: {
    get: () => keyof typeof skills;
    set: (skill: keyof typeof skills) => void;
  };
  characterContract: SmartContract<BaseContract> | undefined;
  ownedCharacter: {
    isLoading: boolean;
    data: Character | null;
    nft: NFT<Erc721OrErc1155> | null;
  };
};

const GameContext = createContext<GameContextType>({} as GameContextType);

// export the hook so we can use it in other components.
export const useGameContext = () => useContext(GameContext);

// === End Game Context ===

type Props = {};

export default function GameArea({}: Props) {
  const [activeSkill, setActiveSkill] =
    useState<keyof typeof skills>("pickaxe");

  const address = useAddress();
  const { contract: characterContract } = useContract(
    PLAYER_CHARACTERS_ADDRESS
  );

  // TODO: This isn't going to work when the user stakes onto something
  const { data: ownedCharacters, isLoading: loadingOwnedCharacters } =
    useOwnedNFTs(characterContract, address);

  return (
    <GameContext.Provider
      value={{
        activeSkill: {
          get: () => activeSkill,
          set: (skill) => setActiveSkill(skill),
        },
        characterContract: characterContract,
        ownedCharacter: {
          isLoading: loadingOwnedCharacters,
          data: ownedCharacters?.length
            ? formatNftQueryToCharacter(ownedCharacters[0])
            : null,
          nft: ownedCharacters?.length ? ownedCharacters[0] : null,
        },
      }}
    >
      <GameSidebar />

      <Grid container justifyContent="center" direction="row" sx={{ mt: 5 }}>
        <Grid item xs={12} md={3}>
          {/* Player Stats */}
          <PlayerCharacterStats />
          {/* Inventory */}
        </Grid>
        <Grid item xs={12} md={9}>
          <GameplayContainer />
        </Grid>
      </Grid>
    </GameContext.Provider>
  );
}
