'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

const links = [
  { href: '/shop',             label: 'Shop' },
  { href: '/shop?cat=f1',      label: 'F1 Cars' },
  { href: '/shop?cat=classic', label: 'Classic' },
  { href: '/shop?cat=bond',    label: 'Bond' },
];

export function Navbar() {
  const { count, open: openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-circuit-700 bg-circuit-900/90 backdrop-blur supports-[backdrop-filter]:bg-circuit-900/75">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">

          {/* ── Logo ───────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group focus-ring rounded-lg">
            {/* Logo image */}
            <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden ring-1 ring-circuit-600 group-hover:ring-mauli-500 transition-all duration-200">
              <Image
                src="/images/brand/logo.png"
                alt="Rakhi Wheels logo"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            {/* Brand name */}
            <div className="flex flex-col leading-none">
              <span className="font-display text-base uppercase tracking-[0.22em] text-ivory group-hover:text-ivory transition-colors">
                Rakhi
              </span>
              <span className="font-display text-base uppercase tracking-[0.22em] text-mauli-500 -mt-0.5 group-hover:text-mauli-400 transition-colors">
                Wheels
              </span>
            </div>
          </Link>

          {/* ── Center nav ─────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link focus-ring rounded-sm">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* ── Right cluster ──────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            <Link
              href="/account"
              aria-label="Account"
              className="hidden sm:inline-flex p-2 text-ivory/70 hover:text-ivory transition focus-ring rounded-sm"
            >
              <User className="w-4 h-4" />
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Open cart"
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border transition focus-ring',
                count > 0
                  ? 'border-mauli-500 text-mauli-500'
                  : 'border-circuit-700 text-ivory/70 hover:text-ivory',
              )}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-mono text-xs tabular-nums">
                {String(count).padStart(2, '0')}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden p-2 text-ivory/80 hover:text-ivory focus-ring rounded-sm"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}

