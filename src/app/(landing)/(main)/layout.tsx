import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const LandingLayoutIndex: FC<PropsWithChildren> = ({ children }) => <LandingLayout.Root>{children}</LandingLayout.Root>;

export default LandingLayoutIndex;
