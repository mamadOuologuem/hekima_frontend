import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { ManThoughtsIllustrationLong } from '@/components/atoms/illustrations';
import { WaitingListHero } from '@/features/landing/components/WaitingListHero';
import { APPLICATION_COOKIES } from '@/lib/storage';
import { cookies } from 'next/headers';
import { getListDetails } from '@/lib/marketing';

export const WaitingListLandingPage = async () => {
  const cookieStore = await cookies();
  const currentUserWaitingListPositionCookie = cookieStore.get(
    APPLICATION_COOKIES.HEKIMA_USER_POSITION_IN_WAITING_LIST
  );
  const currentUserWaitingListPosition = currentUserWaitingListPositionCookie?.value
    ? parseInt(currentUserWaitingListPositionCookie?.value)
    : undefined;

  const { subscriberCount } = await getListDetails('WAITING_LIST');

  return (
    <LandingLayout.Container className="mt-0 min-h-[calc(100lvh-103px)]">
      <div className="relative z-10 flex h-full items-center justify-center gap-20 overflow-y-clip md:flex-row">
        <ManThoughtsIllustrationLong
          primaryColor="#59809E"
          secondaryColor="#23292E"
          className="absolute -bottom-40 -right-72 -z-10 h-full -scale-x-100 opacity-5 md:-right-60 md:opacity-100 lg:-right-40"
        />
        <div className="max-w-lg px-12 md:px-20">
          <WaitingListHero
            currentUserWaitingListPosition={currentUserWaitingListPosition}
            totalWaitingListSubscribers={subscriberCount}
          />
        </div>
        <ManThoughtsIllustrationLong
          secondaryColor="#59809E"
          primaryColor="#23292E"
          className="absolute -bottom-40 -left-72 -z-10 h-full opacity-5 md:-left-60 md:opacity-100 lg:-left-40 "
        />
      </div>
    </LandingLayout.Container>
  );
};
