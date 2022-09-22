import initSDK from "../util/initSDK";
import fs from "fs";

export default async function lazyMintPickaxes(pickaxeAddress: string) {
  const tw = initSDK();

  const pickaxes = await tw.getContract(pickaxeAddress);

  await pickaxes.erc1155.lazyMint([
    {
      name: "Wooden Pickaxe",
      image: fs.readFileSync("./assets/pickaxe/wood.png"),
    },
    {
      name: "Stone Pickaxe",
      image: fs.readFileSync("./assets/pickaxe/silver.png"),
    },
    {
      name: "Copper Pickaxe",
      image: fs.readFileSync("./assets/pickaxe/copper.png"),
    },
    {
      name: "Gold Pickaxe",
      image: fs.readFileSync("./assets/pickaxe/gold.png"),
    },
    {
      name: "Diamond Pickaxe",
      image: fs.readFileSync("./assets/pickaxe/blue.png"),
    },
    {
      name: "Magical Pickaxe",
      image: fs.readFileSync("./assets/pickaxe/pink.png"),
    },
  ]);

  console.log("Done minting pickaxes");
}
