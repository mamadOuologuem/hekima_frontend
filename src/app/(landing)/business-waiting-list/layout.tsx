import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const BusinessWaitingListLandingLayoutIndex: FC<PropsWithChildren> = ({ children }) => (
  <LandingLayout.Root className="bg-primary text-white" appBarClassName="text-white">
    {children}
  </LandingLayout.Root>
);

export default BusinessWaitingListLandingLayoutIndex;
