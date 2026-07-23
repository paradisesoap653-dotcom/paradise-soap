"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import WhatsAppIcon from "@/components/WhatsAppIcon";

interface Product {
  id: string | number;
  nameAr: string;
  nameEn?: string;
  priceSdg: number;
  descriptionAr?: string;
  descriptionEn?: string;
  sizeAr?: string;
  sizeEn?: string;
  images?: string[];
  image?: string;
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, locale, t } = useApp();
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0] || product.image || "/images/placeholder.jpg"
  );

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || "/images/placeholder.jpg"];

  // تم إصلاح الدالة هنا بدمج الكمية داخل كائن المنتج مباشرة
  const handleAddToCart = () => {
    addToCart({
      ...product,
      sizeAr: product.sizeAr || undefined,
      sizeEn: product.sizeEn || undefined,
      quantity: purchaseQuantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* صور المنتج */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
            <Image
              src={selectedImage}
              alt={product.nameAr}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img ? "border-amber-600 scale-105" : "border-gray-200 opacity-70"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {locale === "en" && product.nameEn ? product.nameEn : product.nameAr}
            </h1>
            {(product.sizeAr || product.sizeEn) && (
              <span className="inline-block bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full border border-amber-200">
                {locale === "en" && product.sizeEn ? product.sizeEn : product.sizeAr}
              </span>
            )}
          </div>

          <div className="text-2xl font-bold text-amber-700">
            {product.priceSdg.toLocaleString()} {t("currency")}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed border-t border-b py-4">
            {locale === "en" && product.descriptionEn
              ? product.descriptionEn
              : product.descriptionAr || "منتج طبيعي فاخر مصنوع بعناية فائقة."}
          </p>

          {/* تحديد الكمية والأزرار */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">الكمية:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setPurchaseQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg"
                >
                  -
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{purchaseQuantity}</span>
                <button
                  onClick={() => setPurchaseQuantity((q) => q + 1)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 text-center"
              >
                إضافة إلى السلة
              </button>

              <a
                href={`https://wa.me/249xxxxxxxxx?text=مرحباً،%20أود%20الاستفسار%20عن%20منتج:%20${encodeURIComponent(
                  product.nameAr
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>طلب عبر واتساب</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
