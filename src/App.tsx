import "./App.css";
import { Header } from "./components/Header";
// import { Address } from "./components/Address";
import { Wallet } from "./components/Wallet";
import { useTonConnect } from "./hooks/useTonConnect";
import { useCounterContract } from "./hooks/useCounterContractStep7";
import { useMintContract } from "./hooks/useMintContract";

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  const { getMint } = useMintContract();

  return (
    <div className="App">
      <div className="flex flex-col gap-4">
        <Header />
        {/* <Address /> */}
        <Wallet />

        <div className="Card">
          <b>Counter Address</b>
          <div className="Hint">{address?.slice(0, 30) + "..."}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? "Loading..."}</div>
        </div>

        <div className="flex flex-row gap-4">
          <button
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              sendIncrement();
            }}
          >
            Increment
          </button>
          <button
            className={`Button ${connected ? "Active" : "Disabled"}`}
            onClick={() => {
              getMint();
            }}
          >
            Alo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
