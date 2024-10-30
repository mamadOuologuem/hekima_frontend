import Hero from '@/features/landing/components/Hero';
import PartnersSection from '@/features/landing/components/PartnersSection';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-y-20">
      <Hero />
      <PartnersSection />
    </div>
  );
};

export default LandingPage;
