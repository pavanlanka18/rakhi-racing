import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-mono uppercase tracking-[0.18em] transition focus-ring disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary:
    'bg-mauli-500 text-ink hover:bg-mauli-400 shadow-mauli-glow',
  ghost: 'text-ivory/80 hover:text-ivory',
  outline:
    'border border-chrome-400 text-ivory hover:border-mauli-500 hover:text-mauli-500',
};

const sizes: Record<Size, string> = {
  sm: 'text-[10px] px-3 py-1.5',
  md: 'text-xs px-5 py-2.5',
  lg: 'text-sm px-7 py-3.5',
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'primary', size = 'md', className, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    />
  );
});
