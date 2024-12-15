import ManThoughtsIllustration from '@/components/atoms/illustrations/ManThoughtsIllustration';
import { Button } from '@/components/ui/button';
import GradualSpacing from '@/components/ui/gradual-spacing';

const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-20 md:flex-row">
      <div className="flex flex-1 flex-col gap-8">
        <h1 className="hidden sm:block">
          <GradualSpacing>AI for the Many,</GradualSpacing>
          <GradualSpacing>not the Few</GradualSpacing>
        </h1>
        <h1 className="sm:hidden">AI for the Many, not the Few</h1>
        <p className="text-xl">
          We&apos;re not just building AI; we&apos;re designing it to make a difference. Hekima creates intelligent
          solutions for developing regions, empowering people with the tools they need to shape their future. Because
          real progress happens when everyone has a chance to join in.
        </p>

        <Button size="lg" className="w-fit">
          Book a consultation
        </Button>
      </div>

      <div className="w-3/4 md:w-5/12 lg:w-6/12">
        <div className="flex gap-x-6">
          <ManThoughtsIllustration primaryColor="#811C00" secondaryColor="#23292E" className="-scale-x-100" />
          <ManThoughtsIllustration />
        </div>
      </div>
    </section>
  );
};

export default Hero;
