'use client';

import { useState, useEffect } from 'react';
import { LeaderboardEntry, RARITY_COLORS } from '@/types';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // Load leaderboard from localStorage
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    setLeaderboard(storedLeaderboard);

    // Refresh every 10 seconds
    const interval = setInterval(() => {
      const updatedLeaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
      setLeaderboard(updatedLeaderboard);
    }, 10000);

    return () => clearInterval(interval);
  }, [mounted]);

  const formatAddress = (address: string) => {
    if (address === 'Anonymous') return 'Anonymous';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-16 h-16 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-text-muted">Recent wins from the community</p>
        </div>

        {/* Leaderboard Table */}
        {leaderboard.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4 opacity-50">🏆</div>
            <p className="text-text-muted text-lg">No wins yet. Be the first!</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-gold/30 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 bg-gold/10 px-6 py-4 font-semibold text-sm text-gold border-b border-gold/30">
              <div className="col-span-3">User</div>
              <div className="col-span-4">Item</div>
              <div className="col-span-2">Rarity</div>
              <div className="col-span-2">Value</div>
              <div className="col-span-1">Time</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-gold/10">
              {leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 hover:bg-gold/5 transition-colors"
                >
                  {/* User */}
                  <div className="md:col-span-3 flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-gold-bright/30 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="text-white font-medium text-sm">
                      {formatAddress(entry.user)}
                    </span>
                  </div>

                  {/* Item */}
                  <div className="md:col-span-4 flex items-center space-x-3">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-xl opacity-20"
                      style={{ backgroundColor: RARITY_COLORS[entry.item.rarity] }}
                    >
                      ?
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">
                        {entry.item.weapon}
                      </p>
                      <p className="text-text-muted text-xs leading-tight">
                        {entry.item.skin}
                      </p>
                    </div>
                  </div>

                  {/* Rarity */}
                  <div className="md:col-span-2 flex items-center">
                    <div
                      className="text-xs px-3 py-1 rounded-full font-bold uppercase"
                      style={{
                        backgroundColor: `${RARITY_COLORS[entry.item.rarity]}20`,
                        color: RARITY_COLORS[entry.item.rarity],
                        border: `1px solid ${RARITY_COLORS[entry.item.rarity]}40`,
                      }}
                    >
                      {entry.item.rarity}
                    </div>
                  </div>

                  {/* Value */}
                  <div className="md:col-span-2 flex items-center">
                    <span className="text-gold-bright font-bold text-sm">
                      {entry.value} BNB
                    </span>
                  </div>

                  {/* Time */}
                  <div className="md:col-span-1 flex items-center">
                    <span className="text-text-muted text-xs">
                      {formatTime(entry.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {leaderboard.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border border-gold/30 p-6 text-center">
              <div className="text-3xl font-bold text-gold-bright mb-1">
                {leaderboard.length}
              </div>
              <div className="text-sm text-text-muted">Total Cases Opened</div>
            </div>

            <div className="bg-card rounded-lg border border-gold/30 p-6 text-center">
              <div className="text-3xl font-bold text-gold-bright mb-1">
                {leaderboard
                  .reduce((sum, entry) => sum + entry.value, 0)
                  .toFixed(4)} BNB
              </div>
              <div className="text-sm text-text-muted">Total Value Won</div>
            </div>

            <div className="bg-card rounded-lg border border-gold/30 p-6 text-center">
              <div className="text-3xl font-bold text-gold-bright mb-1">
                {Math.max(...leaderboard.map((e) => e.value))} BNB
              </div>
              <div className="text-sm text-text-muted">Highest Win</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
