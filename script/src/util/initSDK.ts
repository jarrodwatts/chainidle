import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import "dotenv/config";

export default function initSDK() {
  const tw = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY as string,
    "mumbai"
  );

  return tw;
}
