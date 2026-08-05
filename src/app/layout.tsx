import type { Metadata } from 'next'
import './globals.css' // أو مسار ملف CSS الخاص بك إذا كان مختلفاً

export const metadata: Metadata = {
  title: 'Paradise Astore',
  description: 'متجر برادايس استور',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-512x512.png',
    apple: '/icon-512x512.png',
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
