"use client";

import React, { useEffect, useState } from "react";
import { Download, Smartphone } from "lucide-react";
import { useApp } from "@/context/AppContext";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function InstallAppButton({ compact = false }: { compact?: boolean }) {
  const { locale } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const standalone = window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari standalone flag
      window.navigator.standalone === true;
    setIsInstalled(standalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setIsInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (isInstalled) return;

    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      return;
    }

    if (isIOS) {
      alert(
        locale === "ar"
          ? "لتثبيت المتجر على الآيفون: اضغط زر المشاركة في المتصفح ثم اختر: إضافة إلى الشاشة الرئيسية."
          : "To install on iPhone: tap Share in Safari, then choose Add to Home Screen."
      );
      return;
    }

    alert(
      locale === "ar"
        ? "إذا لم يظهر مربع التثبيت، افتح قائمة المتصفح واختر: تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية."
        : "If the install prompt does not appear, open your browser menu and choose Install app or Add to Home screen."
    );
  };

  if (isInstalled) return null;

  return (
    <button
      onClick={handleInstall}
      className={
        compact
          ? "inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[11px] font-extrabold text-amber-800 hover:bg-amber-100 transition-all"
          : "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2.5 text-xs font-extrabold text-slate-950 shadow-md shadow-amber-500/20 hover:from-amber-600 hover:to-yellow-600 transition-all"
      }
      title={locale === "ar" ? "ثبّت متجر برادايس على الهاتف" : "Install Paradise Soap on your phone"}
    >
      {compact ? <Download className="h-3.5 w-3.5" /> : <Smartphone className="h-4 w-4" />}
      <span>{locale === "ar" ? "تثبيت" : "Install"}</span>
    </button>
  );
}
