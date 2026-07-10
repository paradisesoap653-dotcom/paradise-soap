"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { ShoppingCart, Star, Sparkles } from "lucide-react";

type ProductType = {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  priceSdg: number;
  originalPriceSdg: number | null;
  category: string;
  images: string[];
  rating: number | null;
  stock: number;
  scentAr: string | null;
  scentEn: string | null;
  sizeAr: string | null;
  sizeEn: string | null;
  isFeatured: boolean;
};

export default function ProductCard({ product }: { product: ProductType }) {
  const { locale, addToCart, t } = useApp();

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const scent = locale === "ar" ? product.scentAr : product.scentEn;
  const size = locale === "ar" ? product.sizeAr : product.sizeEn;

  // Calculate discount percentage
  const discountPercent =
    product.originalPriceSdg && product.originalPriceSdg > product.priceSdg
      ? Math.round(
          ((product.originalPriceSdg - product.priceSdg) / product.originalPriceSdg) * 100
        )
      : 0;

  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to detail page when clicking CTA
    if (isOutOfStock) return;
    addToCart({
      productId: product.id,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      priceSdg: product.priceSdg,
      image: product.images[0],
      scentAr: product.scentAr || undefined,
      scentEn: product.scentEn || undefined,
      sizeAr: product.sizeAr || undefined,
      sizeEn: product.sizeEn || undefined,
    });
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-emerald-50 hover:border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3 inset-x-3 flex justify-between items-start z-10">
        {/* Discount Badge */}
        {discountPercent > 0 ? (
          <span className="bg-amber-500 text-white font-extrabold text-[10px] md:text-xs px-2.5 py-1 rounded-full shadow-sm animate-pulse">
            {locale === "ar" ? `خصم ${discountPercent}%` : `-${discountPercent}%`}
          </span>
        ) : (
          <span />
        )}

        {/* Featured Badge */}
        {product.isFeatured && (
          <span className="bg-emerald-800 text-white font-semibold text-[9px] md:text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Sparkles className="h-3 w-3 text-amber-300 animate-spin-slow" />
            <span>{locale === "ar" ? "مميز" : "Featured"}</span>
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50 shrink-0">
        <img
          src={product.images[0] || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-600 text-white font-extrabold text-xs md:text-sm px-4 py-2 rounded-xl shadow-md uppercase tracking-wider">
              {t("outOfStock")}
            </span>
          </div>
        )}
      </div>

      {/* Details container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-1.5">
          {/* Scent & Size Badges */}
          {(scent || size) && (
            <div className="flex flex-wrap gap-1.5 text-[10px] text-gray-500">
              {size && (
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium">
                  {size}
                </span>
              )}
              {scent && (
                <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium truncate max-w-[120px]">
                  🌻 {scent}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-800 transition-colors leading-tight min-h-[2.5rem]">
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.round(product.rating || 5) ? "fill-amber-400 text-amber-400" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-gray-500 mt-0.5">
              ({product.rating || "5.0"})
            </span>
          </div>
        </div>

        {/* Pricing and Action */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <div className="flex flex-col">
            {/* Sale Price */}
            <span className="text-base md:text-lg font-black text-emerald-950">
              {product.priceSdg.toLocaleString()} <span className="text-[10px] md:text-xs font-normal text-gray-500">{t("sdg")}</span>
            </span>
            {/* Original Price */}
            {product.originalPriceSdg && product.originalPriceSdg > product.priceSdg && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPriceSdg.toLocaleString()} {t("sdg")}
              </span>
            )}
          </div>

          {/* Quick Add CTA */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`p-2.5 md:px-3 md:py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white"
            }`}
            title={t("addToCartBtn")}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden md:inline text-xs font-bold">{t("addToCartBtn")}</span>
          </button>
        </div>

      </div>
    </Link>
  );
}
