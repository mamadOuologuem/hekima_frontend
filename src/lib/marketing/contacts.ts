'use server';

import { ContactsApi, CreateContact } from '@getbrevo/brevo';
import { CONTACT_LIST_MAPPING, ContactListKey } from './utils';

const contactApi = new ContactsApi();
// @ts-expect-error - apiKey is a protected property
contactApi.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

interface ContractAttributes {
  WAITING_LIST_POSITION: number;
}

export const addContactToList = async (
  listKey: ContactListKey,
  props: ({ email: string } | { phone: string }) & { attributes?: Partial<ContractAttributes> }
): Promise<void> => {
  const createContact = new brevo.CreateContact();
  createContact.listIds = [CONTACT_LIST_MAPPING[listKey]];
  createContact.attributes = props.attributes;

  if ('email' in props) {
    createContact.email = props.email;
  }

  if ('phone' in props) {
    createContact.attributes = { ...createContact.attributes, WHATSAPP: props.phone };
  }

  await contactApi.createContact(createContact).catch((error) => {
    // User is already subscribed
    if (error.statusCode === 400 && error.body.code === 'duplicate_parameter') {
      return;
    }

    throw error;
  });
};

export const getListDetails = async (listKey: ContactListKey): Promise<{ subscriberCount: number }> => {
  const listId = CONTACT_LIST_MAPPING[listKey];
  const list = await contactApi.getList(listId).then(({ body }) => body);

  return {
    subscriberCount: list.uniqueSubscribers
  };
};
