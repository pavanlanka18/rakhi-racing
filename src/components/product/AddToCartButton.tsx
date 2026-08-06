'use client';

import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/types';

type Props = {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export function AddToCartButton({ product, size = 'md', fullWidth }: Props) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    add(product, 1);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1100);
  };

  if (size === 'sm') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Add ${product.name} to cart`}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border border-circuit-700 hover:border-mauli-500 hover:text-mauli-500 text-ivory/80 font-mono uppercase tracking-[0.18em] text-[10px] transition focus-ring"
      >
        {justAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        {justAdded ? 'Added' : 'Add'}
      </button>
    );
  }

  return (
    <Button
      type="button"
      variant="primary"
      size={size}
      onClick={handleClick}
      className={fullWidth ? 'w-full' : ''}
    >
      {justAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      {justAdded ? 'Added to cart' : 'Add to cart'}
    </Button>
  );
}
