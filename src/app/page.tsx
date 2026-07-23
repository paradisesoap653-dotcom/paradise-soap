"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { products, addToCart } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-800 font-sans flex flex-col justify-between">
      <div>
        {/* الهيدر العلوي */}
        <Navbar />

        {/* 1. قسم الواجهة الرئيسي (Hero Section) */}
        <section className="relative bg-gradient-to-b from-[#5C6348] via-[#7A8261] to-[#FAF8F5] text-white pt-12 pb-20 px-4 text-center rounded-b-[2.5rem] shadow-sm">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="inline-block bg-white/20 backdrop-blur-md text-amber-50 text-xs px-4 py-1.5 rounded-full font-medium tracking-wide">
              ✨ 100% صناعة يدوية بمكونات طبيعية
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-sm leading-tight">
              Paradise Soap
            </h1>
            <p className="text-amber-100/90 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
              برا دايس سوب — منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href="#products"
                className="bg-white text-[#5C6348] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-amber-50 transition-all active:scale-95 text-sm"
              >
                تسوق الآن
              </a>
              <a
                href="#about"
                className="bg-white/10 backdrop-blur-md text-white font-medium px-6 py-3 rounded-full border border-white/30 hover:bg-white/20 transition-all text-sm"
              >
                تعرف علينا
              </a>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto pt-6 text-amber-100 text-xs">
              <div>
                <div className="font-bold text-base text-white">100%</div>
                <div>طبيعي</div>
              </div>
              <div>
                <div className="font-bold text-base text-white">+500</div>
                <div>عميل سعيد</div>
              </div>
              <div>
                <div className="font-bold text-base text-white">4.9★</div>
                <div>تقييم عام</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. قسم المميزات (Why Choose Us) */}
        <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/60 text-center">
              <div className="w-12 h-12 bg-[#F3F4ED] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                🌱
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">مكونات طبيعية 100%</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                خالية تماماً من المواد الكيميائية الضارة لضمان صحة ونضارة بشرتك.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/60 text-center">
              <div className="w-12 h-12 bg-[#F3F4ED] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                ✨
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">صناعة يدوية فاخرة</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                كل قطعة تُصنع بحب وعناية فائقة لتمنحك تجربة استخدام فريدة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100/60 text-center">
              <div className="w-12 h-12 bg-[#F3F4ED] rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                🚚
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">توصيل سريع وآمن</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                صلك طلبك حتى باب المنزل في أسرع وقت ممكن.
              </p>
            </div>
          </div>
        </section>

        {/* 3. قسم المنتجات (Products Section) */}
        <section id="products" className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">منتجاتنا المتميزة</h2>
            <p className="text-xs md:text-sm text-gray-500 max-w-md mx-auto">
              تصفح تشكيلتنا المختارة من الصابون ومستحضرات التجميل الطبيعية
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-amber-100/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 w-full bg-gray-100">
                      <Image
                        src={product.image || product.images?.[0] || "/images/placeholder.jpg"}
                        alt={product.nameAr}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900 text-base">{product.nameAr}</h3>
                        <span className="text-xs bg-amber-50 text-amber-800 font-medium px-2.5 py-1 rounded-full border border-amber-200">
                          {product.sizeAr || "عبوة خاصة"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                        {product.descriptionAr || "منتج طبيعي فاخر مصنوع بعناية فائقة لترطيب البشرة."}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-gray-50 mt-auto">
                    <div className="text-amber-900 font-bold text-lg">
                      {product.priceSdg?.toLocaleString()} <span className="text-xs font-normal">ج.س</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-xs text-gray-600 hover:text-amber-800 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                      >
                        التفاصيل
                      </Link>
                      <button
                        onClick={() => addToCart({ ...product, quantity: 1 })}
                        className="text-xs bg-[#5C6348] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#4a503a] transition active:scale-95"
                      >
                        إضافة للسلة
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 py-12">جاري تحميل المنتجات...</p>
            )}
          </div>
        </section>

        {/* 4. قسم الآراء والتقييمات (Testimonials) */}
        <section className="bg-[#F3F4ED] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">آراء عملائنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm text-right">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  "الصابون ممتاز جداً ونعومته واضحة على البشرة من أول استخدام. تسلم الأيادي!"
                </p>

                <div className="font-bold text-xs text-gray-800">- سارة أحمد</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm text-right">
                <div className="text-amber-500 mb-2">★★★★★</div>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  "رائحة زكية وجودة عالية جداً والتوصيل كان سريع. بالتأكيد سأكرر التجربة."
                </p>
                <div className="font-bold text-xs text-gray-800">- منى الباقر</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* الزر العائم للدعم الفني والفوتر */}
      <FloatingSupport />
      <Footer />
    </div>
  );
}
