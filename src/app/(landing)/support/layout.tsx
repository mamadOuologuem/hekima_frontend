import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const SupportPageLayoutIndex: FC<PropsWithChildren> = ({ children }) => (
  <LandingLayout.Root className="bg-primary" appBarClassName="text-white">
    {children}
  </LandingLayout.Root>
);

export default SupportPageLayoutIndex;
