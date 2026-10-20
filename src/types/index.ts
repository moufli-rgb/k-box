export type FormulaId = 'kbox-1' | 'kbox-2' | 'kbox-3';

export type Gender = 'Femme' | 'Homme' | 'Enfant / Mixte';

export type EventType = 
  | 'Anniversaire' 
  | 'Saint-Valentin' 
  | 'Noël' 
  | 'Réussite & Diplôme' 
  | 'Déclaration d’Amour' 
  | 'Fête des Mères/Pères' 
  | 'Remerciement'
  | 'Autre';

export interface DominantColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  ribbonHex: string;
  description: string;
  isCustom?: boolean;
}

export type DeliveryType = 'orca_pickup' | 'home_delivery';

export interface DeliverySelection {
  type: DeliveryType;
  address?: string;
  district?: string;
  city?: string;
  phone: string;
  recipientName: string;
  deliveryNotes?: string;
  fee: number;
}

export type CustomizationTarget = 'packaging' | 'item' | 'both';

export interface BoxCustomization {
  target: CustomizationTarget;
  customText: string;
  targetItemId?: string; // id of item if item or both
}

export interface GiftItem {
  id: string;
  name: string;
  category: 
    | 'Gourmandise' 
    | 'Beauté & Senteur' 
    | 'Papeterie & Souvenir' 
    | 'Accessoire & Mode' 
    | 'Accessoire' 
    | 'Souvenir' 
    | 'Papeterie' 
    | 'High-Tech & Fun'
    | string;
  price: number; // in FCFA
  stock: number;
  imageUrl: string;
  description: string;
  genderTag?: 'Femme' | 'Homme' | 'Enfant / Mixte' | 'Tous';
}

export interface FormulaConfig {
  id: FormulaId;
  code: string;
  name: string;
  subtitle: string;
  badge?: string;
  basePrice: number; // 3000 for box 1, 5000 for box 2, 10000 for box 3
  itemBudgetCap?: number;
  itemCountCap?: number; // Up to 4 products
  packagingFeeIncluded?: number;
  freeDeliveryIncluded: boolean; // true for box 3, false for box 1 & 2
  allowsItemSelection: boolean;
  allowsCustomText: boolean;
  description: string;
  features: string[];
}

export interface CartState {
  formulaId: FormulaId;
  event: string;
  customEventText?: string;
  gender: Gender;
  color: DominantColor;
  customColorText?: string;
  selectedItems: { item: GiftItem; quantity: number }[];
  customization?: BoxCustomization;
  delivery: DeliverySelection;
  code?: string;
}

export interface OrderRecord {
  id: string;
  cartCode: string; // e.g. KB24
  createdAt: string;
  formulaId: FormulaId;
  formulaName: string;
  event: string;
  gender: Gender;
  colorName: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  itemsTotal: number;
  basePrice: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryType: DeliveryType;
  deliveryAddress: string;
  recipientName: string;
  recipientPhone: string;
  customization?: {
    target: CustomizationTarget;
    customText: string;
    targetItemName?: string;
  };
  status: 'en_attente_depot' | 'capture_recue' | 'en_preparation' | 'en_livraison' | 'livre';
  receiptImage?: string;
}
