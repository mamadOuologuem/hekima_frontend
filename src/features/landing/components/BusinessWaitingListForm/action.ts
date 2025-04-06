'use server';
import { cookies } from 'next/headers';

import { addContactToList, getListDetails } from '@/lib/marketing';
import { APPLICATION_COOKIES } from '@/lib/storage';
import { ContactListKey } from '@/lib/marketing/utils';
import { BusinessWaitingListFormValues } from './schema';

const listKey: ContactListKey = 'BUSINESS_WAITING_LIST';

export const registerBusinessToWaitingList = async (data: BusinessWaitingListFormValues) => {
  const cookieStore = await cookies();
  const { subscriberCount } = await getListDetails(listKey);
  const businessPosition = subscriberCount + 1;

  const status = await addContactToList(listKey, {
    email: data.email,
    phone: data.businessPhone,
    attributes: {
      WAITING_LIST_POSITION: businessPosition,
      COMPANY_NAME: data.businessName,
      COMPANY_SIZE: data.businessSize,
      COMPANY_SECTOR_OF_ACTIVITY: data.sectorOfActivity,
      COMPANY_DIGITAL_MEDIAS: data.digitalMedias.join(', '),
      COMPANY_WEBSITE_URL: data.websiteUrl,
      COMPANY_NEEDS: data.needs
    }
  });

  if (status === 'success') {
    cookieStore.set(APPLICATION_COOKIES.HEKIMA_BUSINESS_POSITION_IN_WAITING_LIST, `${businessPosition}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  if (status === 'duplicate') {
    const currentBusinessPositionInWaitingListCookie = cookieStore.get(
      APPLICATION_COOKIES.HEKIMA_BUSINESS_POSITION_IN_WAITING_LIST
    );

    if (!currentBusinessPositionInWaitingListCookie) {
      cookieStore.set(APPLICATION_COOKIES.HEKIMA_BUSINESS_POSITION_IN_WAITING_LIST, `${subscriberCount}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      });
    }
  }
};
