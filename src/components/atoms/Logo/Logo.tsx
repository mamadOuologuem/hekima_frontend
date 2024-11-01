import { DoubleArrowUpIcon } from '@radix-ui/react-icons';

const Logo = () => {
  return (
    <div className="flex items-center space-x-1">
      <DoubleArrowUpIcon width={25} height={25} className="stroke-inherit stroke-2" />
      <p className="text-2xl font-bold">Hekima</p>
    </div>
  );
};

export default Logo;
