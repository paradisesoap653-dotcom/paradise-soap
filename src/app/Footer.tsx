"use client";

import React from "react";
import { Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-[#283D2D] border-t border-white/10 pt-14 pb-20 px-4 text-center text-white">
      <div className="mx-auto max-w-4xl space-y-8">

        <div>
          <h2 className="mb-3 text-3xl font-extrabold">
            Paradise Astore
          </h2>

          <p className="text-base text-white/70">
            متجرك الأول للمنتجات والمستحضرات الطبيعية العضوية.
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-2xl font-bold">
            تواصل معنا مباشرة
          </h3>

          <p className="text-sm text-white/70">
            يسعدنا خدمتكم والإجابة على استفساراتكم دائمًا
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 pt-3">

          {/* واتساب */}
          <a
            href="https://wa.me/249114556141"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="واتساب"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
          >
            <WhatsAppIcon
              className="h-9 w-9"
              title="واتساب"
            />
          </a>

          {/* فيسبوك */}
          <a
            href="https://m.facebook.com/paradisetech1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="فيسبوك"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2] text-4xl font-bold text-white shadow-lg transition-transform hover:scale-110"
          >
            f
          </a>

          {/* إنستغرام */}
          <a
            href="https://www.instagram.com/paradise_tech2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="إنستغرام"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 text-3xl font-bold text-white shadow-lg transition-transform hover:scale-110"
          >
            ◎
          </a>

          {/* تيك توك */}
          <a
            href="https://www.tiktok.com/@paradise_12s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تيك توك"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-4xl font-black text-white shadow-lg transition-transform hover:scale-110"
          >
            ♪
          </a>

          {/* يوتيوب */}
          <a
            href="https://youtube.com/@paradisetech_1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="يوتيوب"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0000] text-2xl font-bold text-white shadow-lg transition-transform hover:scale-110"
          >
            ▶
          </a>

          {/* الهاتف */}
          <a
            href="tel:+249114556141"
            aria-label="اتصال"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4285F4] shadow-lg transition-transform hover:scale-110"
          >
            <Phone className="h-9 w-9 text-white" />
          </a>

        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
          <a
            href="tel:+249114556141"
            className="transition hover:text-white"
          >
            📞 +249 11 455 6141
          </a>

          <a
            href="mailto:paradisesoap365@gmail.com"
            className="transition hover:text-white"
          >
            ✉️ paradisesoap365@gmail.com
          </a>
        </div>

        <div className="border-t border-white/10 pt-6 text-xs text-white/50">
          جميع الحقوق محفوظة © {new Date().getFullYear()} — Paradise Astore
        </div>

      </div>
    </footer>
  );
}
