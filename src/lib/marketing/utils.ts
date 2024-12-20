export const TEMPLATE_MAPPING = {
  CONTACT_US: 2
} as const;

export const CONTACT_LIST_MAPPING = {
  NEWSLETTER: 2,
  WAITING_LIST: 5
} as const;

export type ContactListKey = keyof typeof CONTACT_LIST_MAPPING;
export type EmailTemplateKey = keyof typeof TEMPLATE_MAPPING;

export const ADMIN_CONTACTS = [{ name: 'Mamadou Ouologuem', email: 'mamadou.ouologuem02@gmail.com' }];
