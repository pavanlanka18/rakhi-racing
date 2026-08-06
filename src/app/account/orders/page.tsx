'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { formatINR } from '@/lib/utils';
import type { Order } from '@/types';

export default function OrdersPage() {
  const search = useSearchParams();
  const justPlaced = search.get('placed') === '1';
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('rakhi:orders');
      setOrders(raw ? JSON.parse(raw) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  if (orders === null) return null;

  return (
    <section className="border-b border-circuit-700">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="eyebrow mb-3">Orders</p>
        <h1 className="h-display text-4xl md:text-5xl text-ivory">Your line-up</h1>

        {justPlaced && (
          <div className="mt-6 placard px-4 py-3 text-[11px] text-mauli-500 placard-glow">
            Order placed. The atelier will reach out to confirm shipping.
          </div>
        )}

        {orders.length === 0 ? (
          <div className="mt-12 border border-circuit-700 rounded-sm px-6 py-16 text-center bg-circuit-800">
            <p className="font-display text-2xl uppercase tracking-tight text-ivory/80">
              No orders yet.
            </p>
            <p className="mt-2 text-sm text-ivory/55 font-body">
              When you place an order, it will show up here.
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
          <ul className="mt-10 space-y-4">
            {orders.map((o) => (
              <li
                key={o.id}
                className="border border-circuit-700 rounded-sm bg-circuit-800 p-5"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50">
                      Order
                    </p>
                    <p className="font-mono text-sm text-chrome-200">{o.id}</p>
                  </div>
                  <div className="placard px-2.5 py-1 leading-none text-chrome-200">
                    {o.status}
                  </div>
                </div>
                <ul className="mt-4 divide-y divide-circuit-700">
                  {o.items.map((it) => (
                    <li
                      key={it.productId}
                      className="py-2 flex items-center justify-between text-sm"
                    >
                      <span className="text-ivory/85">
                        {it.name} <span className="text-ivory/50">× {it.qty}</span>
                      </span>
                      <span className="font-mono text-ivory/85 tabular-nums">
                        {formatINR(it.price * it.qty)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-circuit-700 flex items-center justify-between">
                  <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50">
                    Total
                  </span>
                  <span className="font-mono text-base text-ivory tabular-nums">
                    {formatINR(o.totals.total)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
