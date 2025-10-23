'use client';

import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { InventoryItem, RARITY_COLORS, RARITY_LABELS, CaseData } from '@/types';
import { getCaseData } from '@/lib/caseData';
import Image from 'next/image';

interface OnChainItem {
  inventoryIndex: number;
  itemId: number;
  timestamp: number;
  redeemed: boolean;
  itemData: CaseData; // From caseData
}

export default function InventoryPage() {
  const { authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const [inventory, setInventory] = useState<OnChainItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selling, setSelling] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Load on-chain inventory
  useEffect(() => {
    if (mounted && authenticated && wallets.length > 0) {
      loadInventory();
    }
  }, [authenticated, mounted, wallets]);

  const loadInventory = async () => {
    setLoading(true);
    try {
      const { getUserInventory } = await import('@/lib/contractHelpers');
      const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '97');
      const userAddress = wallets[0].address;

      console.log('Loading inventory for:', userAddress);
      const onChainInventory: any = await getUserInventory(userAddress, chainId);

      console.log('On-chain inventory:', onChainInventory);

      // Get case data to map item IDs to item details
      const caseData = getCaseData();

      // Map on-chain inventory to display format
      const formattedInventory: OnChainItem[] = onChainInventory
        .map((item: any, index: number) => {
          const itemId = Number(item.itemId);
          const redeemed = item.redeemed;

          // Skip redeemed items
          if (redeemed) return null;

          // Get item details from case data (items are 1-indexed in contract)
          const itemData = caseData.items[itemId - 1];

          return {
            inventoryIndex: index,
            itemId,
            timestamp: Number(item.timestamp),
            redeemed,
            itemData,
          };
        })
        .filter((item: any) => item !== null);

      setInventory(formattedInventory);
    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSell = async (inventoryIndex: number) => {
    if (wallets.length === 0) {
      alert('Please connect your wallet');
      return;
    }

    setSelling(inventoryIndex);

    try {
      const { sellItemOnChain } = await import('@/lib/contractHelpers');
      const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '97');
      const wallet = wallets[0];

      console.log('Selling item at inventory index:', inventoryIndex);
      const txHash = await sellItemOnChain(wallet, inventoryIndex, chainId);

      console.log('Item sold! Transaction:', txHash);

      // Immediately remove from UI (optimistic update)
      setInventory(prev => prev.filter(item => item.inventoryIndex !== inventoryIndex));

      // Show success message
      alert(`Item sold! You received BNB. TX: ${txHash}`);

      // Reload from blockchain in background to confirm
      setTimeout(() => {
        loadInventory();
      }, 3000);
    } catch (error: any) {
      console.error('Error selling item:', error);
      alert(error?.message || 'Failed to sell item. Please try again.');

      // Reload inventory to restore correct state if transaction failed
      await loadInventory();
    } finally {
      setSelling(null);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-card border border-gold/30 rounded-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-text-muted mb-6">
            Please connect your wallet to view your inventory.
          </p>
          <button
            onClick={login}
            className="bg-gradient-to-r from-gold to-gold-bright hover:from-gold-bright hover:to-gold text-black font-bold px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Your Inventory</h1>
            <p className="text-text-muted">
              {inventory.length} {inventory.length === 1 ? 'item' : 'items'} won
            </p>
          </div>
          <button
            onClick={loadInventory}
            disabled={loading}
            className="bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold-bright font-semibold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Loading...' : '🔄 Refresh'}
          </button>
        </div>

        {/* Inventory Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full"></div>
          </div>
        ) : inventory.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">📦</div>
            <p className="text-text-muted text-lg">Your inventory is empty</p>
            <a
              href="/"
              className="inline-block mt-4 text-gold-bright hover:underline"
            >
              Open your first case →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {inventory.map((item) => (
              <div
                key={`${item.inventoryIndex}`}
                className="bg-card rounded-lg border-2 overflow-hidden transition-transform hover:scale-105"
                style={{ borderColor: RARITY_COLORS[item.itemData.rarity as keyof typeof RARITY_COLORS] }}
              >
                {/* Rarity bar */}
                <div
                  className="h-2"
                  style={{ backgroundColor: RARITY_COLORS[item.itemData.rarity as keyof typeof RARITY_COLORS] }}
                ></div>

                {/* Item Image */}
                <div className="p-6 pb-4">
                  <div className="aspect-square flex items-center justify-center relative">
                    <Image
                      src={item.itemData.image_url}
                      alt={`${item.itemData.weapon} ${item.itemData.skin}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain drop-shadow-lg"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 pt-2 space-y-3">
                  <div className="text-center">
                    <p className="text-base font-bold text-white leading-tight">
                      {item.itemData.weapon}
                    </p>
                    <p className="text-sm text-text-muted leading-tight">
                      {item.itemData.skin}
                    </p>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-b border-gold/10">
                    <div
                      className="text-[10px] px-2 py-1 rounded-full font-bold uppercase"
                      style={{
                        backgroundColor: `${RARITY_COLORS[item.itemData.rarity as keyof typeof RARITY_COLORS]}20`,
                        color: RARITY_COLORS[item.itemData.rarity as keyof typeof RARITY_COLORS],
                      }}
                    >
                      {RARITY_LABELS[item.itemData.rarity]}
                    </div>
                    <div className="text-sm text-gold-bright font-bold">
                      {item.itemData.floor_price} BNB
                    </div>
                  </div>

                  <div className="text-xs text-text-muted text-center">
                    Won {new Date(item.timestamp * 1000).toLocaleDateString()}
                  </div>

                  {/* Sell Button */}
                  <button
                    onClick={() => handleSell(item.inventoryIndex)}
                    disabled={selling === item.inventoryIndex}
                    className="w-full bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold-bright font-semibold px-4 py-2 rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {selling === item.inventoryIndex ? 'Selling...' : 'Sell Item'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
