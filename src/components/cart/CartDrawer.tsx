'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useEffect } from 'react';
import { useCart } from '@/hooks/useCart';
import { CartItem } from './CartItem';
import { formatINR } from '@/lib/utils';

export function CartDrawer() {
  const { items, count, subtotal, isOpen, close } = useCart();

  // ESC + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-ink/70 z-50"
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-circuit-900 border-l border-circuit-700 z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-circuit-700">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-mauli-500" />
                <span className="font-display text-lg uppercase tracking-[0.2em] text-ivory">
                  Your garage
                </span>
                <span className="placard px-1.5 py-0.5 text-[10px] text-chrome-200">
                  {String(count).padStart(2, '0')}
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="p-2 text-ivory/80 hover:text-ivory focus-ring rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-display text-2xl uppercase tracking-tight text-ivory/80">
                    Your garage is empty.
                  </p>
                  <p className="mt-2 text-sm text-ivory/55 font-body">
                    Tie one to a wrist. Pick a livery to get started.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/shop"
                      onClick={close}
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

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-circuit-700 px-6 py-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono uppercase tracking-[0.18em] text-xs text-ivory/60">
                    Subtotal
                  </span>
                  <span className="font-mono text-lg text-ivory tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-ivory/45 font-mono uppercase tracking-[0.18em]">
                  Shipping & taxes calculated at checkout
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/cart"
                    onClick={close}
                    className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring border border-chrome-400 text-ivory hover:border-mauli-500 hover:text-mauli-500"
                  >
                    View cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={close}
                    className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring bg-mauli-500 text-ink hover:bg-mauli-400 shadow-mauli-glow"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
