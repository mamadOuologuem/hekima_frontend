'use client';

import Logo from '@/components/atoms/Logo';
import AppMenu from '@/features/landing/components/AppMenu';
import type { MenuItem } from '@/features/landing/types';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppBarProps {
  menuItems: MenuItem[];
}

const AppBar = ({ menuItems }: AppBarProps) => {
  const pathname = usePathname();
  const t = useTranslations('common');

  return (
    <header>
      <nav aria-label="Global" className="flex items-center justify-between">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">{t('app_name')}</span>
          <Logo />
        </Link>

        <div className="flex md:hidden">
          <AppMenu menuItems={menuItems} />
        </div>

        <div className="hidden items-center md:flex md:gap-x-12">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm/6 text-gray-900 hover:font-semibold',
                item.href === pathname && 'font-bold underline'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
