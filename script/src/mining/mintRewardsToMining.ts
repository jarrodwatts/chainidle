import initSDK from "../util/initSDK";

export default async function mintRewardsToMining(
  rewardAddresses: string[],
  miningAddress: string
) {
  const tw = initSDK();

  for (const rewardAddress of rewardAddresses) {
    const contract = await tw.getContract(rewardAddress);
    await contract.erc20.mintTo(miningAddress, 100);
    console.log(`Minted 100 ${rewardAddress} to Mining Contract`);
  }
  console.log("Done minting rewards to Mining Contract");
}
