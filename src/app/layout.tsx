
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "برادايس للصابون ومستحضرات التجميل | Paradise Soap Atbara",
  description: "مصنع وسلسلة معارض برادايس لإنتاج وبيع أجود أنواع الصابون السائل والصلب والمعجون والجل ومستحضرات التجميل الطبيعية والعلاجية في مدينة عطبرة، الدامر، والولايات المجاورة. خدمة توصيل لباب منزلك ودعم الدفع عبر تطبيق بنكك.",
  keywords: "صابون, عطبرة, صابون سائل, صابون صلب, معجون صابون, جل معقم, مستحضرات تجميل, السودان, بنكك, توصيل, برادايس للصابون, Paradise Soap, Atbara, Sudan",
  manifest: "/manifest.webmanifest",
  applicationName: "Paradise Soap",
  appleWebApp: {
    capable: true,
    title: "Paradise Soap",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/icons/paradise-icon.svg",
    apple: "/icons/paradise-icon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans min-h-screen flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
