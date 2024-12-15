import { Hero } from '@/features/landing/components/Hero';
import { ProductListSection } from '@/features/landing/components/ProductListSection';
import AnnouncementSection from '@/features/landing/components/AnnouncementSection';
import TestimonialsSection from '@/features/landing/components/TestimonialsSection';
import ContactUsSection from '@/features/landing/components/ContactUsSection';
import Footer from '@/features/landing/components/Footer';
import { LandingLayout } from '@/features/landing/layouts/LandingLayout';
import { Spacer } from '@/components/atoms/Spacer';
import { LANDING_PAGE_SECTION_IDS } from '@/features/landing/layouts/LandingLayout/utils';

const LandingPage = () => {
  return (
    <>
      <LandingLayout.Container>
        <Hero />
        <Spacer height={5} />
      </LandingLayout.Container>

      <div className="bg-background-light">
        <LandingLayout.Container>
          <Spacer height={1} />
          <AnnouncementSection />
          <Spacer height={3} id={LANDING_PAGE_SECTION_IDS.PRODUCTS} />
          <ProductListSection />
          <Spacer height={5} />
        </LandingLayout.Container>
      </div>

      <LandingLayout.Container>
        <Spacer height={5} id={LANDING_PAGE_SECTION_IDS.TESTIMONIALS} />
        <TestimonialsSection />
        <Spacer height={5} id={LANDING_PAGE_SECTION_IDS.CONTACT_US} />
        <ContactUsSection />
        <Spacer height={5} />
        <Footer />
      </LandingLayout.Container>
    </>
  );
};

export default LandingPage;
