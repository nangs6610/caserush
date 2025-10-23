import CaseRushABI from './CaseRushABI.json';

export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '97');

// BSC Testnet = 97, BSC Mainnet = 56
export const BSC_TESTNET = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
    public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  testnet: true,
};

export const BSC_MAINNET = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: { http: ['https://bsc-dataseed1.binance.org'] },
    public: { http: ['https://bsc-dataseed1.binance.org'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
};

export const CURRENT_CHAIN = CHAIN_ID === 56 ? BSC_MAINNET : BSC_TESTNET;

export const CASE_RUSH_ABI = CaseRushABI;

// Contract configuration for wagmi/viem
export const caseRushContract = {
  address: CONTRACT_ADDRESS,
  abi: CASE_RUSH_ABI,
  chainId: CHAIN_ID,
} as const;
