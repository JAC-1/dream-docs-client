import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
          className={`${inter.className}  h-screen flex flex-col w-screen bg-gray-50 `}
          style={{ backgroundImage: 'url(grain.png)' }}
        >
          <main className="w-full max-w-xl  flex flex-col items-center self-center justify-center flex-grow">
            {/* <div
              className={`inset-0 absolute -z-20  bg-gray-100  pointer-events-none`}
            ></div> */}
            <Header />
            {children}
          </main>
          <SpeedInsights />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
