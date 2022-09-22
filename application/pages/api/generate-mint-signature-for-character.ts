import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { PLAYER_CHARACTERS_ADDRESS } from "../../const/contractAddresses";
import Character from "../../types/Character";
import { createCanvas, loadImage } from "canvas";
import orderCharacterKeysforLayeredDisplay from "../../lib/orderCharacterKeysForDisplay";
import characterProperties from "../../const/character";
import path from "path";
import { promises as fs } from "fs";
import reorderCharacterKeysForLayering from "../../lib/reorderCharacterKeysForLayering";

export default async function generateMintSignature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // De-construct body from request
  const {
    address, // minter address
    character, // Character object
  }: { address: string; character: Character; characterImage: string } =
    JSON.parse(req.body);

  // Generate mint signature ...
  const PK = process.env.PRIVATE_KEY as string;

  const thirdweb = ThirdwebSDK.fromPrivateKey(PK, "mumbai");

  const contract = await thirdweb.getContract(PLAYER_CHARACTERS_ADDRESS);

  // Generate image using canvas
  const canvas = createCanvas(256, 256);
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Loop through the keys and draw the image

  const toDraw = reorderCharacterKeysForLayering(
    Object.keys(orderCharacterKeysforLayeredDisplay(character)) as Array<
      keyof typeof characterProperties
    >
  );

  for (const key of toDraw) {
    if (character[key] === undefined) {
      continue;
    }

    const fullPath = path.join(
      process.cwd(),
      "public",
      "cozy-people-asset-pack",
      characterProperties[key].path,
      characterProperties[key].files[character[key]?.type as number]
    );

    // Get the relevant spritesheet for that key from the object
    const img = await fs.readFile(fullPath);
    const spriteSheet = await loadImage(img);

    context.drawImage(
      spriteSheet,
      characterProperties[key].frameSize.x * character?.[key]?.color! * 8,
      0,
      characterProperties[key].frameSize.x,
      characterProperties[key].frameSize.y,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  const signature = await contract?.erc721?.signature?.generate({
    metadata: {
      image: canvas.toDataURL("image/png"),
      name: "ChainIdle Character",
      properties: {
        ...character,
      },
    },
    to: address,
    mintStartTime: new Date(0),
  });

  // return 200 and signedpayload
  res.status(200).json(signature);
}
