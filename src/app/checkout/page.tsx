'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatINR } from '@/lib/utils';
import { ShoppingBag, MessageCircle, Mail, ArrowLeft, Package, Truck } from 'lucide-react';

const WA_NUMBER = '918008578757';

function buildCartWhatsAppUrl(
  items: { name: string; qty: number; price: number }[],
  total: number
): string {
  const lines = items
    .map((it) => `  • ${it.name} (x${it.qty}) — ₹${it.price * it.qty}`)
    .join('\n');
  const msg = encodeURIComponent(
    `Hi! I'd like to order the following Rakhi Wheels:\n\n${lines}\n\n💰 *Total: ₹${total}*\n\nCould you please confirm availability and share payment details? Thank you!`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export default function CheckoutPage() {
  const { items, subtotal, remove } = useCart();

  const total = useMemo(() => subtotal, [subtotal]);

  const whatsappUrl = useMemo(
    () =>
      buildCartWhatsAppUrl(
        items.map((it) => ({ name: it.name, qty: it.qty, price: it.price })),
        total
      ),
    [items, total]
  );

  const emailBody = useMemo(() => {
    const lines = items
      .map((it) => `  • ${it.name} (x${it.qty}) — ₹${it.price * it.qty}`)
      .join('\n');
    return encodeURIComponent(
      `Hi,\n\nI'd like to order:\n\n${lines}\n\nTotal: ₹${total}\n\nPlease confirm availability and payment details.\n\nThank you!`
    );
  }, [items, total]);

  /* ── Empty cart ──────────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-circuit-900 flex items-center justify-center">
        <div className="max-w-md mx-auto px-6 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-circuit-800 border border-circuit-700 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-ivory/30" />
          </div>
          <h1 className="font-display text-3xl uppercase tracking-tight text-ivory mb-3">
            Your garage is empty
          </h1>
          <p className="text-ivory/60 font-body mb-8">
            Add a rakhi from the shop first, then come back here to order.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-mauli-500 hover:bg-mauli-400 text-circuit-900 font-mono text-sm uppercase tracking-widest transition-all font-bold"
          >
            Browse Collection
          </Link>
        </div>
      </section>
    );
  }

  /* ── Order summary ───────────────────────────────────────── */
  return (
    <section className="min-h-screen bg-circuit-900">
      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Back link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ivory/50 hover:text-ivory transition mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop
        </Link>

        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mauli-400 mb-2">
            Order Summary
          </p>
          <h1 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-ivory">
            Your Rakhi Cart
          </h1>
          <p className="mt-2 text-ivory/60 font-body">
            Review your items below, then chat with our seller on WhatsApp to confirm and pay.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* ── Cart items ─────────────────────────────────────── */}
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-4 p-4 rounded-2xl bg-circuit-800/60 border border-circuit-700 hover:border-circuit-600 transition group"
              >
                {/* Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-circuit-900 border border-circuit-700">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl opacity-30">🏎️</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm uppercase tracking-tight text-ivory truncate">
                    {item.name}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ivory/40 mt-0.5">
                    Livery {String(item.liveryNumber).padStart(3, '0')} · Qty {item.qty}
                  </p>
                </div>

                {/* Price + remove */}
                <div className="flex flex-col items-end gap-2">
                  <span className="font-display text-lg text-ivory font-bold tabular-nums">
                    {formatINR(item.price * item.qty)}
                  </span>
                  <button
                    onClick={() => remove(item.productId)}
                    className="text-[9px] font-mono uppercase tracking-widest text-ivory/30 hover:text-red-400 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Sticky sidebar ─────────────────────────────────── */}
          <aside className="h-fit lg:sticky lg:top-24 space-y-4">

            {/* Total card */}
            <div className="p-5 rounded-2xl bg-circuit-800 border border-circuit-700">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/50 mb-4">
                Price Summary
              </p>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between text-ivory/70">
                  <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                  <span className="tabular-nums">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ivory/70">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="border-t border-circuit-700 pt-3 flex justify-between">
                  <span className="text-ivory font-bold uppercase tracking-widest text-xs">Total</span>
                  <span className="text-ivory font-bold text-xl tabular-nums">{formatINR(total)}</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              id="checkout-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-green-600 hover:bg-green-500 active:scale-[0.98] text-white font-mono text-sm uppercase tracking-widest transition-all duration-200 shadow-lg shadow-green-900/50 hover:shadow-green-600/40 font-bold"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Order via WhatsApp
            </a>

            {/* Email fallback */}
            <a
              id="checkout-email-btn"
              href={`mailto:Rakhiwheels@gmail.com?subject=${encodeURIComponent('Rakhi Order Enquiry')}&body=${emailBody}`}
              className="flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl bg-circuit-800 hover:bg-circuit-700 border border-circuit-700 hover:border-mauli-500/50 text-ivory/80 hover:text-mauli-400 font-mono text-sm uppercase tracking-widest transition-all duration-200"
            >
              <Mail className="w-4 h-4" />
              Email Instead
            </a>

            {/* How it works */}
            <div className="p-4 rounded-2xl bg-green-500/8 border border-green-500/20 space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-green-400 font-bold">
                  How to Order
                </span>
              </div>
              {[
                { step: '01', text: 'Click "Order via WhatsApp" above' },
                { step: '02', text: 'A message with your cart is pre-filled' },
                { step: '03', text: 'Our seller confirms &amp; shares UPI details' },
                { step: '04', text: 'Pay &amp; your rakhi ships in 2–3 days' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="font-display text-xs text-green-500/60 flex-shrink-0 w-5">{step}</span>
                  <p
                    className="font-mono text-[11px] text-ivory/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: text }}
                  />
                </div>
              ))}
            </div>

            {/* Shipping info */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-circuit-800/50 border border-circuit-700">
              <Package className="w-4 h-4 text-mauli-400 flex-shrink-0" />
              <p className="font-mono text-[11px] text-ivory/55 leading-relaxed">
                Free shipping across India. Delivered in a premium gift box with an atelier card.
              </p>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-circuit-800/50 border border-circuit-700">
              <Truck className="w-4 h-4 text-mauli-400 flex-shrink-0" />
              <p className="font-mono text-[11px] text-ivory/55 leading-relaxed">
                Ships within 2–3 days of payment confirmation. Tracking number shared via WhatsApp.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
