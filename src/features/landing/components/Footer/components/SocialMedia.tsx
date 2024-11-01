import { cn } from '@/lib/utils';
import LogoFacebook from './LogoFacebook';
import LogoLinkedIn from './LogoLinkedIn';
import LogoTwitter from './LogoTwitter';

interface SocialMediaProps {
  className?: string;
}

const SocialMedia = ({ className }: SocialMediaProps) => {
  return (
    <div className={cn('flex gap-x-7', className)}>
      <a href="https://www.linkedin.com" target="_blank">
        <LogoLinkedIn />
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
