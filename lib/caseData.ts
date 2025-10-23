import { CaseData, CaseItem } from '@/types';
import caseDataJson from '@/data/rush_case_items.json';

export function getCaseData(): CaseData {
  return caseDataJson as CaseData;
}

export function validateCaseData(caseData: CaseData): { valid: boolean; error?: string } {
  const totalProbability = caseData.items.reduce((sum, item) => sum + item.probability, 0);

  if (Math.abs(totalProbability - 1.0) > 0.01) {
    return {
      valid: false,
      error: `Total probability is ${totalProbability.toFixed(3)}, but should be 1.0`,
    };
  }

  if (caseData.items.length === 0) {
    return {
      valid: false,
      error: 'No items found in case data',
    };
  }

  return { valid: true };
}

export function rollCaseItem(items: CaseItem[], seed?: number): CaseItem {
  // Use provided seed or random for demo
  const random = seed !== undefined ? seed : Math.random();

  let cumulative = 0;
  for (const item of items) {
    cumulative += item.probability;
    if (random <= cumulative) {
      return item;
    }
  }

  // Fallback to last item if something goes wrong
  return items[items.length - 1];
}

export function generateReel(
  items: CaseItem[],
  winningItem: CaseItem,
  reelLength: number = 100
): CaseItem[] {
  const reel: CaseItem[] = [];

  // Sort items by value to identify high-value items
  const sortedItems = [...items].sort((a, b) => b.floor_price - a.floor_price);
  const highValueItems = sortedItems.slice(0, 3); // Top 3 most valuable items

  // Fill reel with random items based on probabilities
  for (let i = 0; i < reelLength; i++) {
    const randomItem = rollCaseItem(items, Math.random());
    reel.push(randomItem);
  }

  // Place winning item near the end (around 85% through)
  const winPosition = Math.floor(reelLength * 0.85);

  // Mark the winning item with a special property so we can find it later
  const markedWinningItem = { ...winningItem, isWinner: true };
  reel[winPosition] = markedWinningItem as CaseItem;

  // Add "near miss" high-value items just before the winning item
  // This creates excitement and tension
  const nearMissPositions = [winPosition - 3, winPosition - 6, winPosition - 9];

  nearMissPositions.forEach((pos, index) => {
    if (pos >= 0 && pos < reelLength) {
      // Pick a high-value item that's NOT the winning item
      const nearMissItem = highValueItems.find(item => item.id !== winningItem.id) || highValueItems[0];
      reel[pos] = nearMissItem;
    }
  });

  return reel;
}
