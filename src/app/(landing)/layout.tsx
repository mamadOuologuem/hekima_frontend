import LandingLayout from '@/features/landing/layouts/LandingLayout';
import { FC, PropsWithChildren } from 'react';

const LandingLayoutIndex: FC<PropsWithChildren> = ({ children }) => <LandingLayout>{children}</LandingLayout>;

export default LandingLayoutIndex;
