import { DownloadOnAppStore, DownloadOnGooglePlay } from '@/components/atoms/icons';
import { ManThoughtsIllustration } from '@/components/atoms/illustrations';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('landing_page');

  return (
    <section className="flex flex-col items-center gap-12 md:flex-row">
      <div className="flex flex-1 flex-col gap-8">
        <h1 className="hidden sm:block">
          <GradualSpacing>{t('hero__title_first_half')}</GradualSpacing>
          <GradualSpacing>{t('hero__title_second_half')}</GradualSpacing>
        </h1>
        <h1 className="sm:hidden">{t('hero__title')}</h1>
        <p>{t('hero__subtitle')}</p>

        <div className="flex h-14 gap-6">
          <a href="https://apps.apple.com/us/app/hekima-ai/id6739765401" target="_blank" rel="noreferrer">
            <DownloadOnAppStore />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.hekimaai&pcampaignid=web_share"
            target="_blank"
            rel="noreferrer"
          >
            <DownloadOnGooglePlay />
          </a>
        </div>
      </div>

      <div className="w-full md:w-5/12 lg:w-6/12">
        <div className="flex">
          <ManThoughtsIllustration primaryColor="#811C00" secondaryColor="#23292E" className="translate-x-3" animated />
          <ManThoughtsIllustration className="z-10 block -translate-x-3 -scale-x-100 md:hidden lg:block" animated />
        </div>
      </div>
    </section>
  );
};
