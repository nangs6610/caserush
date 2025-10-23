'use client';

import { useState, useEffect } from 'react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import Image from 'next/image';
import { getCaseData, validateCaseData, rollCaseItem, generateReel } from '@/lib/caseData';
import { CaseData, CaseItem, InventoryItem, LeaderboardEntry } from '@/types';
import ItemGrid from '@/components/ItemGrid';
import CaseOpening from '@/components/CaseOpening';

const CASE_PRICE_BNB = parseFloat(process.env.NEXT_PUBLIC_CASE_PRICE_BNB || '0.03');

export default function Home() {
  const { authenticated, login } = usePrivy();
  const { wallets } = useWallets();

  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [winningItem, setWinningItem] = useState<CaseItem | null>(null);
  const [reel, setReel] = useState<CaseItem[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isWaitingApproval, setIsWaitingApproval] = useState(false);

  useEffect(() => {
    // Load case data
    const data = getCaseData();
    const validation = validateCaseData(data);

    if (!validation.valid) {
      setValidationError(validation.error || 'Invalid case data');
    } else {
      setCaseData(data);
    }
  }, []);

  const handleOpenCase = async () => {
    if (!authenticated) {
      login();
      return;
    }

    if (!caseData) return;
    if (wallets.length === 0) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

      if (isDemoMode) {
        // Demo mode - local randomness
        const rolledItem = rollCaseItem(caseData.items);
        const generatedReel = generateReel(caseData.items, rolledItem);
        setWinningItem(rolledItem);
        setReel(generatedReel);
        setIsOpening(true);
      } else {
        // Real contract mode
        setIsWaitingApproval(true);

        try {
          const wallet = wallets[0];
          const { openCaseOnChain, getUserInventory } = await import('@/lib/contractHelpers');
          const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '97');
          const userAddress = wallet.address;

          console.log('Calling contract to open case...');
          const { txHash } = await openCaseOnChain(wallet, chainId);

          console.log('Case opened! Transaction:', txHash);

          // Wait a moment for blockchain to update
          await new Promise(resolve => setTimeout(resolve, 2000));

          // Query contract to get the actual winning item
          console.log('Fetching actual winning item from blockchain...');
          const inventory: any = await getUserInventory(userAddress, chainId);

          // Get the most recent item (last in array)
          const mostRecentItem = inventory[inventory.length - 1];
          const wonItemId = Number(mostRecentItem.itemId);

          console.log('User won item ID:', wonItemId);

          // Get the actual item from case data (items are 1-indexed in contract)
          const actualWinningItem = caseData.items[wonItemId - 1];

          console.log('Actual winning item:', actualWinningItem);

          // Generate reel with the ACTUAL winning item
          const generatedReel = generateReel(caseData.items, actualWinningItem);

          setWinningItem(actualWinningItem);
          setReel(generatedReel);
          setIsOpening(true);
          setIsWaitingApproval(false);
        } catch (error: any) {
          console.error('Contract call failed:', error);
          setIsWaitingApproval(false);
          alert(error?.message || 'Failed to open case. Please try again.');
          return;
        }
      }
    } catch (error) {
      console.error('Error opening case:', error);
      setIsWaitingApproval(false);
      alert('Failed to open case. Please try again.');
    }
  };

  const handleOpeningComplete = (item: CaseItem) => {
    // Save to inventory (localStorage)
    const inventoryItem: InventoryItem = {
      ...item,
      wonAt: Date.now(),
    };

    const existingInventory = JSON.parse(localStorage.getItem('inventory') || '[]');
    existingInventory.push(inventoryItem);
    localStorage.setItem('inventory', JSON.stringify(existingInventory));

    // Save to leaderboard
    const address = wallets[0]?.address || 'Anonymous';
    const leaderboardEntry: LeaderboardEntry = {
      user: address,
      item: item,
      caseName: caseData?.caseName || 'Rush Case',
      timestamp: Date.now(),
      value: item.floor_price,
    };

    const existingLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    existingLeaderboard.unshift(leaderboardEntry);
    // Keep only last 100 entries
    if (existingLeaderboard.length > 100) {
      existingLeaderboard.pop();
    }
    localStorage.setItem('leaderboard', JSON.stringify(existingLeaderboard));

    setShowResult(true);
  };

  const handlePlayAgain = () => {
    setIsOpening(false);
    setShowResult(false);
    setWinningItem(null);
    setReel([]);
  };

  if (validationError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-card border border-error rounded-xl p-8 max-w-md text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-error mb-2">Configuration Error</h1>
          <p className="text-text-muted">{validationError}</p>
          <p className="text-sm text-text-muted mt-4">
            Please check your <code className="bg-background px-2 py-1 rounded">data/rush_case_items.json</code> file.
          </p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Waiting for Approval Modal */}
      {isWaitingApproval && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-card border border-gold/30 rounded-xl p-8 text-center max-w-md">
            <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-white mb-2">Waiting for Approval</h2>
            <p className="text-text-muted">Please approve the transaction in your wallet...</p>
          </div>
        </div>
      )}

      {/* Opening Modal */}
      {isOpening && winningItem && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full">
            <CaseOpening
              reel={reel}
              winningItem={winningItem}
              onComplete={handleOpeningComplete}
            />

            {showResult && (
              <div className="mt-6 text-center space-y-4">
                <button
                  onClick={handlePlayAgain}
                  className="bg-gradient-to-r from-gold to-gold-bright hover:from-gold-bright hover:to-gold text-black font-bold px-8 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Open Another Case
                </button>
                <div>
                  <a
                    href="/inventory"
                    className="text-gold-bright hover:underline text-sm"
                  >
                    View Inventory →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Degen Case
          </h1>
        </div>

        {/* Case Display */}
        <div className="max-w-md mx-auto">
          <div className="bg-card rounded-2xl p-8 text-center space-y-3 shadow-2xl">
            {/* Case Image */}
            <div className="w-64 h-64 mx-auto relative">
              <Image
                src="/images/case/maincaseimage.png"
                alt="Rush Case"
                width={256}
                height={256}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Case Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{caseData.caseName}</h2>
              <div className="text-4xl font-bold text-gold-bright">
                {CASE_PRICE_BNB} BNB
              </div>
            </div>

            {/* Open Button */}
            <button
              onClick={handleOpenCase}
              disabled={isOpening}
              className="w-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Image
                src="/images/openbuttonlogo/openlogo.png"
                alt={!authenticated ? 'Connect Wallet to Open' : 'Open Case'}
                width={600}
                height={120}
                className="w-full h-auto"
              />
            </button>

            {/* Disclaimer */}
            <p className="text-xs text-text-muted">
              By opening this case, you agree to our terms. Results are provably fair and verifiable.
            </p>
          </div>
        </div>

        {/* Items Grid */}
        <ItemGrid items={caseData.items} />
      </div>
    </div>
  );
}
