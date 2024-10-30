import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import type { MenuItem } from '@/features/landing/types';

interface AppMenuProps {
  menuItems: MenuItem[];
}

const AppMenu = ({ menuItems }: AppMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Open main menu</span>
          <HamburgerMenuIcon aria-hidden="true" className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.name}>{item.name}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppMenu;
