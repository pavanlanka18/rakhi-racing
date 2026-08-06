import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'section' | 'article';
};

export function Container({
  as: Tag = 'div',
  className,
  ...rest
}: Props) {
  return <Tag className={cn('max-w-7xl mx-auto px-6', className)} {...rest} />;
}
