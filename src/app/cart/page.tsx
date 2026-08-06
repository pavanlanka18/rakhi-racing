'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import { formatINR } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { items, subtotal } = useCart();

  return (
    <section className="border-b border-circuit-700">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 nav-link mb-6 focus-ring rounded-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to shop
        </Link>

        <p className="eyebrow mb-3">Your Garage</p>
        <h1 className="h-display text-4xl md:text-5xl text-ivory">
          Cart ({items.length})
        </h1>

        <div className="mt-10 border border-circuit-700 rounded-sm bg-circuit-800 px-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-2xl uppercase tracking-tight text-ivory/80">
                Nothing in the garage yet.
              </p>
              <p className="mt-2 text-sm text-ivory/55 font-body">
                Pick a livery to get started.
              </p>
              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring border border-chrome-400 text-ivory hover:border-mauli-500 hover:text-mauli-500"
                >
                  Browse liveries
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {items.map((it) => (
                <CartItem key={it.productId} item={it} />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50">
                Subtotal
              </p>
              <p className="font-mono text-3xl text-ivory mt-1 tabular-nums">
                {formatINR(subtotal)}
              </p>
            </div>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-sm px-7 py-3.5 transition focus-ring bg-mauli-500 text-ink hover:bg-mauli-400 shadow-mauli-glow"
            >
              Proceed to checkout
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
