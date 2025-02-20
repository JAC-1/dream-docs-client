import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

import Header from '@/app/components/header/Header';
import Footer from './components/footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dream Docks',
  // TODO: Update metadata for Japanese
  description: 'A E2EE Document Submission App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} min-h-screen h-screen flex flex-col w-screen`}
        >
          <Header />
          <main className="w-full max-w-xl  flex flex-col items-center self-center justify-center">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
