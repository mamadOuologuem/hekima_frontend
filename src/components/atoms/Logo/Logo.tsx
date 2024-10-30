import { DoubleArrowUpIcon } from '@radix-ui/react-icons';

const Logo = () => {
  return (
    <div className="flex space-x-1 items-center">
      <DoubleArrowUpIcon width={25} height={25} className="stroke-black stroke-10" />
      <p className="text-2xl font-bold">Hekima</p>
    </div>
  );
};

export default Logo;
