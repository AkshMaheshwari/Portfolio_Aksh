import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_URL, buildJsonLd } from '@/lib/seo';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Aksh Maheshwari — Full Stack Developer',
    template: '%s | Aksh Maheshwari',
  },
  description:
    'Aksh Maheshwari — Full Stack Developer from India. Building with Next.js, React, Node.js, Supabase and more. ICPC Asia West AIR 251. Open to internship & full-time roles.',
  keywords: [
    'Aksh Maheshwari',
    'Full Stack Developer',
    'Next.js',
    'React',
    'Node.js',
    'Portfolio',
    'ICPC',
    'India',
    'Wiglo.ai',
    'Software Engineer',
  ],
  authors: [{ name: 'Aksh Maheshwari', url: 'https://github.com/AkshMaheshwari' }],
  creator: 'Aksh Maheshwari',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    title: 'Aksh Maheshwari — Full Stack Developer',
    description:
      'Full Stack Developer building with Next.js, React, Supabase & Node.js. ICPC Asia West AIR 251. Check out my projects and career journey.',
    siteName: 'Aksh Maheshwari Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aksh Maheshwari — Full Stack Developer',
    description:
      'Full Stack Developer building with Next.js, React, Supabase & Node.js. ICPC Asia West AIR 251.',
    creator: '@AkshMaheshwari',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#080f0a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = buildJsonLd();

  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-inter bg-pitch text-white antialiased">
        {children}
        <Script
          strategy="afterInteractive"
          src="https://plausible.io/js/pa-POpiaB09tVLZr_rAPyy2n.js"
        />
      </body>
    </html>
  );
}
