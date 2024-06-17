import Mint from "../contracts/mint";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "@ton/core";
import { useEffect } from "react";

export function useMintContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  console.log("senderMint", sender);

  const mintContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new Mint(
      Address.parse("EQABwEqVzEmTqUlu9TaREinX77FIwEzCeMtwJ17XqLb2sVD4")
    );
    return client.open(contract) as OpenedContract<Mint>;
  }, [client]);

  useEffect(() => {
    async function getValue() {
      if (!mintContract) return;
      const val = await mintContract.getMint();
      console.log('mintContract', val)
    }
    getValue();
  }, [mintContract]);

  console.log("mintContract", mintContract);
  return {
    getMint: () => {
        return mintContract?.sendIncrement(sender);
      },
  };
}
