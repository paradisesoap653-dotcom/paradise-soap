"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { cart, setIsCartOpen, locale, setLocale, t } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* الشعار - Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-amber-900">
            <span>صابون الجنة</span>
          </Link>

          {/* أزرار التحكم: السلة واللغة */}
          <div className="flex items-center gap-3">
            {/* تبديل اللغة */}
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              {locale === "ar" ? "EN" : "عربي"}
            </button>

            {/* زر السلة */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-amber-800 transition-colors"
              aria-label="سلة التسوق"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
