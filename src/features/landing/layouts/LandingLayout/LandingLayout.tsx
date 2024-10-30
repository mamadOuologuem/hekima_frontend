import { PropsWithChildren } from 'react';

import AppBar from '@/features/landing/components/AppBar';
import { menuItems } from './utils';

type LandingLayoutProps = PropsWithChildren;

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col">
        <AppBar menuItems={menuItems} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default LandingLayout;
