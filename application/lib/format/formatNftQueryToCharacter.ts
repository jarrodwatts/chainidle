import { Erc721OrErc1155, NFT } from "@thirdweb-dev/react";
import Character from "../../types/Character";

export default function formatNftQueryToCharacter(
  nftQuery: NFT<Erc721OrErc1155> | null
): Character | null {
  if (!nftQuery) return null;

  const character = {
    ...(nftQuery.metadata.properties as Character),
  };

  return character as Character;
}
