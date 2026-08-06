import type { Product, Order, OrderItem, Address } from '@/types';
import { PRODUCTS } from './fixtures/products';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches the product list. Uses the local fixture by default; if
 * NEXT_PUBLIC_API_URL is set, calls the real backend.
 */
export async function fetchProducts(): Promise<Product[]> {
  if (!API_URL) return PRODUCTS;

  try {
    const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
    if (!res.ok) return PRODUCTS;
    const json = await res.json();
    return (json?.data ?? PRODUCTS) as Product[];
  } catch {
    return PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (!API_URL) {
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
  try {
    const res = await fetch(`${API_URL}/products/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? null) as Product | null;
  } catch {
    return PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function createOrder(input: {
  items: OrderItem[];
  shippingAddress: Address;
  totals: Order['totals'];
}): Promise<{ orderId: string } | null> {
  if (!API_URL) {
    // Mock: synthesize a local order id
    return { orderId: `local-${Date.now()}` };
  }
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch {
    return null;
  }
}
