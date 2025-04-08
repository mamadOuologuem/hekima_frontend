import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { BusinessWaitingListHero } from '@/features/landing/components/BusinessWaitingListHero';
import { BusinessWaitingListForm } from '@/features/landing/components/BusinessWaitingListForm';
import { APPLICATION_COOKIES } from '@/lib/storage';
import { cookies } from 'next/headers';
import { BUSINESS_WAITING_LIST_SECTION_IDS } from '@/features/landing/layouts/LandingLayout/utils';

export const BusinessWaitingListLandingPage = async () => {
  const cookieStore = await cookies();
  const currentUserWaitingListPositionCookie = cookieStore.get(
    APPLICATION_COOKIES.HEKIMA_BUSINESS_POSITION_IN_WAITING_LIST
  );
  const currentUserWaitingListPosition = currentUserWaitingListPositionCookie?.value
    ? parseInt(currentUserWaitingListPositionCookie?.value)
    : undefined;

  return (
    <>
      <LandingLayout.Container className="h-[calc(100lvh-170px)] overflow-hidden">
        <BusinessWaitingListHero currentUserWaitingListPosition={currentUserWaitingListPosition} />
      </LandingLayout.Container>

      {!currentUserWaitingListPosition && (
        <div className="relative flex bg-black">
          <LandingLayout.Container className="min-h-lvh overflow-hidden">
            <div id={BUSINESS_WAITING_LIST_SECTION_IDS.FORM} />
            <BusinessWaitingListForm />
          </LandingLayout.Container>
        </div>
      )}
    </>
  );
};
