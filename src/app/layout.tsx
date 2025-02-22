import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { TrackingContextProvider } from '@/lib/analytics';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hekima',
  description: 'The AI powered knowledge base'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={spaceGrotesk.className}>
        <TrackingContextProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          <Toaster />
        </TrackingContextProvider>
      </body>
    </html>
  );
}
