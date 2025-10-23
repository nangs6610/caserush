import { CONTRACT_ADDRESS, CASE_RUSH_ABI } from './contract';
import { parseEther, encodeFunctionData as viemEncodeFunctionData } from 'viem';

/**
 * Generates a random client seed for provably fair randomness
 */
export function generateClientSeed(): `0x${string}` {
  const randomBytes = new Uint8Array(32);
  crypto.getRandomValues(randomBytes);
  return `0x${Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')}` as `0x${string}`;
}

/**
 * Calls the openCase function on the smart contract
 * @param wallet - The Privy wallet instance
 * @param chainId - The chain ID (97 for testnet, 56 for mainnet)
 * @returns Transaction hash and event data
 */
export async function openCaseOnChain(wallet: any, chainId: number) {
  try {
    const clientSeed = generateClientSeed();

    console.log('Opening case on chain...');
    console.log('Contract address:', CONTRACT_ADDRESS);
    console.log('Client seed:', clientSeed);
    console.log('Wallet object:', wallet);

    // Encode the function call using viem
    const data = viemEncodeFunctionData({
      abi: CASE_RUSH_ABI,
      functionName: 'openCase',
      args: [clientSeed],
    });

    console.log('Encoded data:', data);

    // Get the ethereum provider from the wallet
    const provider = await wallet.getEthereumProvider();

    // Create a wallet client
    const { createWalletClient, custom } = await import('viem');
    const walletClient = createWalletClient({
      chain: chainId === 56 ?
        (await import('viem/chains')).bsc :
        (await import('viem/chains')).bscTestnet,
      transport: custom(provider),
    });

    // Send transaction using viem wallet client
    const txHash = await walletClient.sendTransaction({
      account: wallet.address as `0x${string}`,
      to: CONTRACT_ADDRESS,
      value: parseEther('0.03'),
      data,
    });

    console.log('Transaction sent:', txHash);
    return { txHash, clientSeed };
  } catch (error) {
    console.error('Error opening case:', error);
    throw error;
  }
}

/**
 * Maps item ID from contract to local case data
 */
export function mapItemIdToLocalItem(itemId: number, caseItems: any[]) {
  // Contract items are 1-indexed, array is 0-indexed
  const index = itemId - 1;
  if (index < 0 || index >= caseItems.length) {
    console.error('Invalid item ID:', itemId);
    return caseItems[0]; // Fallback to first item
  }
  return caseItems[index];
}

/**
 * Gets user's on-chain inventory
 */
export async function getUserInventory(userAddress: string, chainId: number) {
  try {
    const { createPublicClient, http } = await import('viem');

    const publicClient = createPublicClient({
      chain: chainId === 56 ?
        (await import('viem/chains')).bsc :
        (await import('viem/chains')).bscTestnet,
      transport: http(),
    });

    const inventory = await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: CASE_RUSH_ABI,
      functionName: 'getUserInventory',
      args: [userAddress as `0x${string}`],
    });

    return inventory;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
}

/**
 * Sells an item from on-chain inventory
 */
export async function sellItemOnChain(wallet: any, inventoryIndex: number, chainId: number) {
  try {
    console.log('Selling item at index:', inventoryIndex);
    console.log('Inventory index as BigInt:', BigInt(inventoryIndex));

    const data = viemEncodeFunctionData({
      abi: CASE_RUSH_ABI,
      functionName: 'sellItem',
      args: [inventoryIndex], // Don't convert to BigInt - viem will handle it
    });

    console.log('Encoded sellItem data:', data);

    // Get the ethereum provider from the wallet
    const provider = await wallet.getEthereumProvider();

    // Create a wallet client
    const { createWalletClient, custom } = await import('viem');
    const walletClient = createWalletClient({
      chain: chainId === 56 ?
        (await import('viem/chains')).bsc :
        (await import('viem/chains')).bscTestnet,
      transport: custom(provider),
    });

    // Send transaction
    const txHash = await walletClient.sendTransaction({
      account: wallet.address as `0x${string}`,
      to: CONTRACT_ADDRESS,
      data,
    });

    console.log('Sell transaction sent:', txHash);
    return txHash;
  } catch (error) {
    console.error('Error selling item:', error);
    throw error;
  }
}
