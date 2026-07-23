"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { cart, setIsCartOpen, locale, setLocale } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100">
      
      {/* شريط الإعلان العلوي المميز */}
      <div className="bg-amber-900 text-amber-50 text-[11px] md:text-xs py-1.5 px-4 text-center font-medium">
        ✨ منتجات طبيعية وعضوية 100% لتغذية وترطيب البشرة — شحن سريع لجميع الولايات ✨
      </div>

      {/* الهيدر الرئيسي */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* 1. زر الموبايل للشاشات الصغيرة */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-amber-950 hover:bg-amber-50 rounded-lg"
            aria-label="القائمة"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* 2. الشعار الهوية (Logo) */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 bg-clip-text text-transparent">
              صابون الجنة
            </span>
          </Link>

          {/* 3. روابط التنقل (تظهر في الشاشات الكبيرة) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <Link href="/" className="hover:text-amber-800 transition-colors">
              الرئيسية
            </Link>
            <a href="#products" className="hover:text-amber-800 transition-colors">
              المنتجات
            </a>
            <a href="#about" className="hover:text-amber-800 transition-colors">
              عن صابون الجنة
            </a>
            <a href="#contact" className="hover:text-amber-800 transition-colors">
              اتصل بنا
            </a>
          </nav>

          {/* 4. أزرار التحكم (اللغة + السلة) */}
          <div className="flex items-center gap-3">
            {/* خيار تبديل اللغة */}
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-amber-200 text-amber-900 hover:bg-amber-50 transition-colors"
            >
              {locale === "ar" ? "EN" : "عربي"}
            </button>

            {/* أيقونة السلة */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-amber-900 hover:bg-amber-50 rounded-full transition-colors"
              aria-label="سلة التسوق"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* قائمة الموبايل عند الضغط على زر القائمة */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 pt-2 pb-4 space-y-2 text-sm font-semibold text-gray-700">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 hover:text-amber-800 border-b border-gray-50"
          >
            الرئيسية
          </Link>
          <a 
            href="#products" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 hover:text-amber-800 border-b border-gray-50"
          >
            المنتجات
          </a>
          <a 
            href="#about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 hover:text-amber-800 border-b border-gray-50"
          >
            عن صابون الجنة
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 hover:text-amber-800"
          >
            اتصل بنا
          </a>
        </div>
      )}
    </header>
  );
}
