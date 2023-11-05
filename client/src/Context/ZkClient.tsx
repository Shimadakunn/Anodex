import { ethers } from "ethers";
import { createContext, useState, ReactNode, FC } from "react";
import { ZkBobClient, AccountConfig, ClientConfig, ProverMode, deriveSpendingKeyZkBob } from "zkbob-client-js";
import { hexToBuf } from "zkbob-client-js/lib/utils";
import { config } from "../config";
interface Props {
  children: React.ReactNode;
}
interface IZkClientContext {
  zkClient: ZkBobClient | undefined,
  login: undefined | (() => Promise<void>),
  getMnemonic: () => string | undefined
};

const ZkClientContext = createContext<IZkClientContext>({
  zkClient: undefined,
  login: undefined,
  getMnemonic: () => undefined
});
export default ZkClientContext;

interface ZkClientProviderProps {
  children: ReactNode
}

export const MNEMONIC_KEY = 'mnemonic';
export const ZK_ADDRESS_KEY = 'zkAddress';

export const ZkClientProvider = (props: ZkClientProviderProps) => {

  const [zkClient, setZkClient] = useState<ZkBobClient | undefined>(undefined);
  const [mnemonic, setMnemonic] = useState<string | undefined>(undefined);

  async function login(): Promise<void> {
    const client = await ZkBobClient.create(config, 'WETH-goerli');
    const randomHex = ethers.utils.hexlify(ethers.utils.randomBytes(32));
    const mnemonic = ethers.utils.entropyToMnemonic(hexToBuf(randomHex))
    console.log("mnemonic: ", mnemonic);
    setMnemonic(mnemonic);
    localStorage.setItem(MNEMONIC_KEY, mnemonic);
    const accountConfig: AccountConfig = {
      sk: deriveSpendingKeyZkBob(mnemonic),
      pool: 'WETH-goerli',
      birthindex: 0,
      proverMode: ProverMode.Local,
    };    
    await client.login(accountConfig);

    console.log(`Shielded account balance: ${await client.getTotalBalance()} Gwei`);
    console.log(client)
    setZkClient(client);
  }
  const getMnemonic = () => {
    return mnemonic;
  }

  return <ZkClientContext.Provider value={{ zkClient, login, getMnemonic }} >
    {props.children}
  </ZkClientContext.Provider>

}
