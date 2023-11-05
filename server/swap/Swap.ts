import {buildSwapTx, getAddressFromPrivateKey, getQuote, signAndSendTransaction} from "../swap-api";
import {approveERC20Token} from "../swap-api/approve";
import Web3 from "web3";

export    const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mainnet.infura.io/v3/a78ea67f650a46e8bd97f3262d1cef43"));
export    const pk ="0x2f203586b40b11f749c38430dc23a16ad3f2bf3445bbdb0e49cbfb3d4316201f"
export const authKey = "88fcW2P6Lm5UGKOtKNU6PEfKTYETKBEp"
export  const networkId = 137
export   const token1 ="0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
    export  const token2 ="0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
    export  const OneInchRouter = '0x1111111254EEB25477B68fb85Ed929f73A960582';
    export  const TokenAmount = '10000000000000000';

    export  async function allow() {
        const approveResult = await approveERC20Token(web3, token1, pk, OneInchRouter, TokenAmount)
        if (approveResult) {
            console.log('-------------------')
            console.log('Approved');
            console.log('-------------------')
        }
    }

    export async function quote() {
    const resultsQuote = await getQuote(token1, token2, TokenAmount, authKey)
    console.log(`to token amount: ${resultsQuote}`);
}

export async function swap() {
    const swapTx = await buildSwapTx(token1, token2, TokenAmount, getAddressFromPrivateKey(pk), 1, networkId, authKey)
}