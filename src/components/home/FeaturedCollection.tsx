import Link from 'next/link';
import { PRODUCTS } from '@/lib/fixtures/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight } from 'lucide-react';

export function FeaturedCollection() {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <section className="relative border-b border-circuit-700">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="eyebrow mb-3">Featured Collection</p>
            <h2 className="h-display text-4xl md:text-5xl text-ivory">
              The current line-up.
            </h2>
            <p className="mt-3 text-ivory/65 max-w-xl font-body">
              Three liveries, hand-finished, numbered 1–500. Each ships in a
              chrome-edged display case.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-2 nav-link focus-ring rounded-sm"
          >
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
