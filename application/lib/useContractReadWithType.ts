import { RequiredParam, useContractRead } from "@thirdweb-dev/react";
import { ValidContractInstance } from "@thirdweb-dev/sdk";
import { CallOverrides } from "ethers";
// The role of this hook is to provide a type, and re-export the useContractRead hook
// With the `data` property typed to the type provided

export default function useContractReadWithType<T>(
  contract: RequiredParam<ValidContractInstance>,
  functionName: RequiredParam<string>,
  ...args: unknown[] | [...unknown[], CallOverrides]
) {
  const readObject = useContractRead(contract, functionName, ...args);

  return {
    ...readObject,
    data: readObject.data as T,
  };
}
