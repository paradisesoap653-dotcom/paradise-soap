'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ضع رقم هاتفك مع مفتاح الدولة هنا (مثال: السودان 249...)
  const whatsappNumber = "249123456789"; 

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c3e2e]">
      {/* Top Banner */}
      <div className="bg-[#5c3447] text-white text-xs md:text-sm py-2 text-center px-4 font-medium">
        ✨ هل لديك منتجات طبيعية؟ انضم إلى Paradise Soap واعرضها مجاناً!
      </div>

      {/* Header / Navbar */}
      <header className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#5a6b48]">برادايس سوب</span>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-2 border rounded-lg text-gray-700 hover:bg-gray-100"
          aria-label="القائمة"
        >
          ☰
        </button>
      </header>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="bg-white border-b p-4 space-y-3 font-medium text-sm text-right">
          <a href="#" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#5a6b48]">الصفحة الرئيسية</a>
          <a href="#products" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#5a6b48]">جميع المنتجات</a>
          <a href="#seller-section" onClick={() => setIsMenuOpen(false)} className="block py-1 text-green-700 font-bold">+ انضم كبائع</a>
          <a href="#footer" onClick={() => setIsMenuOpen(false)} className="block py-1 hover:text-[#5a6b48]">اتصل بنا</a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-[#5a6b48] text-white py-12 px-6 text-center rounded-b-3xl shadow-sm">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold">
            ✨ منتجات طبيعية وعضوية 100%
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Paradise Soap
          </h1>
          
          <p className="text-lg font-medium opacity-90">
            برادايس سوب — صابون ومستحضرات التجميل
          </p>
          
          <p className="text-sm max-w-xl mx-auto opacity-80 leading-relaxed">
            منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a 
              href="#products" 
              className="w-full sm:w-auto bg-white text-[#5a6b48] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              تسوق الآن
            </a>
            <a 
              href="#seller-section" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition"
            >
              انضم كبائع 🌿
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-lg mx-auto">
            <div>
              <div className="text-xl font-bold">100%</div>
              <div className="text-xs opacity-75">طبيعي</div>
            </div>
            <div>
              <div className="text-xl font-bold">+500</div>
              <div className="text-xs opacity-75">عميل سعيد</div>
            </div>
            <div>
              <div className="text-xl font-bold">★ 4.9</div>
              <div className="text-xs opacity-75">تقييم عام</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          🌿 منتجاتنا المميزة
        </h2>
        
        {/* شبكة عرض المنتجات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border rounded-2xl p-4 shadow-sm text-right">
            <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-400">
              📸 صورة المنتج
            </div>
            <h3 className="font-bold text-lg mb-1">صابون زيت الزيتون الطبيعي</h3>
            <p className="text-xs text-gray-500 mb-3">مصنوع يدوياً 100% لتنعيم وترطيب البشرة.</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#5a6b48]">جديد</span>
              <a 
                href={`https://wa.me/${whatsappNumber}?text=أرغب%20في%20طلب%20صابون%20زيت%20الزيتون`} 
                target="_blank" 
                className="bg-[#5a6b48] text-white text-xs px-4 py-2 rounded-lg font-bold"
              >
                اطلب عبر الواتساب
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Seller Section */}
      <section id="seller-section" className="max-w-4xl mx-auto my-12 mx-4 bg-white border border-[#e2dad1] rounded-2xl p-8 shadow-sm text-center">
        <div className="inline-block p-3 bg-[#f0f4ec] rounded-full text-2xl mb-4">🌿</div>
        <h2 className="text-2xl font-bold text-[#5a6b48] mb-3">
          هل أنت منتج؟
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
          حوّل منتجاتك إلى فرصة أكبر للنجاح. انضم إلى Paradise Soap واعرض منتجاتك أمام آلاف العملاء. أضف صور بضائعك، اكتب وصفاً لها، حدّد أسعارها، وابدأ البيع بسهولة.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-right max-w-2xl mx-auto mb-8 text-xs font-medium">
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>إنشاء متجر مجاني</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>رفع صور المنتجات</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>إدارة سهلة للمبيعات</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>الوصول لعملاء جدد</span>
          </div>
        </div>

        <a 
          href={`https://wa.me/${whatsappNumber}?text=مرحباً،%20أرغب%20في%20الانضمام%20كبائع%20في%20Paradise%20Soap`} 
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-[#5a6b48] text-white font-bold text-lg px-10 py-4 rounded-full shadow-md hover:bg-[#48563a] transition"
        >
          🟢 ابدأ البيع الآن (تواصل معنا)
        </a>
      </section>

      {/* Footer Section */}
      <footer id="footer" className="bg-[#2c3e2e] text-white py-10 px-6 text-center text-sm space-y-4">
        <h3 className="text-xl font-bold">Paradise Soap</h3>
        <p className="text-gray-300 max-w-md mx-auto">منصتك الأولى للمنتجات والمستحضرات الطبيعية العضوية.</p>
        
        <div className="flex justify-center gap-6 pt-2">
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="hover:underline">واتساب</a>
          <a href="#" className="hover:underline">فيسبوك</a>
          <a href="#" className="hover:underline">إنستغرام</a>
        </div>

        <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
          جميع الحقوق محفوظة © 2026 Paradise Soap
        </div>
      </footer>
    </main>
  );
}
