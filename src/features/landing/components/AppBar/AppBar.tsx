import Logo from '@/components/atoms/Logo';
import { Button } from '@/components/ui/button';
import AppMenu from '@/features/landing/components/AppMenu';
import type { MenuItem } from '@/features/landing/types';
import Link from 'next/link';

interface AppBarProps {
  menuItems: MenuItem[];
}

const AppBar = ({ menuItems }: AppBarProps) => {
  return (
    <header className="bg-white">
      <nav aria-label="Global" className="flex items-center justify-between">
        <Link href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Hekima</span>
          <Logo />
        </Link>

        <div className="flex md:hidden">
          <AppMenu menuItems={menuItems} />
        </div>

        <div className="hidden items-center md:flex md:gap-x-12">
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm/6 text-gray-900">
              {item.name}
            </Link>
          ))}

          <Button variant="outline">Request a quote</Button>
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
