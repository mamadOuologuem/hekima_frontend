'use server';

import brevo from '@getbrevo/brevo';

const TEMPLATE_MAPPING = {
  CONTACT_US: 2
} as const;

const ADMIN_CONTACTS = [{ name: 'Mamadou Ouologuem', email: 'mamadou.ouologuem02@gmail.com' }];

const apiInstance = new brevo.TransactionalEmailsApi();
// @ts-expect-error - apiKey is a protected property
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

export const sendContactEmail = async (prospectName: string, prospectEmail: string, prospectMessage: string) => {
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.to = ADMIN_CONTACTS;
  sendSmtpEmail.templateId = TEMPLATE_MAPPING.CONTACT_US;
  sendSmtpEmail.params = {
    prospectName,
    prospectEmail,
    prospectMessage
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};
