import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from './components/Navbar';
import CartDrawer from './CartDrawer';

export const metadata: Metadata = {
  title: 'برادايس سوب',
  description: 'متجر صابون ومستحضرات تجميل طبيعية',
  manifest: '/manifest.json',
  themeColor: '#5c6347',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'برادايس سوب',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5c6347" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <AppProvider>
          <Navbar />
          {children}
          <CartDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
