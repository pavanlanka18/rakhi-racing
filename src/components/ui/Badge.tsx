import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'chrome' | 'mauli' | 'vermillion';
};

const tones = {
  chrome:
    'border-chrome-400 text-chrome-200 from-[rgba(216,220,224,0.08)] to-[rgba(216,220,224,0.02)]',
  mauli:
    'border-mauli-500 text-mauli-400 from-[rgba(212,162,74,0.10)] to-[rgba(212,162,74,0.02)]',
  vermillion:
    'border-vermillion-500 text-vermillion-400 from-[rgba(200,52,31,0.10)] to-[rgba(200,52,31,0.02)]',
};

export function Badge({ tone = 'chrome', className, ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-mono uppercase tracking-[0.18em] text-[10px] px-2.5 py-1 rounded-sm border bg-gradient-to-b',
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}
