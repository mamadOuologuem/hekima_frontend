'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { MenuItem } from '@/features/landing/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface AppMenuProps {
  menuItems: MenuItem[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <HamburgerMenuIcon aria-hidden="true" className="size-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.name}>
              <Link key={item.name} href={item.href} className={cn(item.href === pathname && 'font-bold underline')}>
                {item.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppMenu;
