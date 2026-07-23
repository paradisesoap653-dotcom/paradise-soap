"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-10 pb-20 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* عنوان التواصل */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">تواصل معنا</h3>
          <p className="text-xs text-gray-500">يسعدنا خدمتكم والإجابة على استفساراتكم دائماً</p>
        </div>

        {/* أرقام التواصل والبريد */}
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <a
            href="tel:0913009060"
            className="bg-[#FAF7F2] text-[#5C6348] font-bold px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            📞 0913009060
          </a>
          <a
            href="tel:0114537190"
            className="bg-[#FAF7F2] text-[#5C6348] font-bold px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            📞 0114537190
          </a>
          <a
            href="mailto:paradisesoap365@gmail.com"
            className="bg-[#FAF7F2] text-[#5C6348] font-bold px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
          >
            ✉️ paradisesoap365@gmail.com
          </a>
        </div>

        {/* أيقونات مواقع التواصل الاجتماعي */}
        <div className="flex justify-center gap-2 flex-wrap pt-2">
          <a
            href="https://wa.me/249913009060"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition"
          >
            🟢 واتساب
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1877F2] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition"
          >
            🔵 فيسبوك
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition"
          >
            🎵 تيك توك
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FF0000] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:opacity-90 transition"
          >
            🔴 يوتيوب
          </a>
        </div>

        {/* الحقوق */}
        <div className="border-t border-gray-100 pt-6 text-[11px] text-gray-400">
          جميع الحقوق محفوظة © {new Date().getFullYear()} — صابون الجنة (Paradise Soap)
        </div>
      </div>
    </footer>
  );
}
