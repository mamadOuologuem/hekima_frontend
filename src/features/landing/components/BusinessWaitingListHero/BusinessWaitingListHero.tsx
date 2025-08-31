'use client';
import { buttonVariants } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { BUSINESS_WAITING_LIST_SECTION_IDS } from '@/features/landing/layouts/LandingLayout/utils';
import { ManThoughtsIllustrationLong } from '@/components/atoms/illustrations';

export const BusinessWaitingListHero = () => {
  const t = useTranslations();

  return (
    <div className="relative z-10 flex h-full items-center justify-center gap-20 overflow-y-clip md:flex-row">
      <ManThoughtsIllustrationLong
        primaryColor="#59809E"
        secondaryColor="#23292E"
        className="absolute -bottom-40 -right-72 -z-10 h-full -scale-x-100 opacity-5 md:-right-60 md:opacity-100 lg:-right-40"
      />
      <div className="max-w-lg px-8 sm:px-12 md:px-20">
        <section className="flex flex-col items-center gap-y-10 text-center">
          <h1 className="flex flex-col items-center text-7xl sm:text-9xl">
            {t('landing_page.business_waiting_list__hero_title')}
          </h1>
          <p className="text-xl">{t('landing_page.business_waiting_list__hero_subtitle')}</p>

          <div className="mt-10 w-full sm:w-fit">
            <Link
              href={`/business-waiting-list/#${BUSINESS_WAITING_LIST_SECTION_IDS.FORM}`}
              className={buttonVariants({ variant: 'outline', size: 'lg' })}
            >
              {t('landing_page.business_waiting_list__cta_title')}
            </Link>
          </div>
        </section>
      </div>
      <ManThoughtsIllustrationLong
        secondaryColor="#59809E"
        primaryColor="#23292E"
        className="absolute -bottom-40 -left-72 -z-10 h-full opacity-5 md:-left-60 md:opacity-100 lg:-left-40 "
      />
    </div>
  );
};
