'use client';

import { useCartContext } from '@/context/CartContext';

// Thin re-export so components import from "@/hooks/useCart" rather than reaching into context
export function useCart() {
  return useCartContext();
}
