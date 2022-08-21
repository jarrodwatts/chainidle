import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";
import fs from "fs";

(async () => {
  const tw = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    "goerli"
  );

  const pickaxes = await tw.getContract(
    "0xFB76Cb220793F570fFFb671813A05fCae0A7AE9A"
  );
})();
