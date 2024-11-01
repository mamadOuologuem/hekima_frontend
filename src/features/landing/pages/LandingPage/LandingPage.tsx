import Hero from '@/features/landing/components/Hero';
import PartnersSection from '@/features/landing/components/PartnersSection';
import ServiceListSection from '@/features/landing/components/ServiceListSection';
import ProposalSection from '@/features/landing/components/ProposalSection';
import CaseStudiesSection from '@/features/landing/components/CaseStudiesSection';
import WorkProcessSection from '@/features/landing/components/WorkProcessSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import ContactUsSection from '@/features/landing/components/ContactUsSection';
import Footer from '@/features/landing/components/Footer';

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-y-20">
      <Hero />
      <PartnersSection />
      <ServiceListSection />
      <ProposalSection />
      <CaseStudiesSection />
      <WorkProcessSection />
      <TestimonialsSection />
      <ContactUsSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
