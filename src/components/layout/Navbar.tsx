'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { cn } from '@/lib/utils';

const links = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop?cat=f1', label: 'F1 Edition' },
  { href: '/shop?cat=limited', label: 'Limited' },
  { href: '/shop?cat=bond', label: 'Bond' },
];

export function Navbar() {
  const { count, open: openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-circuit-700 bg-circuit-900/85 backdrop-blur supports-[backdrop-filter]:bg-circuit-900/70">
        <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo — livery placard style */}
          <Link href="/" className="flex items-center gap-3 group focus-ring rounded-sm">
            <div className="placard px-2.5 py-1.5 leading-none text-chrome-200 group-hover:border-mauli-500 group-hover:text-mauli-500 transition-colors">
              047
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg uppercase tracking-[0.2em] text-ivory">
                Rakhi
              </span>
              <span className="font-display text-lg uppercase tracking-[0.2em] text-mauli-500 -mt-0.5">
                Racing
              </span>
            </div>
          </Link>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="nav-link focus-ring rounded-sm">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Search"
              className="hidden sm:inline-flex p-2 text-ivory/70 hover:text-ivory transition focus-ring rounded-sm"
            >
              <Search className="w-4 h-4" />
            </button>
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
