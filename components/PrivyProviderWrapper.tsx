'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { bsc, bscTestnet } from 'viem/chains';

// Use testnet or mainnet based on CHAIN_ID env variable
const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '97');
const currentChain = CHAIN_ID === 56 ? bsc : bscTestnet;

export default function PrivyProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          theme: 'dark',
          accentColor: '#C9A227',
          logo: '/images/logo/caserushlogotransparent.png',
        },
        loginMethods: ['wallet', 'email', 'google'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: currentChain,
        supportedChains: [currentChain],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
