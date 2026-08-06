'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

type Props = {
  product: Product;
};

export function ProductGallery({ product }: Props) {
  const [active, setActive] = useState(0);
  const images = product.images.length > 0 ? product.images : ['', '', ''];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-3">
      {/* Thumbnails */}
      <div className="order-2 md:order-1 flex md:flex-col gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              'relative aspect-square w-full md:w-20 border rounded-sm overflow-hidden transition focus-ring',
              active === i
                ? 'border-mauli-500'
                : 'border-circuit-700 hover:border-chrome-400',
            )}
          >
            <GalleryPlaceholder category={product.category} active={active === i} />
            <span className="absolute bottom-1 right-1 placard px-1.5 py-0.5 text-[8px] text-chrome-200">
              {String(i + 1).padStart(2, '0')}
            </span>
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="order-1 md:order-2 relative aspect-[4/3] border border-circuit-700 rounded-sm overflow-hidden bg-gradient-to-br from-circuit-700 to-circuit-900">
        <div className="absolute inset-0 circuit-grid opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3/4 h-2/3">
            <GalleryPlaceholder category={product.category} large />
          </div>
        </div>
        <div className="absolute top-4 left-4 placard px-2.5 py-1 leading-none text-chrome-200">
          {String(product.liveryNumber).padStart(3, '0')} / {String(product.editionSize).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}

function GalleryPlaceholder({
  category,
  large,
}: {
  category: Product['category'];
  large?: boolean;
  active?: boolean;
}) {
  const accent = category === 'sport' ? '#D4A24A' : category === 'street' ? '#5C636A' : '#D4A24A';
  return (
    <svg
      viewBox="0 0 200 100"
      className={cn('w-full h-full', large && 'opacity-95')}
    >
      <g
        fill="none"
        stroke={accent}
        strokeWidth={large ? 2 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="50" cy="80" r="14" />
        <circle cx="150" cy="80" r="14" />
        <circle cx="50" cy="80" r="5" fill={accent} />
        <circle cx="150" cy="80" r="5" fill={accent} />
        <path d="M 50 80 L 80 50 L 120 50 L 150 80" />
        <path d="M 80 50 L 100 30 L 130 30" />
        <path d="M 130 30 L 145 25" />
        <path d="M 95 60 L 110 60" stroke={accent} strokeWidth={large ? 2.5 : 1.8} />
        <circle cx="150" cy="80" r="8" stroke="#C8341F" strokeDasharray="2 1" />
      </g>
    </svg>
  );
}
