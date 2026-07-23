"use client";

import React, { useState } from "react";
import { Phone, X, Sparkles, Mail } from "lucide-react";
import { useApp } from "@/context/AppContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function FloatingSupport() {
  const { locale } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans" dir="rtl">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group h-16 w-16 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 animate-bounce-slow ring-4 ring-white/70"
          title={locale === "ar" ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
          aria-label={locale === "ar" ? "فتح واتساب الدعم" : "Open WhatsApp support"}
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500" />
          </span>
          <WhatsAppIcon className="h-8 w-8 text-white" title="WhatsApp" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-emerald-50 w-72 sm:w-80 overflow-hidden animate-fade-in text-right">
          <div className="bg-gradient-to-r from-emerald-900 to-teal-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md">
                <WhatsAppIcon className="h-5 w-5" title="WhatsApp" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">
                  {locale === "ar" ? "واتساب المبيعات والدعم 🟢" : "WhatsApp Sales & Support 🟢"}
                </h4>
                <p className="text-[10px] text-teal-100">
                  {locale === "ar" ? "متواجدون دائماً لخدمتك" : "We are here for you"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-emerald-800 rounded-full transition-colors text-white"
              aria-label={locale === "ar" ? "إغلاق" : "Close"}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              {locale === "ar"
                ? "أهلاً بك في برادايس للصابون بعطبرة! اضغط على زر واتساب للتواصل الفوري أو زر الاتصال للطلب السريع."
                : "Welcome to Paradise Soap Atbara! Tap WhatsApp for instant chat or Call for quick orders."}
            </p>

            <SupportLine
              label={locale === "ar" ? "الخط الرئيسي" : "Primary Line"}
              phone="0913009060"
              whatsapp="249913009060"
              tone="emerald"
              locale={locale}
            />

            <SupportLine
              label={locale === "ar" ? "خط إضافي" : "Second Line"}
              phone="0114537190"
              whatsapp="249114537190"
              tone="teal"
              locale={locale}
            />

            <div className="text-center pt-2 border-t border-gray-100 space-y-1">
              <a
                href="mailto:info@paradise-soap.com"
                className="text-[11px] text-gray-400 hover:text-emerald-800 font-mono flex items-center justify-center gap-1"
              >
                <Mail className="h-3 w-3" />
                <span>info@paradise-soap.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SupportLine({
  label,
  phone,
  whatsapp,
  tone,
  locale,
}: {
  label: string;
  phone: string;
  whatsapp: string;
  tone: "emerald" | "teal";
  locale: string;
}) {
  const callClass = tone === "emerald" ? "bg-emerald-700 hover:bg-emerald-800" : "bg-teal-700 hover:bg-teal-800";
  const labelClass = tone === "emerald" ? "bg-emerald-100 text-emerald-800" : "bg-teal-100 text-teal-800";

  return (
    <div className="p-3 bg-gray-50 hover:bg-emerald-50/50 rounded-xl border border-gray-100 transition-colors">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${labelClass}`}>
          {label}
        </span>
        <span className="text-[11px] font-bold text-gray-800">{phone}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-2 px-2.5 rounded-lg transition-all transform hover:scale-[1.03] shadow-sm"
        >
          <WhatsAppIcon className="h-4 w-4 text-white" title="WhatsApp" />
          <span>{locale === "ar" ? "واتساب" : "WhatsApp"}</span>
        </a>
        <a
          href={`tel:${phone}`}
          className={`flex items-center justify-center gap-1 text-white text-xs font-bold py-2 px-2.5 rounded-lg transition-colors ${callClass}`}
        >
          <Phone className="h-3.5 w-3.5" />
          <span>{locale === "ar" ? "اتصال" : "Call"}</span>
        </a>
      </div>
    </div>
  );
}
