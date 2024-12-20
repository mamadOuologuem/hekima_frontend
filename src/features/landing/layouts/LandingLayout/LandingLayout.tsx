import { PropsWithChildren, ReactNode } from 'react';

import AppBar from '@/features/landing/components/AppBar';
import { menuItems } from './utils';
import { cn } from '@/lib/utils';

interface LandingLayoutProps {
  className?: string;
  children: ReactNode;
}

const LandingLayoutRoot = ({ className, children }: LandingLayoutProps) => {
  return (
    <div className={cn('grid min-h-screen w-full', className)}>
      <div className="flex flex-col pb-0 pt-16">
        <LandingLayoutContainer className="mt-0">
          <AppBar menuItems={menuItems} />
        </LandingLayoutContainer>
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
};

const LandingLayoutContainer = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-8 mt-20', className)}>{children}</div>;
};

export const LandingLayout = {
  Root: LandingLayoutRoot,
  Container: LandingLayoutContainer
};
