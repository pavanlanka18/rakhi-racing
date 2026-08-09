'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function Footer() {
  return (
    <footer className="border-t border-circuit-700 bg-circuit-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
            <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden ring-1 ring-circuit-600">
              <Image
                src="/images/brand/logo.png"
                alt="Rakhi Wheels logo"
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base uppercase tracking-[0.22em] text-ivory">
                Rakhi
              </span>
              <span className="font-display text-base uppercase tracking-[0.22em] text-mauli-500 -mt-0.5">
                Wheels
              </span>
            </div>
          </Link>
          <p className="text-ivory/60 text-sm max-w-xs">
            Premium Hot Wheels die-cast rakhis, handcrafted with love.
            Hand-finished in India.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50 mb-4">
            Shop
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="text-ivory/80 hover:text-mauli-500">All Products</Link></li>
            <li><Link href="/shop?cat=f1" className="text-ivory/80 hover:text-mauli-500">F1 Cars</Link></li>
            <li><Link href="/shop?cat=classic" className="text-ivory/80 hover:text-mauli-500">Classic Cars</Link></li>
            <li><Link href="/shop?cat=bond" className="text-ivory/80 hover:text-mauli-500">Bond Rakhi</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50 mb-4">
            Help
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/account" className="text-ivory/80 hover:text-mauli-500">Account</Link></li>
            <li><Link href="/account/orders" className="text-ivory/80 hover:text-mauli-500">Orders</Link></li>
            <li><Link href="/cart" className="text-ivory/80 hover:text-mauli-500">Cart</Link></li>
            <li><a href="#" className="text-ivory/80 hover:text-mauli-500">Shipping & returns</a></li>
            <li><a href="#" className="text-ivory/80 hover:text-mauli-500">Care guide</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50 mb-4">
            Dispatch
          </h4>
          <p className="text-ivory/60 text-sm mb-4">
            Get a heads-up when a new livery drops. No spam, just the line sheet.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2"
          >
            <Input
              type="email"
              required
              placeholder="you@garage.in"
              aria-label="Email address"
              className="flex-1"
            />
            <Button type="submit" variant="primary" size="md">
              Join
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-circuit-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/50 font-mono uppercase tracking-[0.18em]">
          <span>© {new Date().getFullYear()} Rakhi Wheels</span>
          <div className="flex items-center gap-3">
            <span className="placard px-2 py-1 leading-none text-chrome-200">
              047 / 500
            </span>
            <span>· Made in Pune, IN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
