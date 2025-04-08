'use client';
import { buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS_WAITING_LIST_SECTION_IDS } from '@/features/landing/layouts/LandingLayout/utils';
import CountUp from 'react-countup';

interface BusinessWaitingListHeroProps {
  currentUserWaitingListPosition?: number;
}

const STARTING_COUNT_IN_WAITING_LIST = 500;

export const BusinessWaitingListHero = ({ currentUserWaitingListPosition }: BusinessWaitingListHeroProps) => {
  const t = useTranslations('landing_page');

  return (
    <section className="flex h-full flex-col items-center gap-16">
      <div className="flex flex-col items-center gap-8 text-center md:w-2/3">
        <h1 className="text-5xl md:text-6xl">{t('business_waiting_list__hero_title')}</h1>
        {currentUserWaitingListPosition ? (
          <>
            <p className="md:w-2/3">
              Merci de votre intérêt pour Hekima ! Vous recevrez vos accès en avant-première dès le lancement de la
              plateforme B2B
            </p>

            <div>
              <p>Vous êtes en position</p>
              <CountUp
                className="text-6xl font-medium"
                start={1}
                end={STARTING_COUNT_IN_WAITING_LIST + currentUserWaitingListPosition}
              />
            </div>
          </>
        ) : (
          <>
            <p className="md:w-2/3">{t('business_waiting_list__hero_subtitle')}</p>
            <Link
              href={`/business-waiting-list/#${BUSINESS_WAITING_LIST_SECTION_IDS.FORM}`}
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              {t('business_waiting_list__cta_title')}
            </Link>
          </>
        )}
      </div>

      <div className="relative flex flex-1 items-end">
        <Image
          src="/landing/business-waiting-list/b2b_dashboard_showcase.png"
          alt=""
          width={1000}
          height={666}
          className="relative -bottom-px hidden shadow-2xl md:block"
        />
        <Image
          src="/landing/business-waiting-list/b2b_dashboard_showcase_mobile.png"
          alt=""
          width={1000}
          height={666}
          className="relative -bottom-px block shadow-2xl md:hidden"
        />
      </div>
    </section>
  );
};
