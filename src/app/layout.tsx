import type { Metadata } from 'next';
import './globals.css';

import { Space_Grotesk } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hekima',
  description: 'The AI powered knowledge base'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
