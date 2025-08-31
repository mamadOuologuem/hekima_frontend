'use server';

import { ContactsApi, CreateContact } from '@getbrevo/brevo';
import { CONTACT_LIST_MAPPING, ContactListKey } from './utils';

const contactApi = new ContactsApi();
// @ts-expect-error - apiKey is a protected property
contactApi.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

interface ContractAttributes {
  WAITING_LIST_POSITION: number;
  COMPANY_NAME: string;
  COMPANY_SIZE: string;
  COMPANY_SECTOR_OF_ACTIVITY: string;
  /** @deprecated */
  COMPANY_DIGITAL_MEDIAS: string;
  COMPANY_PAINS: string;
  COMPANY_WEBSITE_URL: string;
  COMPANY_NEEDS: string;
}

export const addContactToList = async (
  listKey: ContactListKey,
  props: ({ email: string } | { phone: string }) & { attributes?: Partial<ContractAttributes> }
): Promise<'success' | 'duplicate'> => {
  const createContact = new CreateContact();
  createContact.listIds = [CONTACT_LIST_MAPPING[listKey]];
  createContact.attributes = props.attributes;

  if ('email' in props) {
    createContact.email = props.email;
  }

  if ('phone' in props) {
    createContact.attributes = { ...createContact.attributes, WHATSAPP: props.phone };
  }

  return contactApi
    .createContact(createContact)
    .then(() => 'success' as const)
    .catch((error) => {
      // User is already subscribed
      if (error.statusCode === 400 && error.body.code === 'duplicate_parameter') {
        return 'duplicate';
      }

      logErrorMessage(error);
      throw error;
    });
};

export const getListDetails = async (listKey: ContactListKey): Promise<{ subscriberCount: number }> => {
  try {
    const listId = CONTACT_LIST_MAPPING[listKey];
    const list = await contactApi.getList(listId).then(({ body }) => body);

    return {
      subscriberCount: list.uniqueSubscribers
    };
  } catch (error) {
    logErrorMessage(error);
    throw error;
  }
};

const logErrorMessage = (error: unknown) => console.error(JSON.stringify(error, null, 2));
