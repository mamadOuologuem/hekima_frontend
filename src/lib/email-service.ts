'use server';

import brevo from '@getbrevo/brevo';

const TEMPLATE_MAPPING = {
  CONTACT_US: 2
} as const;

const CONTACT_LIST_MAPPING = {
  NEWSLETTER: 2
} as const;

const ADMIN_CONTACTS = [{ name: 'Mamadou Ouologuem', email: 'mamadou.ouologuem02@gmail.com' }];

const transactionalEmailsApi = new brevo.TransactionalEmailsApi();
// @ts-expect-error - apiKey is a protected property
transactionalEmailsApi.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

const contactApi = new brevo.ContactsApi();
// @ts-expect-error - apiKey is a protected property
contactApi.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

export const sendContactEmail = async (prospectName: string, prospectEmail: string, prospectMessage: string) => {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.to = ADMIN_CONTACTS;
  sendSmtpEmail.templateId = TEMPLATE_MAPPING.CONTACT_US;
  sendSmtpEmail.params = {
    prospectName,
    prospectEmail,
    prospectMessage
  };

  await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
};

export const subscribeEmailToNewsletter = async (email: string) => {
  const createContact = new brevo.CreateContact();

  createContact.email = email;
  createContact.listIds = [CONTACT_LIST_MAPPING.NEWSLETTER];

  await contactApi.createContact(createContact).catch((error) => {
    // User is already subscribed
    if (error.statusCode === 400 && error.body.code === 'duplicate_parameter') {
      return;
    }

    throw error;
  });
};
