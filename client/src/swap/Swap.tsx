import { useEffect, useState } from "react";
import {
  buildSwapTx,
  getAddressFromPrivateKey,
  getQuote,
  signAndSendTransaction,
} from "../swap-api";
import { approveERC20Token } from "../swap-api/approve";
import Web3 from "web3";
const Swap = () => {
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://polygon-mainnet.infura.io/v3/a78ea67f650a46e8bd97f3262d1cef43"
    )
  );
  const pk =
    "0x2f203586b40b11f749c38430dc23a16ad3f2bf3445bbdb0e49cbfb3d4316201f";
  const authKey = "88fcW2P6Lm5UGKOtKNU6PEfKTYETKBEp";
  const networkId = 137;
  const token1 = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  const token2 = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
  const OneInchRouter = "0x1111111254EEB25477B68fb85Ed929f73A960582";
  const TokenAmount = "10000000000000000";

  async function allow() {
    const approveResult = await approveERC20Token(
      web3,
      token1,
      pk,
      OneInchRouter,
      TokenAmount
    );
    if (approveResult) {
      console.log("-------------------");
      console.log("Approved");
      console.log("-------------------");
    }
  }
  const [data, setData] = useState(null);
  const [quoote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  function quote() {
    fetch("http://localhost:3001/quote")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        setQuote(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  async function swap() {
    fetch("http://localhost:3001/swap")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("response:"+JSON.stringify(response));
        return response.json();
      })
      .then((json) => {
        setQuote(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  return (
    <div className="w-[100vw] h-screen">
      hello
      <button onClick={() => allow()}>Allow</button>
      <button onClick={() => quote()}>Quote</button>
      <button onClick={() => swap()}>Swap</button>
      Quote: {parseInt(JSON.stringify(quoote, null, 2))}
      {/* {data ? <div>From: {data.blockHash}</div> : null} */}
    </div>
  );
};

export default Swap;
