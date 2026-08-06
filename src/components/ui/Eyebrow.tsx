import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  as?: 'span' | 'p' | 'div';
};

export function Eyebrow({ as: Tag = 'span', className, ...rest }: Props) {
  return <Tag className={cn('eyebrow', className)} {...rest} />;
}
