import type { Product } from '@/types';

// ——— Fantasy Cars — ₹499 each (8 items) —————————————————————————————————————————————
// Images: public/images/products/fantasy/

const FANTASY_PRODUCTS: Product[] = Array.from({ length: 8 }, (_, index) => {
  const num = index + 1;
  const padded = String(num).padStart(2, '0');
  return {
    id: `p_fantasy_${padded}`,
    slug: `fantasy-rakhi-${padded}`,
    name: `Hot Wheels Fantasy Rakhi ${padded}`,
    liveryNumber: 200 + num,
    editionSize: 50,
    editionNumber: num,
    price: 499,
    currency: 'INR',
    description: {
      short: "Hot Wheels fantasy die-cast rakhi – a vibrant collector's piece for Raksha Bandhan.",
      long: "A striking Hot Wheels fantasy die-cast paired with a beautifully hand-tied festive rakhi thread. Each piece is a unique collector's item, ready for gifting this Raksha Bandhan.",
    },
    images: [`/images/products/fantasy/fantasy-${padded}.png`],
    category: 'fantasy',
    tags: ['hot-wheels', 'fantasy', 'rakhi', 'collector'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Hot Wheels die-cast car',
      charm: 'As shown in product photo',
      weight: 'Varies by design',
      dimensions: 'Standard rakhi size',
    },
    inventory: 1,
    isActive: true,
  };
});

// ——— F1 Cars — ₹699 each (6 items) ——————————————————————————————————————————————————————
// Images: public/images/products/f1/

const F1_NAMES = [
  'Oracle Red Bull Racing F1 Rakhi',
  'Mercedes-AMG Petronas F1 Rakhi',
  'BWT Alpine F1 Rakhi',
  'Scuderia Ferrari F1 Rakhi',
  'McLaren F1 Rakhi',
  'Aston Martin F1 Rakhi',
];

const F1_PRODUCTS: Product[] = Array.from({ length: 6 }, (_, index) => {
  const num = index + 1;
  const padded = String(num).padStart(2, '0');
  return {
    id: `p_f1_${padded}`,
    slug: `f1-rakhi-${padded}`,
    name: F1_NAMES[index] ?? `Formula 1 Car Rakhi ${padded}`,
    liveryNumber: num,
    editionSize: 25,
    editionNumber: num,
    price: 699,
    currency: 'INR',
    description: {
      short: 'Premium Formula 1 die-cast rakhi – the ultimate motorsport Raksha Bandhan gift.',
      long: 'A premium Formula 1 die-cast car with a beautiful hand-tied rakhi thread around the front wheel hub. The perfect Raksha Bandhan gift for the F1 fan in your family.',
    },
    images: [`/images/products/f1/f1-${padded}.png`],
    category: 'f1',
    tags: ['formula-1', 'f1', 'premium', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula 1 die-cast car',
      charm: 'As shown in product photo',
      weight: 'Varies by design',
      dimensions: 'Standard rakhi size',
    },
    inventory: 1,
    isActive: true,
  };
});

// ——— Premium Cars — ₹699 each (12 items) —————————————————————————————————————————————
// Images: public/images/products/premium/

const PREMIUM_PRODUCTS: Product[] = Array.from({ length: 12 }, (_, index) => {
  const num = index + 1;
  const padded = String(num).padStart(2, '0');
  return {
    id: `p_premium_${padded}`,
    slug: `premium-rakhi-${padded}`,
    name: `Premium Die-Cast Rakhi ${padded}`,
    liveryNumber: 300 + num,
    editionSize: 30,
    editionNumber: num,
    price: 699,
    currency: 'INR',
    description: {
      short: 'Premium die-cast rakhi – a luxury Raksha Bandhan gift for the car enthusiast.',
      long: 'A premium-tier die-cast car with an elegantly hand-tied rakhi. Crafted for the collector who appreciates fine detail and quality. A truly special Raksha Bandhan gift.',
    },
    images: [`/images/products/premium/premium-${padded}.png`],
    category: 'premium',
    tags: ['premium', 'die-cast', 'luxury', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Premium die-cast car',
      charm: 'As shown in product photo',
      weight: 'Varies by design',
      dimensions: 'Standard rakhi size',
    },
    inventory: 1,
    isActive: true,
  };
});

// ——— Sports Cars — ₹599 each (28 items) ——————————————————————————————————————————————
// Images: public/images/products/sports/

const SPORTS_PRODUCTS: Product[] = Array.from({ length: 28 }, (_, index) => {
  const num = index + 1;
  const padded = String(num).padStart(2, '0');
  return {
    id: `p_sports_${padded}`,
    slug: `sports-rakhi-${padded}`,
    name: `Sports Car Rakhi ${padded}`,
    liveryNumber: 400 + num,
    editionSize: 50,
    editionNumber: num,
    price: 599,
    currency: 'INR',
    description: {
      short: 'Sports & classic die-cast rakhi – the perfect Raksha Bandhan gift for car lovers.',
      long: 'A stylish sports or classic car die-cast with a hand-tied rakhi thread around the front wheel hub. Crafted with care – the ideal Raksha Bandhan gift for the speed enthusiast in your life.',
    },
    images: [`/images/products/sports/sports-${padded}.png`],
    category: 'sports',
    tags: ['sports', 'classic', 'die-cast', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Sports die-cast car',
      charm: 'As shown in product photo',
      weight: 'Varies by design',
      dimensions: 'Standard rakhi size',
    },
    inventory: 1,
    isActive: true,
  };
});

// ——— Export ——————————————————————————————————————————————————————————————————————————————
export const PRODUCTS: Product[] = [
  ...FANTASY_PRODUCTS,
  ...F1_PRODUCTS,
  ...PREMIUM_PRODUCTS,
  ...SPORTS_PRODUCTS,
];
