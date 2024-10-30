import { PropsWithChildren } from 'react';

import AppBar from '@/features/landing/components/AppBar';
import { menuItems } from './utils';

type LandingLayoutProps = PropsWithChildren;

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="mx-auto flex max-w-7xl flex-col space-y-16 p-6 pb-8 md:px-8">
        <AppBar menuItems={menuItems} />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
};

export default LandingLayout;
