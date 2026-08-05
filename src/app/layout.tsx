import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Paradise Astore',
  description: 'متجر برادايس استور',
  manifest: '/manifest.json',
  icons: {
    icon: '/app-icon.png?v=2',
    apple: '/app-icon.png?v=2',
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
