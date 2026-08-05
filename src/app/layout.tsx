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
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#F7C6C6" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(function() {
                    console.log('ServiceWorker registered');
                  }).catch(function(err) {
                    console.log('ServiceWorker registration failed:', err);
                  });
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
