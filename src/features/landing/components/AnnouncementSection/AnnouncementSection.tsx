import { ManHeadWithSparklesIllustration } from '@/components/atoms/illustrations';

const AnnouncementSection = () => {
  return (
    <section className="my-16 flex items-center justify-between rounded-3xl bg-secondary p-12 pt-8">
      <div className="space-y-4">
        <h3 className="animate-blink text-2xl font-medium">Announcement</h3>
        <p className="max-w-lg text-xl">
          We are thrilled to introduce you to Hekima, Africa&apos;s first conversational search engine, Ask in your own
          language and get answers that speak directly to you
        </p>
      </div>

      <div className="-my-32 mx-10 hidden w-80 md:block">
        <ManHeadWithSparklesIllustration />
      </div>
    </section>
  );
};

export default AnnouncementSection;
