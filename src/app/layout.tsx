import type { Metadata } from 'next';
import { Inter, Rajdhani, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Rakhi Wheels — Premium Die-Cast Rakhis',
    template: '%s · Rakhi Wheels',
  },
  description:
    'Premium Hot Wheels die-cast rakhis handcrafted for Raksha Bandhan. F1 cars, classic muscle, and fantasy designs with the mauli thread tied around the front wheel hub.',
  metadataBase: new URL('http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${rajdhani.variable} ${plexMono.variable}`}
    >
      <body className="bg-circuit-900 text-ivory font-body antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
