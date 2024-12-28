import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const WaitingListLandingLayoutIndex: FC<PropsWithChildren> = ({ children }) => (
  <LandingLayout.Root className="overflow-hidden bg-[#FCFAF5]">{children}</LandingLayout.Root>
);

export default WaitingListLandingLayoutIndex;
