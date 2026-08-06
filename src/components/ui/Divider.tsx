import { cn } from '@/lib/utils';

type Props = {
  label?: string;
  className?: string;
};

export function Divider({ label, className }: Props) {
  if (!label) {
    return <div className={cn('h-px w-full bg-circuit-700', className)} />;
  }
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="h-px flex-1 bg-circuit-700" />
      <span className="font-mono uppercase tracking-[0.22em] text-[10px] text-ivory/50">
        {label}
      </span>
      <div className="h-px flex-1 bg-circuit-700" />
    </div>
  );
}
