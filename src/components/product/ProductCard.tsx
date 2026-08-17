'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types';
import { AddToCartButton } from './AddToCartButton';
import { formatINR, padLivery } from '@/lib/utils';

type Props = {
  product: Product;
};

const CATEGORY_LABELS: Record<string, string> = {
  fantasy: 'Fantasy',
  f1: 'F1',
  premium: 'Premium',
  sports: 'Sports',
  muscle: 'Muscle Car',
  adventure: 'Adventure',
  limited: 'Limited',
  bond: 'Bond Rakhi',
  'first-edit': '1st Edit',
  sport: 'Sport',
  cafe: 'Café',
  classic: 'Classic',
  street: 'Street',
  tour: 'Tour',
};

const CATEGORY_COLORS: Record<string, string> = {
  fantasy: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
  f1:      'bg-red-600/20 text-red-300 border-red-500/30',
  premium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  sports:  'bg-cyan-600/20 text-cyan-300 border-cyan-500/30',
  muscle:  'bg-vermillion-500/20 text-vermillion-400 border-vermillion-500/30',
  adventure: 'bg-green-600/20 text-green-300 border-green-500/30',
  limited: 'bg-mauli-500/20 text-mauli-400 border-mauli-500/30',
  bond:    'bg-purple-600/20 text-purple-300 border-purple-500/30',
  'first-edit': 'bg-mauli-500/20 text-mauli-400 border-mauli-500/30',
};

export function ProductCard({ product }: Props) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const catColor =
    CATEGORY_COLORS[product.category] ??
    'bg-chrome-600/20 text-chrome-200 border-chrome-400/30';

  return (
    <article className="group relative border border-circuit-700 bg-circuit-800 hover:border-mauli-500/60 transition-all duration-300 rounded-xl overflow-hidden shadow-lg hover:-translate-y-1" style={{boxShadow: undefined}}>
      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-circuit-900 focus-ring rounded-t-xl"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-circuit-900/60 via-transparent to-transparent" />

        {/* Sold out overlay */}
        {product.isSoldOut && (
          <div className="absolute inset-0 bg-circuit-900/60 flex items-center justify-center">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-ivory/70 border border-ivory/30 px-3 py-1.5 rounded-full">
              Sold Out
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && !product.isSoldOut && (
          <div className="absolute top-3 left-3 bg-vermillion-500 text-white text-[10px] font-mono font-bold px-2 py-1 rounded-full tracking-wide">
            −{discount}%
          </div>
        )}

        {/* Livery number */}
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-ivory/60 tracking-[0.18em]">
          №{padLivery(product.liveryNumber)}
        </div>

        {/* Category badge */}
        <div className={`absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border ${catColor}`}>
          {CATEGORY_LABELS[product.category] ?? product.category}
        </div>
      </Link>

      {/* Meta */}
      <div className="p-5">
        <Link href={`/shop/${product.slug}`} className="block focus-ring rounded-sm">
          <h3 className="font-display text-base uppercase tracking-tight text-ivory group-hover:text-mauli-400 transition-colors duration-200 line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 text-xs text-ivory/55 line-clamp-2 font-body leading-relaxed">
          {product.description.short}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono uppercase tracking-widest text-ivory/40 border border-circuit-600 px-1.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-mono text-base text-ivory font-semibold tracking-wide">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="font-mono text-[11px] text-ivory/40 line-through">
                  {formatINR(product.originalPrice)}
                </span>
                <span className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-mauli-400">
                  Save {formatINR(product.originalPrice - product.price)} ({discount}% OFF)
                </span>
              </>
            )}
          </div>
          {!product.isSoldOut && <AddToCartButton product={product} size="sm" />}
        </div>
      </div>
    </article>
  );
}
