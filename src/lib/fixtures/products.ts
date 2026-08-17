import type { Product } from '@/types';

// Helper: use Google's lh3 CDN for direct image access (no redirect/CORS issues)
function gdriveImg(fileId: string): string {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

// ——— Fantasy Cars — ₹499 each (8 items) —————————————————————————————————————————————
// Folder: https://drive.google.com/drive/folders/17x2w1Q_KCu4RpQ9QY5I-HPmoSBMwT9UH

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
      charm: 'As shown in product photo',
      weight: 'Varies by design',
      dimensions: 'Standard rakhi size',
    },
    inventory: 1,
    isActive: true,
  };
});

// â”€â”€â”€ F1 Cars â€” ₹699 each (6 items) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Folder: https://drive.google.com/drive/folders/1BdmovDbFetk_CnWDTeda3jLY5YeyyW5p

const F1_FILE_IDS = [
  '1w2BRhgHMHnB29tp3cEPVbzX53m56C0tX',
  '12lJVu644JUK7bcNJlTHU_Pa-Ys7AFvvC',
  '1JdqnyI5sV9QcZ_lPkmTnX571kRKcGEPb',
  '1iIZQ95FH5X1P1L-qLKhODh9NdIQ_rnrN',
  '1rz0yT66RVMoLma21nNlhm0cotlqu2NPk',
  '1l0xSnTZSKa0GVM58Xr47IUul2b7hL_lv',
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

