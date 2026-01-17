
export type ProductType = 'T-Shirt' | 'Hoodie' | 'Tote Bag' | 'Coffee Mug' | 'Tumbler';

export type Material = 'Cotton' | 'Polyester (Sublimation)';

export type Side = 'Front' | 'Back' | 'Left' | 'Right';

export interface ProductConfig {
  id: string;
  type: ProductType;
  color: string;
  size: string;
  material: Material;
  sides: Side[];
  basePrice: number;
}

export interface DesignElement {
  id: string;
  type: 'text' | 'image';
  content: string; // Text string or image data URL
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikethrough?: boolean;
  shadow?: boolean;
  is3d?: boolean;
  arcValue?: number; // 0 (straight) to 100 (full circle)
  shape?: 'none' | 'star' | 'oval' | 'round' | 'square' | 'diamond' | 'tree';
}

export interface CartItem {
  id: string;
  config: ProductConfig;
  designs: Record<Side, DesignElement[]>;
  totalPrice: number;
}

export interface AppState {
  cart: CartItem[];
  currentProduct: ProductConfig | null;
  history: any[];
  historyIndex: number;
}
