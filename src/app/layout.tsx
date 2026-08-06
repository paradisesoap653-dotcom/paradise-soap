import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paradise Soap',
  description: 'متجر برادايس استور للمنتجات  الطبيعية',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png?v=10',
    apple: '/logo.png?v=10',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
