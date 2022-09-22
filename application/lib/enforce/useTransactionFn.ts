import {
  useAddress,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";
import { CHAIN_ID } from "../../const/contractAddresses";

export default function useTransactionFn() {
  const address = useAddress();
  const connectWallet = useMetamask();
  const [, switchNetwork] = useNetwork();
  const isWrongNetwork = useNetworkMismatch();

  return ({ text, fn }: { text?: string; fn?: () => void }) => {
    if (!address) {
      return {
        text: "Connect Wallet",
        fn: () => connectWallet(),
      };
    }

    if (isWrongNetwork) {
      return {
        text: "Switch Network",
        fn: () => switchNetwork?.(CHAIN_ID),
      };
    }

    return {
      text: text,
      fn: () => fn?.(),
    };
  };
}
