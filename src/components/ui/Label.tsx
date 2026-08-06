import { cn } from '@/lib/utils';
import { LabelHTMLAttributes } from 'react';

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...rest }: Props) {
  return (
    <label
      className={cn(
        'block font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/70 mb-1.5',
        className,
      )}
      {...rest}
    />
  );
}
