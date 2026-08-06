'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { formatINR } from '@/lib/utils';

export default function AccountPage() {
  const { user, hydrated, logout } = useAuth();
  const { count, subtotal } = useCart();

  if (!hydrated) return null;

  if (!user) {
    return (
      <section className="border-b border-circuit-700">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="eyebrow mb-3">Account</p>
          <h1 className="h-display text-4xl md:text-5xl text-ivory">
            Sign in to continue.
          </h1>
          <p className="mt-3 text-ivory/65 font-body">
            Track your liveries, view past orders, and get line-sheet drops.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/account/login"
              className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring bg-mauli-500 text-ink hover:bg-mauli-400"
            >
              Sign in
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring border border-chrome-400 text-ivory hover:border-mauli-500 hover:text-mauli-500"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-circuit-700">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="eyebrow mb-3">Account</p>
        <h1 className="h-display text-4xl md:text-5xl text-ivory">
          Welcome, {user.name}.
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card label="Email" value={user.email} />
          <Card label="Role" value={user.role} />
          <Card label="Garage" value={`${count} piece${count === 1 ? '' : 's'}`} hint={formatINR(subtotal)} />
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring border border-chrome-400 text-ivory hover:border-mauli-500 hover:text-mauli-500"
          >
            View orders
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] text-xs px-5 py-2.5 transition focus-ring border border-circuit-700 text-ivory/70 hover:text-vermillion-500 hover:border-vermillion-500"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="placard px-4 py-3">
      <div className="text-[9px] text-ivory/50 tracking-[0.22em]">{label}</div>
      <div className="text-sm text-chrome-200 mt-1 truncate">{value}</div>
      {hint && <div className="text-[10px] text-ivory/40 mt-0.5">{hint}</div>}
    </div>
  );
}
