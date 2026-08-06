'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import type { CartItem, Product } from '@/types';

type State = {
  items: CartItem[];
  isOpen: boolean;
  hydrated: boolean;
};

type Action =
  | { type: 'HYDRATE'; items: CartItem[] }
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE'; productId: string; qty: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' };

const STORAGE_KEY = 'rakhi:cart';

const initial: State = {
  items: [],
  isOpen: false,
  hydrated: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, items: action.items, hydrated: true };
    case 'ADD': {
      const existing = state.items.find(
        (i) => i.productId === action.item.productId,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === action.item.productId
              ? { ...i, qty: i.qty + action.item.qty }
              : i,
          ),
        };
      }
      return { ...state, items: [...state.items, action.item] };
    }
    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((i) => i.productId !== action.productId),
      };
    case 'UPDATE':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.productId
              ? { ...i, qty: Math.max(1, action.qty) }
              : i,
          ),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'OPEN':
      return { ...state, isOpen: true };
    case 'CLOSE':
      return { ...state, isOpen: false };
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  update: (productId: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initial);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const items: CartItem[] = raw ? JSON.parse(raw) : [];
      dispatch({ type: 'HYDRATE', items });
    } catch {
      dispatch({ type: 'HYDRATE', items: [] });
    }
  }, []);

  // persist on change (skip until hydrated to avoid wiping real state)
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* noop */
    }
  }, [state.items, state.hydrated]);

  const add = useCallback((product: Product, qty = 1) => {
    dispatch({
      type: 'ADD',
      item: {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        liveryNumber: product.liveryNumber,
        price: product.price,
        currency: product.currency,
        image: product.images[0] ?? '',
        qty,
      },
    });
    dispatch({ type: 'OPEN' });
  }, []);

  const remove = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE', productId });
  }, []);

  const update = useCallback((productId: string, qty: number) => {
    dispatch({ type: 'UPDATE', productId, qty });
  }, []);

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const value = useMemo<CartContextValue>(() => {
    const count = state.items.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = state.items.reduce(
      (acc, i) => acc + i.price * i.qty,
      0,
    );
    return {
      items: state.items,
      count,
      subtotal,
      isOpen: state.isOpen,
      hydrated: state.hydrated,
      add,
      remove,
      update,
      clear,
      open: () => dispatch({ type: 'OPEN' }),
      close: () => dispatch({ type: 'CLOSE' }),
      toggle: () => dispatch({ type: 'TOGGLE' }),
    };
  }, [state, add, remove, update, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
}
