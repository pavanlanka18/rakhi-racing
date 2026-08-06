'use client';

import { Minus, Plus, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatINR, padLivery } from '@/lib/utils';
import type { CartItem as CartItemType } from '@/types';

type Props = {
  item: CartItemType;
};

export function CartItem({ item }: Props) {
  const { update, remove } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-circuit-700 last:border-0">
      {/* Thumbnail */}
      <div className="shrink-0 w-20 h-20 border border-circuit-700 rounded-sm bg-gradient-to-br from-circuit-700 to-circuit-900 flex items-center justify-center relative">
        <div className="absolute inset-0 circuit-grid opacity-30 rounded-sm" />
        <span className="placard px-1.5 py-0.5 text-[8px] text-chrome-200 z-10">
          {padLivery(item.liveryNumber)}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-sm uppercase tracking-tight text-ivory truncate">
              {item.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/50 mt-0.5">
              Livery {item.liveryNumber.toString().padStart(3, '0')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => remove(item.productId)}
            aria-label="Remove from cart"
            className="p-1 text-ivory/50 hover:text-vermillion-500 transition focus-ring rounded-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="inline-flex items-center border border-circuit-700 rounded-sm">
            <button
              type="button"
              onClick={() => update(item.productId, item.qty - 1)}
              aria-label="Decrease quantity"
              className="p-1.5 text-ivory/70 hover:text-ivory hover:bg-circuit-700 transition focus-ring rounded-sm"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-3 font-mono text-xs tabular-nums text-ivory min-w-[2ch] text-center">
              {item.qty}
            </span>
            <button
              type="button"
              onClick={() => update(item.productId, item.qty + 1)}
              aria-label="Increase quantity"
              className="p-1.5 text-ivory/70 hover:text-ivory hover:bg-circuit-700 transition focus-ring rounded-sm"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="font-mono text-sm text-ivory tabular-nums">
            {formatINR(item.price * item.qty)}
          </span>
        </div>
      </div>
    </div>
  );
}
