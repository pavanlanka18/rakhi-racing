import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'w-full bg-circuit-900 border border-circuit-700 text-ivory placeholder:text-ivory/40',
        'px-4 py-2.5 text-sm font-body rounded-sm',
        'focus:outline-none focus:border-mauli-500 focus:ring-1 focus:ring-mauli-500/40',
        'transition',
        className,
      )}
      {...rest}
    />
  );
});
