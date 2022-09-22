import initSDK from "../util/initSDK";

export default async function setupClaimPhasesForPickaxes(
  pickaxeAddress: string
) {
  const tw = initSDK();

  const pickaxes = await tw.getContract(pickaxeAddress);

  await pickaxes.erc1155.claimConditions.setBatch([
    {
      tokenId: 0,
      claimConditions: [
        {
          startTime: new Date(Date.now()),
        },
      ],
    },
    {
      tokenId: 1,
      claimConditions: [
        {
          startTime: new Date(Date.now()),
        },
      ],
    },
    {
      tokenId: 2,
      claimConditions: [
        {
          startTime: new Date(Date.now()),
        },
      ],
    },
    {
      tokenId: 3,
      claimConditions: [
        {
          startTime: new Date(Date.now()),
        },
      ],
    },
    {
      tokenId: 4,
      claimConditions: [
        {
          startTime: new Date(Date.now()),
        },
      ],
    },
    {
      tokenId: 5,
      claimConditions: [
        {
          startTime: new Date(Date.now()),
        },
      ],
    },
  ]);

  console.log("Finished setting up claim conditions for pickaxes");
}
