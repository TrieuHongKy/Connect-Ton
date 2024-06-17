import { Address, beginCell, Cell, Contract, ContractProvider, Sender } from "@ton/core";

export default class Mint implements Contract {
  async sendIncrement(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell()
      .storeUint(1, 32) // op (op #1 = increment)
      .storeUint(0, 64) // query id
      .endCell();
    await provider.internal(via, {
      value: "0.002", // send 0.002 TON for gas
      body: messageBody
    });
  }
  
  async getMint(provider: ContractProvider) {
    const { stack } = await provider.get("SampleJetton", []);
    return stack.readBigNumber();
  }

  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}
}
