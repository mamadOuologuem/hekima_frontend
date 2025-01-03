import { ManHeadWithSparklesIllustration } from '@/components/atoms/illustrations';
import { useTranslations } from 'next-intl';

const AnnouncementSection = () => {
  const t = useTranslations('landing_page');

  return (
    <section className="my-16 flex items-center justify-between rounded-3xl bg-secondary p-12 pt-8">
      <div className="space-y-4">
        <h3 className="animate-blink text-3xl font-medium">{t('announcement__title')}</h3>
        <p className="max-w-lg text-xl">{t('announcement__subtitle')}</p>
      </div>

      <div className="-my-32 mx-10 hidden w-80 md:block">
        <ManHeadWithSparklesIllustration />
      </div>
    </section>
  );
};

export default AnnouncementSection;
