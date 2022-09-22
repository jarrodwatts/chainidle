import { releaserAddress } from "../index";
import initSDK from "../util/initSDK";

export default async function deployReleasedContract(
  contractName: string,
  args: any[]
) {
  const tw = initSDK();

  return await tw.deployer.deployReleasedContract(
    releaserAddress,
    contractName,
    args
  );
}
