'use server';

import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';
import { ADMIN_CONTACTS, EmailTemplateKey, TEMPLATE_MAPPING } from './utils';

const transactionalEmailsApi = new TransactionalEmailsApi();
// @ts-expect-error - apiKey is a protected property
transactionalEmailsApi.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

export const sendTransactionalEmail = async (
  templateKey: EmailTemplateKey,
  props: { params: Record<string, string> }
) => {
  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.to = ADMIN_CONTACTS;
  sendSmtpEmail.templateId = TEMPLATE_MAPPING[templateKey];
  sendSmtpEmail.params = props.params;

  await transactionalEmailsApi.sendTransacEmail(sendSmtpEmail);
};
