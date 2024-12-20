import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { ManThoughtsIllustrationLong } from '@/components/atoms/illustrations';
import ChatHero from '../../components/ChatHero';

export const ChatLandingPage = () => {
  return (
    <LandingLayout.Container className="mt-0 min-h-[calc(100lvh-103px)]">
      <div className="relative flex h-full items-center justify-center gap-20 overflow-y-clip md:flex-row">
        <ManThoughtsIllustrationLong
          primaryColor="#811C00"
          secondaryColor="#23292E"
          className="absolute -bottom-40 -right-40 h-full -scale-x-100"
        />
        <div className="max-w-lg">
          <ChatHero />
        </div>
        <ManThoughtsIllustrationLong className="absolute -bottom-40 -left-40 h-full" />
      </div>
    </LandingLayout.Container>
  );
};
