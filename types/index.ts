export interface CaseItem {
  id: number;
  name: string;
  weapon: string;
  skin: string;
  rarity: 'consumer' | 'industrial' | 'mil-spec' | 'restricted' | 'classified' | 'covert' | 'special';
  image_url: string;
  probability: number;
  floor_price: number;
}

export interface CaseData {
  caseName: string;
  caseImage: string;
  caseDescription?: string;
  items: CaseItem[];
}

export interface InventoryItem extends CaseItem {
  wonAt: number;
  transactionHash?: string;
}

export interface LeaderboardEntry {
  user: string;
  item: CaseItem;
  caseName: string;
  timestamp: number;
  value: number;
}

export type Rarity = CaseItem['rarity'];

export const RARITY_COLORS: Record<Rarity, string> = {
  consumer: '#B0C3D9',
  industrial: '#5E98D9',
  'mil-spec': '#4B69FF',
  restricted: '#8847FF',
  classified: '#D32CE6',
  covert: '#EB4B4B',
  special: '#FFD700',
};

export const RARITY_LABELS: Record<Rarity, string> = {
  consumer: 'Consumer Grade',
  industrial: 'Industrial Grade',
  'mil-spec': 'Mil-Spec',
  restricted: 'Restricted',
  classified: 'Classified',
  covert: 'Covert',
  special: 'Special',
};
