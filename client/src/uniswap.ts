import {
    authKey,
    ethNetworkRPC,
    NativeToken,
    OneInchRouter,
    OneInchToken,
    OneInchTokenAmount,
    pk,
    sleep,
    USDCCoinBSC,
    WETH_Token
} from "./config/config";
import {buildSwapTx, getAddressFromPrivateKey, getQuote, signAndSendTransaction} from "./swap-api";
import {approveERC20Token} from "./swap-api/approve";
import Web3 from "web3";

const DO_APPROVE = false;
const DO_SWAP = false;
const DO_QUOTE = false;

// const DO_CHECK_ORDERS = false;

async function main() {

    const web3 = new Web3(new Web3.providers.HttpProvider(ethNetworkRPC));

    if (DO_APPROVE) {
        const approveResult = await approveERC20Token(web3, OneInchToken, pk, OneInchRouter, OneInchTokenAmount)
        if (approveResult) {
            console.log('-------------------')
            console.log('Approved');
            console.log('-------------------')
        }
    }

    if (DO_QUOTE) {
        const resultsQuote = await getQuote(OneInchToken, NativeToken, OneInchTokenAmount, "88fcW2P6Lm5UGKOtKNU6PEfKTYETKBEp")
        console.log(`to token amount: ${resultsQuote}`);
        await sleep(1001);
    }

    if (DO_SWAP) {
        const swapTx = await buildSwapTx(OneInchToken, NativeToken, OneInchTokenAmount, getAddressFromPrivateKey(pk), 1, 1, authKey)
        await sleep(1001);

        const txHash = await signAndSendTransaction(web3, pk, swapTx, 1, "88fcW2P6Lm5UGKOtKNU6PEfKTYETKBEp");
        console.log(txHash);
    }
}

main()