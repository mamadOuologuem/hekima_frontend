import { useTranslations } from 'next-intl';

export const LANDING_PAGE_SECTION_IDS = {
  PRODUCTS: 'products',
  TESTIMONIALS: 'testimonials',
  CONTACT_US: 'contact-us'
};

export const useMenuItems = () => {
  const t = useTranslations('app_bar');

  return [
    { name: 'Pour les entreprise', href: '/business-waiting-list' },
    { name: t('navigation__products_item'), href: `/#${LANDING_PAGE_SECTION_IDS.PRODUCTS}` },
    { name: t('navigation__testimonials_item'), href: `/#${LANDING_PAGE_SECTION_IDS.TESTIMONIALS}` },
    { name: t('navigation__contact_us_item'), href: `/#${LANDING_PAGE_SECTION_IDS.CONTACT_US}` }
  ];
};
