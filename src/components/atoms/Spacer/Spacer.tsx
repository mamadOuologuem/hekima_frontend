import { HTMLAttributes } from 'react';

type SpacerProps = HTMLAttributes<HTMLDivElement> &
  ({ width?: never; height?: number } | { width?: number; height?: never });

export const Spacer = ({ width, height, ...props }: SpacerProps) => (
  <div style={{ width: width ? `${width}rem` : 'auto', height: height ? `${height}rem` : 'auto' }} {...props} />
);
