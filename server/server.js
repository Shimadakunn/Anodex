require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const Web3 = require("web3");

const authKey = "88fcW2P6Lm5UGKOtKNU6PEfKTYETKBEp";
const networkId = 137; //polygon
const token1 = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"; //matic
const token2 = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"; //weth
const OneInchRouter = "0x1111111254EEB25477B68fb85Ed929f73A960582";
const TokenAmount = "1000000000000000000";
const pbk = process.env.PUBLIC_KEY;
const pk =process.env.PRIVATE_KEY;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://polygon-mainnet.infura.io/v3/a78ea67f650a46e8bd97f3262d1cef43"
  )
);
async function sleep(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}
async function broadCastRawTransaction(rawTransaction, chainId, authKey, isPrivate = false) {
  try {
      let url = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/broadcast";
      if (chainId === 1 && isPrivate) {
          url = "https://api.1inch.dev/tx-gateway/v1.1/" + chainId + "/flashbots";
      }
      const options = {
          method: 'POST',
          url,
          data: {rawTransaction: rawTransaction},
          headers: {
              'Authorization': `Bearer ${authKey}`,
              'Content-Type': 'application/json',
          },
      };
      const result = await axios.request(options);
      return result.data.transactionHash
  } catch (e) {
      console.error(e)
      return null
  }
}

async function quote() {
  return await getQuote(token1, token2, TokenAmount, authKey);
}

async function signAndSendTransaction(web3, pk, transaction,network, authKey, isPrivate = false) {
  const {rawTransaction} = await web3.eth.accounts.signTransaction(transaction, pk);

  return await broadCastRawTransaction(rawTransaction, network, authKey, isPrivate);
}

async function swap() {
  const swapTx =  await buildSwapTx(
    token1,
    token2,
    TokenAmount,
    pbk, //pbk
    1,
    networkId,
    authKey
    );
    await sleep(1001);
    return await signAndSendTransaction(web3, pk, swapTx, networkId, authKey);
    console.log(txHash);
}
async function getQuote(from, to, amount, authKey) {
  try {
    const options = {
      method: "GET",
      url: `https://api.1inch.dev/swap/v5.2/137/quote?src=${from}&dst=${to}&amount=${amount}`,
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    };
    const result = await axios.request(options);
    return result.data.toAmount;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function buildSwapTx(
  from,
  to,
  amount,
  fromAddress,
  slippage,
  network,
  authKey
) {
  try {
    const options = {
      method: "GET",
      url: `https://api.1inch.dev/swap/v5.2/${network}/swap?src=${from}&dst=${to}&amount=${amount}&from=${fromAddress}&slippage=${slippage}`,
      headers: {
        Authorization: `Bearer ${authKey}`,
      },
    };
    const result = await axios.request(options);
    return result.data.tx;
  } catch (e) {
    console.error(e);
    return null;
  }
}

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.get("/swap", async (req, res) => {
  const result = await swap();
  res.send(result);
});

app.get("/quote", async (req, res) => {
  const result = await quote();
  res.send(result);
});

app.post("/create-checkout-session", async (req, res) => {});

app.listen(3001);
