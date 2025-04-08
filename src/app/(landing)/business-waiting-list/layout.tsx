import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const BusinessWaitingListLandingLayoutIndex: FC<PropsWithChildren> = ({ children }) => (
  <LandingLayout.Root className="bg-primary-dark text-background" appBarClassName="text-background">
    {children}
  </LandingLayout.Root>
);

export default BusinessWaitingListLandingLayoutIndex;
