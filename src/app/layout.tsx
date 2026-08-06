import type { Metadata, Viewport } from 'next'
import './globals.css'

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
    icon: '/logo.png?v=3',
    apple: '/logo.png?v=3',
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
