"use client";

import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
} from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-[#283D2D] border-t border-white/10 pt-14 pb-20 px-4 text-center text-white">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* عنوان الموقع */}
        <div>
          <h2 className="text-3xl font-extrabold mb-3">
            Paradise Astore
          </h2>
          <p className="text-base text-white/70">
            متجرك الأول للمنتجات والمستحضرات الطبيعية العضوية.
          </p>
        </div>

        {/* عنوان التواصل */}
        <div>
          <h3 className="text-2xl font-bold mb-2">
            تواصل معنا مباشرة
          </h3>
          <p className="text-sm text-white/70">
            يسعدنا خدمتكم والإجابة على استفساراتكم دائمًا
          </p>
        </div>

        {/* أيقونات التواصل */}
        <div className="flex justify-center items-center gap-5 flex-wrap pt-3">

          {/* واتساب */}
          <a
            href="https://wa.me/249114556141"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="واتساب"
            className="w-16 h-16 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
          >
            <WhatsAppIcon className="w-9 h-9" title="واتساب" />
          </a>

          {/* فيسبوك */}
          <a
            href="https://m.facebook.com/paradisetech1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="فيسبوك"
            className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Facebook className="w-9 h-9 text-white" />
          </a>

          {/* إنستغرام */}
          <a
            href="https://www.instagram.com/paradise_tech2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="إنستغرام"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Instagram className="w-9 h-9 text-white" />
          </a>

          {/* تيك توك */}
          <a
            href="https://www.tiktok.com/@paradise_12s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تيك توك"
            className="w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <span className="text-white text-3xl font-black">♪</span>
          </a>

          {/* يوتيوب */}
          <a
            href="https://youtube.com/@paradisetech_1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="يوتيوب"
            className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Youtube className="w-9 h-9 text-white" />
          </a>

          {/* الهاتف */}
          <a
            href="tel:+249114556141"
            aria-label="اتصال"
            className="w-16 h-16 rounded-full bg-[#4285F4] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Phone className="w-9 h-9 text-white" />
          </a>

        </div>

        {/* البريد ورقم الهاتف */}
        <div className="flex flex-wrap justify-center gap-3 text-sm text-white/80">
          <a href="tel:+249114556141" className="hover:text-white transition">
            📞 +249 11 455 6141
          </a>

          <a
            href="mailto:paradisesoap365@gmail.com"
            className="hover:text-white transition"
          >
            ✉️ paradisesoap365@gmail.com
          </a>
        </div>

        {/* الحقوق */}
        <div className="border-t border-white/10 pt-6 text-xs text-white/50">
          جميع الحقوق محفوظة © {new Date().getFullYear()} — Paradise Astore
        </div>

      </div>
    </footer>
  );
}
