import type { Product } from '@/types';

<<<<<<< HEAD
// Helper: use Google's lh3 CDN for direct image access (no redirect/CORS issues)
function gdriveImg(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

// ——— Fantasy Cars — ₹499 each (8 items) —————————————————————————————————————————————
// Folder: https://drive.google.com/drive/folders/17x2w1Q_KCu4RpQ9QY5I-HPmoSBMwT9UH
=======
const DRIVE_CLASSIC_NUMBERS = [3, 24, 9, 49, 17, 48, 35, 45, 31, 18, 46, 16, 37, 47, 14, 7, 4, 38, 30, 19, 33, 26, 15, 21];

const FIRST_EDIT_PRODUCTS: Product[] = DRIVE_CLASSIC_NUMBERS.map((number, index) => {
  const padded = String(number).padStart(2, '0');
>>>>>>> 0560a76f3edc980ac58582a77fd42d962e909ed4

const FANTASY_FILE_IDS = [
  '1EA4B_Y0OShX4LdwVMinG4w5J_Sf_cfNw',
  '14bBDhoZDDd7P2Oz8Yb950Py5hC6sP98e',
  '1rgUsWbDY-bK3PQimY0d7RZoxyVU_M1H-',
  '1vX1GYmyFchR1e-VXrwRgvo9EfKWt0agD',
  '17gQU-b-tMGNvooJRqiK_At_nCBWsasDL',
  '1OLGaLQTLXBtNgPlnISM2MsmFWypMfelL',
  '1Upksvw8YELDis6olhhkXIssvR2WE1hiG',
  '1Ol4ymOJ5B4tWlRgXVwQCQSm9UkeZVRok',
];

const FANTASY_PRODUCTS: Product[] = FANTASY_FILE_IDS.map((fileId, index) => {
  const num = index + 1;
  const padded = String(num).padStart(2, '0');
  return {
<<<<<<< HEAD
    id: `p_fantasy_${padded}`,
    slug: `fantasy-rakhi-${padded}`,
    name: `Hot Wheels Fantasy Rakhi ${padded}`,
    liveryNumber: 200 + num,
    editionSize: 50,
    editionNumber: num,
    price: 499,
    currency: 'INR',
    description: {
      short: 'Hot Wheels fantasy die-cast rakhi â€” a vibrant collector\'s piece for Raksha Bandhan.',
      long: 'A striking Hot Wheels fantasy die-cast paired with a beautifully hand-tied festive rakhi thread. Each piece is a unique collector\'s item, ready for gifting this Raksha Bandhan.',
    },
    images: [gdriveImg(fileId)],
    category: 'fantasy',
    tags: ['hot-wheels', 'fantasy', 'rakhi', 'collector'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Hot Wheels die-cast car',
=======
    id: `p_first_edit_${padded}`,
    slug: `first-edit-rakhi-${padded}`,
    name: `Classic Car Rakhi ${String(index + 1).padStart(2, '0')}`,
    liveryNumber: 100 + number,
    editionSize: 50,
    editionNumber: index + 1,
    price: 499,
    originalPrice: 649,
    currency: 'INR',
    description: {
      short: 'Classic car rakhi from the Drive photo collection.',
      long: 'A classic car rakhi from the shared Drive photo collection, ready for Raksha Bandhan gifting. Each item uses the exact product photo shown in the collection.',
    },
    images: [`/images/products/1st-edit/rakhi-edit-${padded}.png`],
    category: 'muscle',
    tags: ['classic', 'hot-wheels', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Classic die-cast car',
>>>>>>> 0560a76f3edc980ac58582a77fd42d962e909ed4
      charm: 'As shown in product photo',
      weight: 'Varies by design',
      dimensions: 'Standard rakhi size',
    },
    inventory: 1,
    isActive: true,
  };
});

<<<<<<< HEAD
// â”€â”€â”€ F1 Cars â€” ₹699 each (6 items) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Folder: https://drive.google.com/drive/folders/1BdmovDbFetk_CnWDTeda3jLY5YeyyW5p

const F1_FILE_IDS = [
  '1w2BRhgHMHnB29tp3cEPVbzX53m56C0tX',
  '12lJVu644JUK7bcNJlTHU_Pa-Ys7AFvvC',
  '1JdqnyI5sV9QcZ_lPkmTnX571kRKcGEPb',
  '1iIZQ95FH5X1P1L-qLKhODh9NdIQ_rnrN',
  '1rz0yT66RVMoLma21nNlhm0cotlqu2NPk',
  '1l0xSnTZSKa0GVM58Xr47IUul2b7hL_lv',
=======
export const PRODUCTS: Product[] = [
  {
    id: 'p_f1_001',
    slug: 'oracle-red-bull-racing-f1-rakhi',
    name: 'Oracle Red Bull Racing Formula 1 Car Rakhi',
    liveryNumber: 1,
    editionSize: 500,
    editionNumber: 1,
    price: 699,
    originalPrice: 899,
    currency: 'INR',
    description: {
      short: 'Celebrate Formula 1 with the iconic Oracle Red Bull Racing livery.',
      long: 'Oracle Red Bull Racing Formula 1 car in signature navy and red livery. Comes with a beautifully handcrafted rakhi tied around the front wheel hub — a symbol of protection and love for the racing enthusiast in your life.',
    },
    images: ['/images/products/red-bull-f1.jpg'],
    category: 'f1',
    tags: ['f1', 'red-bull', 'oracle', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula 1 die-cast car, navy-red livery',
      charm: 'As shown in product photo',
      weight: '42 g',
      dimensions: '68 × 26 × 38 mm',
    },
    inventory: 1,
    isActive: true,
  },
  {
    id: 'p_f1_002',
    slug: 'mercedes-amg-petronas-f1-rakhi',
    name: 'Mercedes-AMG Petronas Formula 1 Car Rakhi',
    liveryNumber: 2,
    editionSize: 500,
    editionNumber: 2,
    price: 699,
    originalPrice: 899,
    currency: 'INR',
    description: {
      short: 'Premium Mercedes-AMG Petronas Formula 1 car rakhi.',
      long: 'The Mercedes-AMG Petronas F1 die-cast in iconic silver and teal livery. The rakhi is hand-tied around the front wheel hub — a stunning Raksha Bandhan gift for the Formula 1 fan in your family.',
    },
    images: ['/images/products/mercedes-amg-f1.jpg'],
    category: 'f1',
    tags: ['f1', 'mercedes', 'amg', 'petronas', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula 1 die-cast car, silver-teal livery',
      charm: 'As shown in product photo',
      weight: '42 g',
      dimensions: '68 × 26 × 38 mm',
    },
    inventory: 1,
    isActive: true,
  },
  {
    id: 'p_f1_003',
    slug: 'bwt-alpine-f1-rakhi',
    name: 'BWT Alpine Formula 1 Car Rakhi',
    liveryNumber: 3,
    editionSize: 500,
    editionNumber: 3,
    price: 699,
    originalPrice: 899,
    currency: 'INR',
    description: {
      short: 'Premium BWT Alpine Formula 1 car rakhi.',
      long: 'Stand-out pink and blue BWT Alpine F1 livery with the most vibrant rakhi in the collection. Hand-tied around the front hub for a truly special Raksha Bandhan gift.',
    },
    images: ['/images/products/alpine-f1.jpg'],
    category: 'f1',
    tags: ['f1', 'alpine', 'bwt', 'pink', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula 1 die-cast car, pink-blue livery',
      charm: 'As shown in product photo',
      weight: '40 g',
      dimensions: '66 × 25 × 37 mm',
    },
    inventory: 1,
    isActive: true,
  },
  {
    id: 'p_f1_004',
    slug: 'maserati-formula-e-race-car-rakhi',
    name: 'Maserati Formula E Race Car Rakhi',
    liveryNumber: 4,
    editionSize: 500,
    editionNumber: 4,
    price: 699,
    originalPrice: 899,
    currency: 'INR',
    description: {
      short: 'Handcrafted racing-inspired Maserati Formula E rakhi.',
      long: 'The Maserati Formula E race car in sleek electric livery, paired with a beautiful handcrafted rakhi. A unique and premium Raksha Bandhan gift for the racing fan who loves cutting-edge motorsport.',
    },
    images: ['/images/products/maserati-formula-e.jpg'],
    category: 'f1',
    tags: ['f1', 'maserati', 'formula-e', 'electric', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula E die-cast car, Maserati livery',
      charm: 'As shown in product photo',
      weight: '40 g',
      dimensions: '66 × 25 × 37 mm',
    },
    inventory: 1,
    isActive: true,
  },
  {
    id: 'p_f1_005',
    slug: 'haas-f1-rakhi',
    name: 'Haas Formula 1 Car Rakhi',
    liveryNumber: 5,
    editionSize: 500,
    editionNumber: 5,
    price: 699,
    originalPrice: 899,
    currency: 'INR',
    description: {
      short: 'Premium handcrafted Haas Formula 1 car rakhi.',
      long: 'The Haas F1 Team die-cast in white and red livery. Paired with a handcrafted rakhi for the boldest fan in your circle. A standout Raksha Bandhan gift that ships in a premium gift box.',
    },
    images: ['/images/products/haas-f1.jpg'],
    category: 'f1',
    tags: ['f1', 'haas', 'white', 'red', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula 1 die-cast car, white-red livery',
      charm: 'As shown in product photo',
      weight: '40 g',
      dimensions: '66 × 25 × 37 mm',
    },
    inventory: 1,
    isActive: true,
  },
  {
    id: 'p_f1_006',
    slug: 'formula-e-electric-race-car-rakhi',
    name: 'Formula E Electric Race Car Rakhi',
    liveryNumber: 6,
    editionSize: 500,
    editionNumber: 6,
    price: 699,
    originalPrice: 899,
    currency: 'INR',
    description: {
      short: 'Handcrafted racing-inspired Formula E electric car rakhi.',
      long: 'A sleek Formula E electric race car die-cast with a beautiful handcrafted rakhi tied around the front wheel hub. Perfect for the motorsport enthusiast who loves the future of racing.',
    },
    images: ['/images/products/formula-e.jpg'],
    category: 'f1',
    tags: ['f1', 'formula-e', 'electric', 'rakhi'],
    specs: {
      thread: 'Hand-tied festive thread',
      metal: 'Formula E die-cast car, electric livery',
      charm: 'As shown in product photo',
      weight: '40 g',
      dimensions: '66 × 25 × 37 mm',
    },
    inventory: 1,
    isActive: true,
  },
  ...FIRST_EDIT_PRODUCTS,
>>>>>>> 0560a76f3edc980ac58582a77fd42d962e909ed4
];

const F1_NAMES = [
  'Oracle Red Bull Racing F1 Rakhi',
  'Mercedes-AMG Petronas F1 Rakhi',
  'BWT Alpine F1 Rakhi',
  'Scuderia Ferrari F1 Rakhi',
  'McLaren F1 Rakhi',
  'Aston Martin F1 Rakhi',
];

const F1_PRODUCTS: Product[] = F1_FILE_IDS.map((fileId, index) => {
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
      short: 'Premium Formula 1 die-cast rakhi â€” the ultimate motorsport Raksha Bandhan gift.',
      long: 'A premium Formula 1 die-cast car with a beautiful hand-tied rakhi thread around the front wheel hub. The perfect Raksha Bandhan gift for the F1 fan in your family.',
    },
    images: [gdriveImg(fileId)],
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

// â”€â”€â”€ Premium Cars â€” ₹699 each (12 items) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Folder: https://drive.google.com/drive/folders/1cKm5HcmfuVJ4hm7TxYRWM5XPcOrE_Q0A

const PREMIUM_FILE_IDS = [
  '1Q9AanicisamkJO-i5LGySLTM8qtcpDh2',
  '1EvBCYpl9BGrD47lQk4S95NIgczvJhKn2',
  '19x1wAwOTLqJfpssnfEyEXhU8f-ClcOeF',
  '1lBYf1ybWVYJAsTYDAK7sgV40-zHvMMdI',
  '1ZQnlKbTTRmRWDP9FbYgkNrcgDdFE2enO',
  '1ujXt3c8szZQHZiC2F6oa5GOcoZGnoNlp',
  '12LEYkGIf6ML7nsrR49kknkYhRhPNhGL5',
  '1eBQ94BcsfJJ21WEySijDGrfd6_VWgSGf',
  '1mzVbebRum11hENE_97bIhoDlBNEIVBz_',
  '1bF76eiae2is58n_d142p8kDUKkDrFf0E',
  '1W14zsiBrsmbU_4Bt6jyVap7euGWEuGs6',
  '1GQ4ypdoILTTgNPBLvBiCTq6qagq5Ezcy',
];

const PREMIUM_PRODUCTS: Product[] = PREMIUM_FILE_IDS.map((fileId, index) => {
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
      short: 'Premium die-cast rakhi â€” a luxury Raksha Bandhan gift for the car enthusiast.',
      long: 'A premium-tier die-cast car with an elegantly hand-tied rakhi. Crafted for the collector who appreciates fine detail and quality. A truly special Raksha Bandhan gift.',
    },
    images: [gdriveImg(fileId)],
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

// â”€â”€â”€ Sports Cars â€” ₹599 each (28 items) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Folder: https://drive.google.com/drive/folders/1Cjxu70zByFKvEbk_d2Gj3SCfgsCeCJ8f

const SPORTS_FILE_IDS = [
  '1F8p063V2u4S7IJhBoAyRnNn1NMVPcq7w',
  '1SfPQ1AnCpr3LNWrByicUK_4UP5_fpM7d',
  '1yYZOk9IFpZWW_Uqd4xC6ulu5i1IQ_Y8e',
  '1RWd6eG7XrsXXpOw3bSnz8SRIvvUppiE2',
  '1XksYFtZd-J1V2UDtNUi46MDLGRQjb4ou',
  '1eViw1KwTHatQn1o8uI-E-ddAlrMyGyjc',
  '1pxbsezqt4AcEsLhfzbqvLRyxqOtPDiXz',
  '1FRyAer-8BT4_FnOU2ecIpaIgW9srm06j',
  '1XV2HK0-5HxLVSOQNbkgUtv1AKcSiCnKk',
  '13DpTJJZzR3SeJ0rPA8bzw6LelzXFJjec',
  '1yCFxesr49eHvotzeL2wUMvyqzvAHmQUI',
  '1jXFmjpOvckuMVyxtETtA9R3L2MNKsvex',
  '17ns5CCHagVSSvz66FtdGt2ruZ3Cxb8DK',
  '13ksxETZNCd3MP6HBgDfpnGpCq1-V6MZD',
  '1F6a7wKrLEMRsLFqnKsD6nF3HXH5irWS3',
  '1AUT3sJIX8fOaHO-Y_BmMAFvhVEayMshu',
  '1za6VwVl2k9bYCz1kNWVETIdYhsiE8v_P',
  '1VENb8NzEc90Dniz6xaJ-oqiciK3YTEbB',
  '14M62twdWgciA1YAY89yTtAayBTnIyCRO',
  '1T6NXnxfVMd0AQJVaBLDDnFxM3qz6Irui',
  '1psg0KkaXrkH0DGkvo7IT2N8664feikt6',
  '1ZgA7amMvLMTCPrZrzBhSdQbzFkzFKUoy',
  '1Oe1FQ_bUTtPS-CB3W5sXX19vp4fEQy6-',
  '1fXT81TG6-wOFYH3eRaqGuUWSr0L0IP7F',
  '1ql4jgECjbifuadPz2eNjPN7rBDRj-wBo',
  '1LA43g1NP5Y7lBxhLPBJnRtKsm-X1rQJQ',
  '1f5F9Q9taaIrDmz-uYr7ONky3CzjuevNX',
  '1hvmm2Vg8Ykjq252tfFCgbExT3-o2A4Th',
];

const SPORTS_PRODUCTS: Product[] = SPORTS_FILE_IDS.map((fileId, index) => {
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
      short: 'Sports & classic die-cast rakhi â€” the perfect Raksha Bandhan gift for car lovers.',
      long: 'A stylish sports or classic car die-cast with a hand-tied rakhi thread around the front wheel hub. Crafted with care â€” the ideal Raksha Bandhan gift for the speed enthusiast in your life.',
    },
    images: [gdriveImg(fileId)],
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

// â”€â”€â”€ Export â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const PRODUCTS: Product[] = [
  ...FANTASY_PRODUCTS,
  ...F1_PRODUCTS,
  ...PREMIUM_PRODUCTS,
  ...SPORTS_PRODUCTS,
];

