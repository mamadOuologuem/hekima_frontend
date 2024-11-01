import Hero from '@/features/landing/components/Hero';
import PartnersSection from '@/features/landing/components/PartnersSection';
import ServiceListSection from '@/features/landing/components/ServiceListSection';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-y-20">
      <Hero />
      <PartnersSection />
      <ServiceListSection />
    </div>
  );
};

export default LandingPage;
