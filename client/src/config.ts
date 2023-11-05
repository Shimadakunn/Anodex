import { ClientConfig, DepositType } from "zkbob-client-js";
const api_key = "your quicknode apiKey"
export const config:ClientConfig = {
pools: {
  'WETH-goerli': {
    'chainId': 5,
    'poolAddress': '0xf9dbCF4005497e042838dE9082C817fCa790e945',
    'tokenAddress': '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    'relayerUrls': ['https://goerli-weth-relayer.thgkjlr.website'],
    'delegatedProverUrls': [],
    'coldStorageConfigPath': '',
    'isNative': true,
    'depositScheme':DepositType.PermitV2
  }
},
chains: {
  '5': {
    "rpcUrls": ["https://goerli.infura.io/v3/a78ea67f650a46e8bd97f3262d1cef43"] // list of available JSON RPC endpoints
  },
},
snarkParams: {
  transferParamsUrl: `${process.env.PUBLIC_URL}/params.bin`,
  transferVkUrl: `${process.env.PUBLIC_URL}/vk.json`
},
supportId: 'unique_string_generated_with_uuidv4',
forcedMultithreading: undefined // multithreading config will be selected automatically
}
