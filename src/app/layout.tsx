import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'برادايس سوب',
  description: 'متجر صابون ومستحضرات تجميل طبيعية',
  manifest: '/manifest.json',
  themeColor: '#5c6347',
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>{children}</body>
    </html>
  );
}
