import { SampleJetton } from "../contracts/simple";
// import { Mint } from "../contracts/mint";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "@ton/core";
import { useState } from "react";

export function useMintContract() {

  const client = useTonClient();
  const [val, setVal] = useState<null | number>();
  const { sender } = useTonConnect();

  // const sleep = (time: number) =>
  //   new Promise((resolve) => setTimeout(resolve, time));

  const mintContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new SampleJetton(
      Address.parse("EQABwEqVzEmTqUlu9TaREinX77FIwEzCeMtwJ17XqLb2sVD4")
    );
    return client.open(contract) as OpenedContract<SampleJetton>;
  }, [client]);

  interface Mint {
    $$type: "Mint";
    amount: bigint;
    receiver: Address;
  }
  const message: Mint = {
    $$type: "Mint",
    amount: 2000000000000n,
    receiver: Address.parse("0QAi8VQlwkwyAymIL9Gj_uoyYmCxQXUbd4-4Y_eKo79c8zDy"),
  };
  const args = {
    value: 200000000 as unknown as bigint,
    bounce: true as boolean,
  };

  async function getValue() {
    if (!mintContract) return;

    setVal(null);
    const val = await mintContract?.getGetJettonData();
    setVal(Number(val));
  }

  return {
    valueMint: val,
    addressMint: mintContract?.address.toString(),
    mintContract,
    sendMint: async () => {
      mintContract?.send(sender, args, message);
      await getValue();
      return;
    },
  };
}
