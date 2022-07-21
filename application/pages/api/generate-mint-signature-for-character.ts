import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import Character from "../../types/Character";

export default async function generateMintSignature(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // De-construct body from request
  const {
    address, // minter address
    character, // Character object
    characterImage, // Base64 encoded image
  }: { address: string; character: Character; characterImage: string } =
    JSON.parse(req.body);

  console.log({ address, character, characterImage });

  // Generate mint signature ...

  const PK = process.env.PRIVATE_KEY as string;

  const thirdweb = ThirdwebSDK.fromPrivateKey(PK, "goerli");

  const contract = await thirdweb.getContract(
    "0x6F22d378d328C691E0B786a3f2f5Ff474f6AD35e"
  );

  const signature = await contract.nft.signature.generate({
    metadata: {
      image: characterImage,
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
