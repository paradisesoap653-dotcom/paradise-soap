import type { Metadata, Viewport } from 'next'
import './globals.css' // تأكد من استدعاء ملف الـ CSS إذا كان موجوداً لديك

export const viewport: Viewport = {
  themeColor: '#4d5d3b',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Paradise Soap - برادايس سوب',
  description: 'متجر برادايس سوب للمنتجات الطبيعية والعضوية',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', type: 'image/png' },
    ],
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
