export type ShadeCategory = 'reds' | 'nudes' | 'pinks' | 'bolds';
export type ShadeFinish = 'velvet-matte' | 'satin-cream' | 'lacquer-gloss';
export type Undertone = 'warm' | 'cool' | 'neutral';

export interface LipstickShade {
  id: string;
  name: string;
  frenchName: string;
  number: string;
  hex: string;
  category: ShadeCategory;
  defaultFinish: ShadeFinish;
  undertone: Undertone;
  description: string;
  mood: string;
  quote: string;
  price: number;
  bestseller?: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string;
  shade: LipstickShade;
  finish: ShadeFinish;
  engraving?: string;
  quantity: number;
}
