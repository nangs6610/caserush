'use client';

import { CaseItem, RARITY_COLORS, RARITY_LABELS } from '@/types';
import { useState } from 'react';
import Image from 'next/image';

interface ItemGridProps {
  items: CaseItem[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  const [sortBy, setSortBy] = useState<'rarity' | 'price' | 'name'>('rarity');

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'price') {
      return b.floor_price - a.floor_price;
    } else if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      // Sort by rarity (special > covert > classified > restricted > mil-spec > industrial > consumer)
      const rarityOrder = {
        special: 7,
        covert: 6,
        classified: 5,
        restricted: 4,
        'mil-spec': 3,
        industrial: 2,
        consumer: 1,
      };
      return rarityOrder[b.rarity] - rarityOrder[a.rarity];
    }
  });

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          Skins <span className="text-text-muted text-lg">({items.length})</span>
        </h2>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-muted mr-2">Sort by:</span>
          <button
            onClick={() => setSortBy('rarity')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              sortBy === 'rarity'
                ? 'bg-gold text-black'
                : 'bg-card text-text-muted hover:bg-card/80'
            }`}
          >
            Rarity
          </button>
          <button
            onClick={() => setSortBy('price')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              sortBy === 'price'
                ? 'bg-gold text-black'
                : 'bg-card text-text-muted hover:bg-card/80'
            }`}
          >
            Price
          </button>
          <button
            onClick={() => setSortBy('name')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              sortBy === 'name'
                ? 'bg-gold text-black'
                : 'bg-card text-text-muted hover:bg-card/80'
            }`}
          >
            Name
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {sortedItems.map((item) => (
          <div
            key={item.id}
            className="bg-card rounded-lg border-2 hover:scale-105 transition-transform duration-200 overflow-hidden"
            style={{
              borderColor: RARITY_COLORS[item.rarity],
            }}
          >
            {/* Rarity bar */}
            <div
              className="h-2"
              style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
            ></div>

            {/* Item Image */}
            <div className="p-4 pb-2">
              <div className="aspect-square flex items-center justify-center relative">
                <Image
                  src={item.image_url}
                  alt={`${item.weapon} ${item.skin}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Info */}
            <div className="p-4 pt-2 space-y-2">
              <div className="text-center">
                <p className="text-sm font-bold text-white leading-tight">
                  {item.weapon}
                </p>
                <p className="text-xs text-text-muted leading-tight">
                  {item.skin}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gold/10">
                <div
                  className="text-[9px] px-2 py-1 rounded-full font-bold uppercase"
                  style={{
                    backgroundColor: `${RARITY_COLORS[item.rarity]}20`,
                    color: RARITY_COLORS[item.rarity],
                  }}
                >
                  {item.rarity}
                </div>
                <div className="text-xs text-gold-bright font-bold">
                  {item.floor_price} BNB
                </div>
              </div>

              {/* Probability */}
              <div className="text-center">
                <div className="text-xs text-text-muted">
                  {(item.probability * 100).toFixed(2)}%
                </div>
                <div className="w-full bg-background/50 rounded-full h-1.5 mt-1">
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${item.probability * 100}%`,
                      backgroundColor: RARITY_COLORS[item.rarity],
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
