import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="flex flex-col items-center gap-20 md:flex-row">
      <div className="flex flex-1 flex-col gap-8">
        <h1>Navigating the digital landscape for success</h1>
        <p className="text-xl">
          Our digital marketing agency helps businesses grow and succeed online through a range of services including
          SEO, PPC, social media marketing, and content creation. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Obcaecati, laborum nisi!
        </p>

        <Button size="lg" className="w-fit">
          Book a consultation
        </Button>
      </div>

      <div className="w-3/4 md:w-5/12 lg:w-6/12">
        <Image src="/landing/illustration.svg" alt="" width={660} height={660} />
      </div>
    </section>
  );
};

export default Hero;
