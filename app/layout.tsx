import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Kosugi_Maru } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/app/components/header/Header';
import Footer from './components/footer/Footer';
import PreviewProvider from './components/preview/PreviewProvider';

const isPreview = process.env.NEXT_PUBLIC_PREVIEW_MODE === 'true';

const kosugi = Kosugi_Maru({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dream Docks',
  description: '暗号化書類提出サービス',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const inner = (
    <html lang="en">
      <head>
        <link rel="icon" href="DD-Panda-32x32.png" />
      </head>
      <body
        className={`${kosugi.className}  h-screen flex flex-col w-screen bg-gray-50`}
        style={{ backgroundImage: 'url(grain.png)' }}
      >
        <main className="w-full max-w-xl  flex flex-col items-center self-center justify-center flex-grow">
          <Header />
          {children}
        </main>
        {!isPreview && <SpeedInsights />}
        <Footer />
      </body>
    </html>
  );

  if (isPreview) {
    return <PreviewProvider>{inner}</PreviewProvider>;
  }

  return <ClerkProvider>{inner}</ClerkProvider>;
}
