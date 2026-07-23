"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ShoppingBag, Sparkles, Phone, Globe, Menu, X, Landmark } from "lucide-react";
import { useState } from "react";
import InstallAppButton from "@/components/InstallAppButton";

export default function Navbar() {
  const { locale, setLocale, cartCount, setIsCartOpen, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-50">
      {/* Top micro-banner for Atbara residents */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white text-xs md:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            <span>
              {locale === "ar"
                ? "🚀 خدمة التوصيل السريع متوفرة لجميع أحياء مدينة عطبرة وما حولها (الداخلة، السودنة، الحصايا، المطار، إلخ)"
                : "🚀 Express Delivery to all neighborhoods of Atbara and suburbs (Al-Dakhla, Al-Sudana, Al-Hassaya, Al-Matar, etc.)"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs">
              <a href="tel:0913009060" className="hover:text-amber-300 flex items-center gap-1 transition-colors">
                <Phone className="h-3 w-3 text-amber-400" />
                <span>0913009060</span>
              </a>
              <span className="hidden sm:inline text-teal-300">|</span>
              <a href="tel:0114537190" className="hover:text-amber-300 flex items-center gap-1 transition-colors">
                <Phone className="h-3 w-3 text-amber-400" />
                <span>0114537190</span>
              </a>
            </div>
            <span className="hidden md:inline text-teal-200">|</span>
            <div className="flex items-center gap-1 text-xs">
              <Landmark className="h-3 w-3 text-amber-300" />
              <span>{locale === "ar" ? "ندعم التحويل عبر بنكك 💳" : "Bankak Pay Accepted 💳"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-amber-200 animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-2xl font-bold bg-gradient-to-r from-emerald-900 to-teal-700 bg-clip-text text-transparent font-serif leading-tight">
                  {locale === "ar" ? "برادايس للصابون" : "Paradise Soap"}
                </span>
                <span className="text-[10px] sm:text-xs text-emerald-700 font-extrabold tracking-wide leading-tight">
                  {locale === "ar" ? "Paradise Soap" : "برادايس للصابون"}
                </span>
                <span className="text-[9px] sm:text-[11px] text-amber-700 font-medium tracking-wide mt-0.5 leading-none">
                  {locale === "ar" ? "لإنتاج الصابون والتجميل" : "Soap & Cosmetics Production"}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-4 rtl:space-x-reverse items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("home")}
            </Link>
            <Link
              href="/#products-section"
              className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("products")}
            </Link>
            <Link
              href="/#about-section"
              className="text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {t("aboutUs")}
            </Link>
          </nav>

          {/* Right actions: Install, Lang and Cart */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <div className="hidden sm:block">
              <InstallAppButton compact />
            </div>

            {/* Language Switcher */}
            <button
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-700 hover:text-emerald-700 border border-gray-200 hover:border-emerald-200 px-2.5 py-1.5 rounded-full transition-all bg-gray-50/50 hover:bg-emerald-50/30"
              title={locale === "ar" ? "Switch to English" : "التحويل للغة العربية"}
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600" />
              <span>{locale === "ar" ? "English" : "العربية"}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-emerald-700 transition-colors bg-emerald-50 hover:bg-emerald-100 rounded-full"
              aria-label="Open Cart"
            >
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-800" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white ring-2 ring-white animate-bounce-slow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-emerald-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-emerald-50 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fade-in">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-emerald-700 px-3 py-2.5 rounded-md text-base font-medium"
          >
            {t("home")}
          </Link>
          <Link
            href="/#products-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-emerald-700 px-3 py-2.5 rounded-md text-base font-medium"
          >
            {t("products")}
          </Link>
          <Link
            href="/#about-section"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gray-700 hover:text-emerald-700 px-3 py-2.5 rounded-md text-base font-medium"
          >
            {t("aboutUs")}
          </Link>
          <div className="pt-2">
            <InstallAppButton />
          </div>
          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100/50 mt-4 text-xs text-amber-900 flex flex-col gap-1">
            <div className="font-semibold">{locale === "ar" ? "📍 خدمة أهل عطبرة:" : "📍 Serving Atbara:"}</div>
            <div>{locale === "ar" ? "نوفر خدمة توصيل مرنة لجميع أحياء عطبرة وقرى نهر النيل المجاورة." : "We provide responsive delivery to all Atbara neighborhoods and nearby River Nile villages."}</div>
          </div>
        </div>
      )}
    </header>
  );
}
