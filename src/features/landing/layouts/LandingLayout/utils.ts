export const LANDING_PAGE_SECTION_IDS = {
  PRODUCTS: 'products',
  TESTIMONIALS: 'testimonials',
  CONTACT_US: 'contact-us'
};

export const menuItems = [
  { name: 'Chat', href: '/chat' },
  { name: 'Our products', href: `/#${LANDING_PAGE_SECTION_IDS.PRODUCTS}` },
  { name: 'Testimonials', href: `/#${LANDING_PAGE_SECTION_IDS.TESTIMONIALS}` },
  { name: 'Contact Us', href: `/#${LANDING_PAGE_SECTION_IDS.CONTACT_US}` }
];
