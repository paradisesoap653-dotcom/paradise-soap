"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useApp } from "@/context/AppContext";

const sampleProducts = [
  {
    id: "1",
    nameAr: "صابون النيم والنعناع الطبيعي",
    sizeAr: "قطعة 100 جرام",
    descriptionAr: "صابون طبيعي ينظف البشرة بعمق ويساعد على تهدئة التهابات الجلد والبشرة الحساسة.",
    priceSdg: 3500,
    image: "/images/placeholder.jpg",
  },
  {
    id: "2",
    nameAr: "معجون غسيل الصحون الفائق (بالليمون)",
    sizeAr: "عبوة 1 كيلو",
    descriptionAr: "تركيبة مركزة وقوية لإزالة الدهون المستعصية مع حماية فائقة للأيدي.",
    priceSdg: 4500,
    image: "/images/placeholder.jpg",
  },
  {
    id: "3",
    nameAr: "جل استحمام برائحة العود الملكي",
    sizeAr: "عبوة 500 مل",
    descriptionAr: "تجربة استحمام فاخرة برائحة العود الأصيل تدوم طويلاً وتمنح بشرتك النعومة.",
    priceSdg: 6000,
    image: "/images/placeholder.jpg",
  },
];

export default function HomePage() {
  const { addToCart } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-gray-800 font-sans flex flex-col justify-between selection:bg-amber-100">
      <div>
        {/* الهيدر العلوي */}
        <Navbar />

        {/* 1. قسم الواجهة الرئيسي - ناصع وواضح وبدون ظلال معتمة */}
        <section className="bg-[#5C6348] text-white py-16 px-4 text-center rounded-b-[2.5rem]">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-white/15 text-amber-100 text-xs px-4 py-1.5 rounded-full font-medium">
              ✨ منتجات طبيعية وعضوية 100%
            </span>
            
            {/* عنوان الواجهة واضح وجلي */}
            <div className="space-y-1 pt-2">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide text-white">
                Paradise Soap
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-200 font-serif">
                برادايس سوب — صابون الجنة
              </h2>
            </div>

            <p className="text-amber-50/90 text-sm md:text-base max-w-lg mx-auto leading-relaxed pt-2">
              منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <a
                href="#products"
                className="bg-white text-[#5C6348] font-bold px-8 py-3 rounded-full shadow-md hover:bg-amber-50 transition active:scale-95 text-sm"
              >
                تسوق المنتجات
              </a>
            </div>

            {/* الإحصائيات السريعة */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-8 border-t border-white/15 text-amber-100 text-xs">
              <div>
                <div className="font-bold text-lg text-white">100%</div>
                <div>طبيعي</div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">+500</div>
                <div>عميل سعيد</div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">4.9★</div>
                <div>تقييم عام</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. قسم المميزات - كروت بيضاء ناعمة ومريحة للعين */}
        <section className="max-w-5xl mx-auto px-4 -mt-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-900/5 text-center">
              <div className="w-12 h-12 bg-[#F3F4ED] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                🌱
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">مكونات طبيعية 100%</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                خالية تماماً من المواد الكيميائية الضارة لضمان صحة ونضارة بشرتك.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-900/5 text-center">
              <div className="w-12 h-12 bg-[#F3F4ED] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                ✨
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">صناعة يدوية فاخرة</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                كل قطعة تُصنع بحب وعناية فائقة لتمنحك تجربة استخدام فريدة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-amber-900/5 text-center">
              <div className="w-12 h-12 bg-[#F3F4ED] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                🚚
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">توصيل سريع وآمن</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                يصلك طلبك حتى باب المنزل في أسرع وقت ممكن.
              </p>
            </div>
          </div>
        </section>

        {/* 3. قسم المنتجات - تصميم كروت أنيق ونظيف */}
        <section id="products" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">منتجاتنا المتميزة</h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
              تصفح تشكيلتنا المختارة من الصابون ومستحضرات التجميل الطبيعية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-amber-900/5 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full bg-amber-50/50">
                    <Image
                      src={product.image}
                      alt={product.nameAr}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-amber-900 text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                      {product.sizeAr}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-base mb-2">{product.nameAr}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {product.descriptionAr}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto pt-4">
                  <div className="text-amber-900 font-extrabold text-lg">
                    {product.priceSdg.toLocaleString()} <span className="text-xs font-normal text-gray-500">ج.س</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-xs text-gray-600 hover:text-amber-800 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium"
                    >
                      التفاصيل
                    </Link>
                    <button
                      onClick={() => addToCart({ ...product, quantity: 1 })}
                      className="text-xs bg-[#5C6348] text-white font-semibold px-4 py-2 rounded-xl hover:bg-[#4a503a] transition active:scale-95"
                    >
                      إضافة للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. قسم الآراء والتقييمات */}
        <section className="bg-[#F3F4ED] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">آراء عملائنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl shadow-sm text-right border border-amber-900/5">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  "الصابون ممتاز جداً ونعومته واضحة على البشرة من أول استخدام. تسلم الأيادي!"
                </p>
                <div className="font-bold text-xs text-gray-900">— سارة أحمد</div>
              </div>
              <div className="bg-white p-6 rounded-3xl shadow-sm text-right border border-amber-900/5">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  "رائحة زكية وجودة عالية جداً والتوصيل كان سريع. بالتأكيد سأكرر التجربة."
                </p>
                <div className="font-bold text-xs text-gray-900">— منى الباقر</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* الفوتر النظيف والمنظم */}
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-500">
        <p>جميع الحقوق محفوظة © {new Date().getFullYear()} — صابون الجنة (Paradise Soap)</p>
      </footer>
    </div>
  );
}
