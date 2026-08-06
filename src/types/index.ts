export type Money = {
  amount: number; // in paise / minor units
  currency: 'INR' | 'USD';
};

export type ProductSpecs = {
  thread: string;
  metal: string;
  charm: string;
  weight: string;
  dimensions: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  liveryNumber: number;
  editionSize: number;
  editionNumber: number;
  price: number; // rupees
  currency: 'INR';
  description: {
    short: string;
    long: string;
  };
  images: string[];
  category: 'f1' | 'muscle' | 'sports' | 'adventure' | 'limited' | 'bond' | 'first-edit' | 'sport' | 'cafe' | 'classic' | 'street' | 'tour';
  originalPrice?: number;
  isSoldOut?: boolean;
  tags: string[];
  specs: ProductSpecs;
  inventory: number;
  isActive: boolean;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  liveryNumber: number;
  price: number;
  currency: 'INR';
  image: string;
  qty: number;
};

export type Address = {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  token: string;
};

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  liveryNumber: number;
  qty: number;
  price: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  shippingAddress: Address;
  totals: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  placedAt: string;
};

export type Review = {
  id: string;
  productId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  author: string;
  createdAt: string;
};
