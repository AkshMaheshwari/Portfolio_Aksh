import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

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
  metadataBase: new URL('https://akshmaheshwari.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-inter bg-pitch text-white antialiased">{children}</body>
      <Script
        id="plausible-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
        }}
      />
      <Script
        src="https://plausible.io/js/pa-POpiaB09tVLZr_rAPyy2n.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
