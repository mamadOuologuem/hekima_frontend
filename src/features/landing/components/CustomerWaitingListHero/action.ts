'use server';
import { cookies } from 'next/headers';

import { addContactToList, getListDetails } from '@/lib/marketing';
import { APPLICATION_COOKIES } from '@/lib/storage';

export const registerUserToWhatsAppWaitingList = async (phoneNumber: string) => {
  const cookieStore = await cookies();
  const { subscriberCount } = await getListDetails('WAITING_LIST');
  const userPosition = subscriberCount + 1;

  const status = await addContactToList('WAITING_LIST', {
    phone: phoneNumber,
    attributes: { WAITING_LIST_POSITION: userPosition }
  });
  console.log(status);

  if (status === 'success') {
    cookieStore.set(APPLICATION_COOKIES.HEKIMA_USER_POSITION_IN_WAITING_LIST, `${userPosition}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
  }
};
