import { PropsWithChildren } from 'react';

import AppBar from '@/features/landing/components/AppBar';
import { menuItems } from './utils';
import { cn } from '@/lib/utils';

type LandingLayoutProps = PropsWithChildren;

const LandingLayoutRoot = ({ children }: LandingLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full">
      <div className="flex flex-col space-y-20 pb-0 pt-16">
        <LandingLayoutContainer>
          <AppBar menuItems={menuItems} />
        </LandingLayoutContainer>
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
};

const LandingLayoutContainer = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-8', className)}>{children}</div>;
};

export const LandingLayout = {
  Root: LandingLayoutRoot,
  Container: LandingLayoutContainer
};
