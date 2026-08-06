'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { formatINR } from '@/lib/utils';
import { z } from 'zod';
import type { Order } from '@/types';

const addressSchema = z.object({
  fullName: z.string().min(2, 'Required'),
  line1: z.string().min(2, 'Required'),
  line2: z.string().optional(),
  city: z.string().min(2, 'Required'),
  state: z.string().min(2, 'Required'),
  postalCode: z.string().min(4, 'Required'),
  country: z.string().min(2, 'Required'),
  phone: z.string().min(8, 'Required'),
});

type FormState = z.infer<typeof addressSchema>;

const EMPTY: FormState = {
  fullName: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
  phone: '',
};

const SHIPPING = 0;
const TAX_RATE = 0.05;

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + SHIPPING + tax;

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = addressSchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((i) => {
        next[i.path[0] as keyof FormState] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Capture the order locally — the real call would be `createOrder(...)`.
    const order: Order = {
      id: `local-${Date.now()}`,
      items: items.map((it) => ({
        productId: it.productId,
        slug: it.slug,
        name: it.name,
        liveryNumber: it.liveryNumber,
        qty: it.qty,
        price: it.price,
      })),
      shippingAddress: parsed.data,
      totals: { subtotal, shipping: SHIPPING, tax, total },
      status: 'pending',
      placedAt: new Date().toISOString(),
    };
    try {
      const raw = localStorage.getItem('rakhi:orders');
      const existing: Order[] = raw ? JSON.parse(raw) : [];
      localStorage.setItem('rakhi:orders', JSON.stringify([order, ...existing]));
      localStorage.setItem('rakhi:lastOrder', JSON.stringify(order));
    } catch {
      /* noop */
    }
    clear();
    setSubmitting(false);
    router.push('/account/orders?placed=1');
  };

  if (items.length === 0) {
    return (
      <section className="border-b border-circuit-700">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="eyebrow mb-3">Checkout</p>
          <h1 className="h-display text-4xl md:text-5xl text-ivory">
            Your garage is empty.
          </h1>
          <p className="mt-3 text-ivory/65 font-body">
            Add a livery first, then head back here.
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
      </section>
    );
  }

  return (
    <section className="border-b border-circuit-700">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <form onSubmit={onSubmit} noValidate>
          <p className="eyebrow mb-3">Checkout</p>
          <h1 className="h-display text-4xl md:text-5xl text-ivory">Shipping</h1>

          {!user && (
            <p className="mt-3 text-sm text-ivory/65 font-body">
              Already have an account?{' '}
              <Link href="/account/login" className="text-mauli-500 hover:underline">
                Sign in
              </Link>
              . (Checkout works either way.)
            </p>
          )}

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full name" error={errors.fullName}>
              <Input value={form.fullName} onChange={update('fullName')} autoComplete="name" />
            </Field>
            <Field label="Phone" error={errors.phone}>
              <Input value={form.phone} onChange={update('phone')} autoComplete="tel" />
            </Field>
            <Field label="Address line 1" error={errors.line1} className="sm:col-span-2">
              <Input value={form.line1} onChange={update('line1')} autoComplete="address-line1" />
            </Field>
            <Field label="Address line 2 (optional)" error={errors.line2} className="sm:col-span-2">
              <Input value={form.line2} onChange={update('line2')} autoComplete="address-line2" />
            </Field>
            <Field label="City" error={errors.city}>
              <Input value={form.city} onChange={update('city')} autoComplete="address-level2" />
            </Field>
            <Field label="State / Region" error={errors.state}>
              <Input value={form.state} onChange={update('state')} autoComplete="address-level1" />
            </Field>
            <Field label="Postal code" error={errors.postalCode}>
              <Input value={form.postalCode} onChange={update('postalCode')} autoComplete="postal-code" />
            </Field>
            <Field label="Country" error={errors.country}>
              <Input value={form.country} onChange={update('country')} autoComplete="country-name" />
            </Field>
          </div>

          <p className="eyebrow mt-10 mb-3">Payment</p>
          <div className="border border-circuit-700 rounded-sm px-4 py-3 text-sm text-ivory/70 font-body">
            Payment is integrated in the next release. For now, placing the order
            reserves your livery and our atelier will reach out to confirm.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-sm px-7 py-3.5 transition focus-ring bg-mauli-500 text-ink hover:bg-mauli-400 shadow-mauli-glow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Placing order…' : 'Place order'}
          </button>
        </form>

        {/* Order summary */}
        <aside className="border border-circuit-700 rounded-sm bg-circuit-800 p-6 h-fit lg:sticky lg:top-[88px]">
          <p className="eyebrow mb-3">Order Summary</p>
          <ul className="divide-y divide-circuit-700">
            {items.map((it) => (
              <li key={it.productId} className="py-3 flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="text-ivory truncate">{it.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/50 mt-0.5">
                    Qty {it.qty} · Livery {it.liveryNumber.toString().padStart(3, '0')}
                  </p>
                </div>
                <span className="font-mono text-ivory tabular-nums">
                  {formatINR(it.price * it.qty)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-2 text-sm font-mono">
            <Row label="Subtotal" value={formatINR(subtotal)} />
            <Row label="Shipping" value={formatINR(SHIPPING)} />
            <Row label="Tax (5%)" value={formatINR(tax)} />
            <div className="border-t border-circuit-700 pt-3 flex items-center justify-between">
              <span className="text-ivory uppercase tracking-[0.18em] text-xs">Total</span>
              <span className="text-ivory text-lg tabular-nums">{formatINR(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
      {error && (
        <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.18em] text-vermillion-500">
          {error}
        </p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-ivory/80">
      <span className="uppercase tracking-[0.18em] text-[10px]">{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}
