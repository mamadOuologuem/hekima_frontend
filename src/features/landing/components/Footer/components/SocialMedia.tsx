import { cn } from '@/lib/utils';
import LogoFacebook from './LogoFacebook';
import LogoTwitter from './LogoTwitter';
import { LogoWhatsApp } from '@/components/atoms/logos';

interface SocialMediaProps {
  className?: string;
}

const SocialMedia = ({ className }: SocialMediaProps) => {
  return (
    <div className={cn('flex gap-x-7', className)}>
      <a href="https://wa.me/14245249123" target="_blank">
        <LogoWhatsApp className="w-[30px]" />
      </a>
      <a href="https://www.facebook.com" target="_blank">
        <LogoFacebook />
      </a>
      <a href="https://www.twitter.com" target="_blank">
        <LogoTwitter />
      </a>
    </div>
  );
};

export default SocialMedia;
