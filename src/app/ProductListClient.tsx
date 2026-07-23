"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal, Sparkles, AlertCircle, ShoppingBag } from "lucide-react";

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

export default function ProductListClient({ products }: { products: ProductType[] }) {
  const { locale, t } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("default");
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  // Available categories with metadata
  const categories = [
    { id: "all", labelAr: "كل المعروضات", labelEn: "All Products" },
    { id: "liquid", labelAr: "صابون سائل", labelEn: "Liquid Soaps" },
    { id: "solid", labelAr: "صابون صلب", labelEn: "Solid Soaps" },
    { id: "paste", labelAr: "معجون صابون", labelEn: "Cleaning Pastes" },
    { id: "gel", labelAr: "جل منظف", labelEn: "Gel Cleansers" },
    { id: "cosmetics", labelAr: "أدوات التجميل", labelEn: "Cosmetics & Beauty" },
  ];

  // Dynamic products filtering logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category Filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false;
        }

        // Price Filter
        if (p.priceSdg > maxPrice) {
          return false;
        }

        // Text Search (searches name, description, scents, size in both locales)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchNameAr = p.nameAr.toLowerCase().includes(query);
          const matchNameEn = p.nameEn.toLowerCase().includes(query);
          const matchDescAr = p.descriptionAr.toLowerCase().includes(query);
          const matchDescEn = p.descriptionEn.toLowerCase().includes(query);
          const matchScentAr = p.scentAr?.toLowerCase().includes(query);
          const matchScentEn = p.scentEn?.toLowerCase().includes(query);
          
          if (!matchNameAr && !matchNameEn && !matchDescAr && !matchDescEn && !matchScentAr && !matchScentEn) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting
        if (sortBy === "price-asc") {
          return a.priceSdg - b.priceSdg;
        }
        if (sortBy === "price-desc") {
          return b.priceSdg - a.priceSdg;
        }
        if (sortBy === "rating") {
          return (b.rating || 5) - (a.rating || 5);
        }
        // Default: featured first, then newest
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.id - a.id;
      });
  }, [products, selectedCategory, searchQuery, sortBy, maxPrice]);

  return (
    <section id="products-section" className="py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
            <Sparkles className="h-3 w-3 text-amber-500 animate-spin-slow" />
            <span>{locale === "ar" ? "معرض برادايس المميز" : "The Paradise Showcase"}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 font-serif leading-tight">
            {locale === "ar" ? "استكشف منتجاتنا الطبيعية والطبية" : "Explore Our Natural & Medicated Products"}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            {locale === "ar"
              ? "ننتج أجود صابون محلي سائل وصلب وجل ومعجون ومستحضرات تجميل لتغطية كافة استخدامات النظافة والتعقيم والعناية بالبشرة بجودة متقنة."
              : "We formulate fine liquid, solid, gel, and paste soaps, and cosmetics to satisfy all your hygiene, purification, and skin moisturizing requirements."}
          </p>
        </div>

        {/* Filters and Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-emerald-50 p-4 sm:p-6 mb-8 space-y-4">
          
          {/* Search and Sort row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute right-3.5 top-3 h-4 w-4 text-gray-400 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm py-2.5 px-10 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Sorting Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full text-sm py-2.5 px-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
              >
                <option value="default">{t("sortBy")}: {t("defaultSort")}</option>
                <option value="price-asc">{t("priceLowHigh")}</option>
                <option value="price-desc">{t("priceHighLow")}</option>
                <option value="rating">{t("ratingSort")}</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div className="md:col-span-3 flex flex-col gap-1 px-1">
              <div className="flex justify-between text-xs text-gray-500">
                <span>{locale === "ar" ? "الحد الأقصى للسعر:" : "Max Price:"}</span>
                <span className="font-bold text-emerald-800">{maxPrice.toLocaleString()} {t("sdg")}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
            </div>

          </div>

          {/* Categories Pill Slider */}
          <div className="border-t border-gray-100 pt-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-bold text-gray-400 mr-2 flex items-center gap-1">
                <SlidersHorizontal className="h-3 w-3" />
                <span>{locale === "ar" ? "تصفية حسب القسم:" : "Categories:"}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
                        isActive
                          ? "bg-emerald-800 text-white shadow-sm shadow-emerald-900/10"
                          : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-900"
                      }`}
                    >
                      {locale === "ar" ? cat.labelAr : cat.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs sm:text-sm text-gray-500">
          <div>
            {locale === "ar" ? (
              <span>تم العثور على <strong className="text-emerald-800">{filteredProducts.length}</strong> منتج</span>
            ) : (
              <span>Found <strong className="text-emerald-800">{filteredProducts.length}</strong> premium products</span>
            )}
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-amber-700 font-bold hover:underline"
            >
              {locale === "ar" ? "مسح البحث" : "Clear Search"}
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="animate-fade-in">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search Result State */
          <div className="bg-white rounded-3xl p-12 text-center max-w-xl mx-auto border border-emerald-50 shadow-sm space-y-4">
            <div className="h-16 w-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {locale === "ar" ? "عذراً، لم نجد نتائج مطابقة" : "No matching soaps found"}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {locale === "ar"
                  ? "جرب كتابة كلمات مختلفة، أو تعديل نطاق تصفية السعر أو فئات الصابون."
                  : "Try typing different keywords, adjusting the price filter, or selecting another soap category."}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setMaxPrice(20000);
              }}
              className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              {locale === "ar" ? "عرض جميع المنتجات" : "View All Products"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
