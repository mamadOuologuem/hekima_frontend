import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const SaamaLandingLayoutIndex: FC<PropsWithChildren> = ({ children }) => (
  <LandingLayout.Root className="overflow-hidden">{children}</LandingLayout.Root>
);

export default SaamaLandingLayoutIndex;
