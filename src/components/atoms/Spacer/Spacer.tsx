import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

type SpacerProps = HTMLAttributes<HTMLDivElement> & { debug?: boolean } & (
    | { width?: never; height?: number }
    | { width?: number; height?: never }
  );

export const Spacer = ({ width, height, debug = false, ...props }: SpacerProps) => (
  <div
    className={cn(debug && 'bg-red-500')}
    style={{ width: width ? `${width}rem` : 'auto', height: height ? `${height}rem` : 'auto' }}
    {...props}
  />
);
