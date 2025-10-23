'use client';

import { useState, useRef, useEffect } from 'react';
import { CaseItem } from '@/types';
import { RARITY_COLORS, RARITY_LABELS } from '@/types';
import Image from 'next/image';

interface CaseOpeningProps {
  reel: CaseItem[];
  winningItem: CaseItem;
  onComplete: (item: CaseItem) => void;
}

export default function CaseOpening({
  reel,
  winningItem,
  onComplete,
}: CaseOpeningProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    // Prevent double execution (React Strict Mode in dev)
    if (hasStartedRef.current) return;
    if (isSpinning || hasCompleted) return;

    hasStartedRef.current = true;
    // Auto-start the spin immediately
    startSpin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startSpin = () => {
    setIsSpinning(true);

    // Play audio when spin starts
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log('Audio play failed:', err));
    }

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      // Calculate winning position
      const itemWidth = 170; // Width of each item card (w-[170px])
      const itemSpacing = 16; // space-x-4 = 1rem = 16px
      const totalItemWidth = itemWidth + itemSpacing;
      // Find the winning item (marked with isWinner property)
      const winningIndex = reel.findIndex((item: any) => item.isWinner === true);
      const containerWidth = containerRef.current?.offsetWidth || 800;
      const centerOffset = containerWidth / 2 - itemWidth / 2;

      console.log('Debug Info:', {
        winningIndex,
        winningItemId: winningItem.id,
        reelLength: reel.length,
        containerWidth,
        centerOffset
      });

      // If item not found, use last item
      const validIndex = winningIndex >= 0 ? winningIndex : reel.length - 1;

      // Start position: Center the first item initially
      const startPosition = centerOffset;

      // Calculate final position to center winning item
      const finalPosition = -(validIndex * totalItemWidth - centerOffset);

      console.log('Positions:', {
        startPosition,
        finalPosition,
        totalItemWidth,
        validIndex
      });

      if (reelRef.current) {
        // Ensure no transition initially
        reelRef.current.style.transition = 'none';

        // Set initial position (first item centered)
        reelRef.current.style.transform = `translateY(-45%) translateX(${startPosition}px)`;

        // Force a reflow to ensure initial position is applied
        reelRef.current.offsetHeight;

        // Small delay, then start animation
        setTimeout(() => {
          if (reelRef.current) {
            console.log('Starting animation to:', finalPosition);
            // Use a dramatic easing function that:
            // - FLIES through items at the start (instant acceleration)
            // - Slows down dramatically at the end (tension builds)
            // Duration: 8 seconds for maximum suspense
            // cubic-bezier(0.05, 0.95, 0.2, 1) = extreme fast start, gradual slow end
            reelRef.current.style.transition = 'transform 8s cubic-bezier(0.05, 0.95, 0.2, 1)';
            // IMPORTANT: Maintain translateY(-45%) for vertical positioning
            reelRef.current.style.transform = `translateY(-45%) translateX(${finalPosition}px)`;

            // Complete after animation
            setTimeout(() => {
              setIsSpinning(false);
              setHasCompleted(true);
              onComplete(winningItem);
            }, 8000);
          }
        }, 100);
      }
    }, 100);
  };

  return (
    <div className="w-full bg-card rounded-xl overflow-hidden border border-gold/30 shadow-2xl">
      {/* Audio Element */}
      <audio ref={audioRef} src="/audio/spinaudio/spinaudio.m4a" preload="auto" />
      {/* Indicator Line */}
      <div className="relative h-[280px] overflow-hidden" ref={containerRef}>
        {/* Center indicator */}
        <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gold-bright shadow-[0_0_20px_rgba(242,201,76,0.6)] z-20 transform -translate-x-1/2"></div>

        {/* Top/Bottom fade overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent"></div>
        </div>

        {/* Reel */}
        <div
          ref={reelRef}
          className="absolute left-0 flex items-center space-x-4 px-4"
          style={{
            top: '50%',
          }}
        >
          {reel.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[170px] h-[240px] bg-background/80 rounded-lg border-2 flex flex-col items-center justify-center p-4 relative overflow-hidden"
              style={{
                borderColor: RARITY_COLORS[item.rarity],
                boxShadow: `0 0 20px ${RARITY_COLORS[item.rarity]}40`,
              }}
            >
              {/* Rarity bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
              ></div>

              {/* Item image */}
              <div className="w-full h-32 flex items-center justify-center mb-2 relative">
                <Image
                  src={item.image_url}
                  alt={`${item.weapon} ${item.skin}`}
                  width={120}
                  height={120}
                  className="w-24 h-24 object-contain drop-shadow-lg"
                />
              </div>

              {/* Item name */}
              <div className="text-center text-xs font-semibold text-white leading-tight mb-1">
                {item.weapon}
              </div>
              <div className="text-center text-[10px] text-text-muted leading-tight mb-2">
                {item.skin}
              </div>

              {/* Rarity badge */}
              <div
                className="text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${RARITY_COLORS[item.rarity]}20`,
                  color: RARITY_COLORS[item.rarity],
                  border: `1px solid ${RARITY_COLORS[item.rarity]}40`,
                }}
              >
                {RARITY_LABELS[item.rarity]}
              </div>

              {/* Price */}
              <div className="text-xs text-gold-bright font-bold mt-1">
                {item.floor_price} BNB
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="bg-background/50 py-4 px-6 text-center border-t border-gold/20">
        {isSpinning && (
          <p className="text-gold-bright font-semibold animate-pulse">
            Opening case...
          </p>
        )}
        {hasCompleted && (
          <div className="space-y-2">
            <p className="text-success font-bold text-lg">You won!</p>
            <p className="text-white font-semibold">
              {winningItem.name} - {winningItem.floor_price} BNB
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
