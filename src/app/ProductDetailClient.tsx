"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Star, ShoppingCart, Truck, ShieldCheck, Landmark, MessageSquare, ArrowLeft, ArrowRight, User, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";
import WhatsAppIcon from "@/components/WhatsAppIcon";

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

type ReviewType = {
  id: number;
  productId: number;
  reviewerNameAr: string;
  reviewerNameEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  createdAt: Date;
};

export default function ProductDetailClient({
  product,
  initialReviews,
}: {
  product: ProductType;
  initialReviews: ReviewType[];
}) {
  const { locale, addToCart, t } = useApp();
  
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [reviewsList, setReviewsList] = useState<ReviewType[]>(initialReviews);

  // Review Form States
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const name = locale === "ar" ? product.nameAr : product.nameEn;
  const description = locale === "ar" ? product.descriptionAr : product.descriptionEn;
  const scent = locale === "ar" ? product.scentAr : product.scentEn;
  const size = locale === "ar" ? product.sizeAr : product.sizeEn;

  const isOutOfStock = product.stock <= 0;

  // Calculate discount percentage
  const discountPercent =
    product.originalPriceSdg && product.originalPriceSdg > product.priceSdg
      ? Math.round(
          ((product.originalPriceSdg - product.priceSdg) / product.originalPriceSdg) * 100
        )
      : 0;

  const handleAddToCart = () => {
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
    }, purchaseQuantity);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !comment.trim()) {
      alert(locale === "ar" ? "الرجاء تعبئة جميع حقول التقييم" : "Please fill out all review fields");
      return;
    }

    setIsSubmittingReview(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          reviewerName,
          rating,
          comment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        
        // Prepend the new review to the list locally
        const newReviewObj: ReviewType = {
          id: data.review.id || Date.now(),
          productId: product.id,
          reviewerNameAr: reviewerName,
          reviewerNameEn: reviewerName,
          rating: rating,
          commentAr: comment,
          commentEn: comment,
          createdAt: new Date(),
        };

        setReviewsList((prev) => [newReviewObj, ...prev]);
        setReviewerName("");
        setComment("");
        setRating(5);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        alert(locale === "ar" ? "فشل إرسال التقييم. حاول مرة أخرى." : "Failed to submit review. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert(locale === "ar" ? "فشل الاتصال بالخادم." : "Could not connect to server.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back to Products Link */}
      <div className="mb-6">
        <Link
          href="/#products-section"
          className="inline-flex items-center gap-1.5 text-sm text-emerald-800 hover:text-emerald-950 font-bold transition-all"
        >
          {locale === "ar" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
          <span>{locale === "ar" ? "الرجوع لكافة صابون برادايس" : "Back to All Products"}</span>
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-4 sm:p-8 border border-emerald-50 shadow-sm mb-16">
        
        {/* Left Side: Photo Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Active Big Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
            <img
              src={product.images[activeImageIdx] || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600"}
              alt={name}
              className="object-cover w-full h-full"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md animate-pulse">
                {locale === "ar" ? `خصم ${discountPercent}%` : `-${discountPercent}%`}
              </span>
            )}
            {isOutOfStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="bg-red-600 text-white font-black text-sm px-6 py-2.5 rounded-xl uppercase tracking-wider">
                  {t("outOfStock")}
                </span>
              </div>
            )}
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative h-16 w-16 rounded-xl overflow-hidden bg-gray-50 border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIdx === idx ? "border-emerald-700 shadow-sm" : "border-gray-200 hover:border-emerald-300"
                  }`}
                >
                  <img src={img} alt={`thumbnail-${idx}`} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details info Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            {/* Category / Badge */}
            <div className="flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase">
                {t(product.category)}
              </span>
              <span className={`text-xs font-bold ${isOutOfStock ? "text-red-500" : "text-emerald-700"}`}>
                ● {isOutOfStock ? t("outOfStock") : `${t("inStock")} (${product.stock} قطع)`}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-3xl font-extrabold text-gray-900 font-serif leading-tight">
              {name}
            </h1>

            {/* Rating Stars Summary */}
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4.5 w-4.5 ${
                      i < Math.round(product.rating || 5) ? "fill-amber-400 text-amber-400" : "text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-500 mt-1">
                {product.rating || "5.0"} {locale === "ar" ? "من 5 تقييمات" : "out of 5 rating"} ({reviewsList.length} {locale === "ar" ? "تقييمات" : "reviews"})
              </span>
            </div>

            {/* Divider */}
            <hr className="border-gray-100" />

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-4xl font-black text-emerald-950">
                {product.priceSdg.toLocaleString()} <span className="text-sm font-normal text-gray-500">{t("sdg")}</span>
              </span>
              {product.originalPriceSdg && product.originalPriceSdg > product.priceSdg && (
                <span className="text-base text-gray-400 line-through font-medium">
                  {product.originalPriceSdg.toLocaleString()} {t("sdg")}
                </span>
              )}
            </div>

            {/* Short Rich Description */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed pt-2">
              {description}
            </p>

            {/* Specifications Box */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-xs sm:text-sm space-y-2.5">
              <p className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1">
                {locale === "ar" ? "🔍 مواصفات منتج برادايس:" : "🔍 Paradise Product Specs:"}
              </p>
              {scent && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("scent")}</span>
                  <span className="font-bold text-gray-800">{scent}</span>
                </div>
              )}
              {size && (
                <div className="flex justify-between">
                  <span className="text-gray-500">{t("size")}</span>
                  <span className="font-bold text-gray-800">{size}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-500">{locale === "ar" ? "مكان الإنتاج والتركيب:" : "Production Location:"}</span>
                <span className="font-bold text-gray-800">{locale === "ar" ? "عطبرة، السودان 🇸🇩" : "Atbara, Sudan 🇸🇩"}</span>
              </div>
            </div>
          </div>

          {/* Add to Cart Controls */}
          <div className="pt-6 border-t border-gray-100 space-y-4">
            
            {!isOutOfStock && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-500">{locale === "ar" ? "الكمية المطلوبة:" : "Quantity:"}</span>
                <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                  <button
                    onClick={() => setPurchaseQuantity(Math.max(1, purchaseQuantity - 1))}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-600"
                    disabled={purchaseQuantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-gray-800 px-3 min-w-[2rem] text-center">
                    {purchaseQuantity}
                  </span>
                  <button
                    onClick={() => setPurchaseQuantity(Math.min(product.stock, purchaseQuantity + 1))}
                    className="p-1.5 hover:bg-white rounded-lg transition-colors text-gray-600"
                    disabled={purchaseQuantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 flex items-center justify-center gap-2 text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all cursor-pointer ${
                    isOutOfStock
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200"
                      : "bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 shadow-emerald-950/10"
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t("addToCartBtn")}</span>
                </button>

                <a
                  href={`https://wa.me/249913009060?text=${encodeURIComponent(
                    locale === "ar"
                      ? `مرحباً، أود السؤال وشراء منتج: *${product.nameAr}* (${size || ""}) من موقع برادايس للصابون بعطبرة. يرجى تزويدي بالمعلومات والتوفر.`
                      : `Hello, I'd like to ask and purchase the product: *${product.nameEn}* (${size || ""}) from your website. Please assist me.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#25D366] bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-6 rounded-xl transition-all"
                >
                  <WhatsAppIcon className="h-5 w-5 text-white" title="WhatsApp" />
                  <span>{locale === "ar" ? "طلب عبر واتساب 1 (0913009060)" : "Order via WhatsApp 1"}</span>
                </a>
              </div>

              {/* Secondary WhatsApp option for full availability */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/249114537190?text=${encodeURIComponent(
                    locale === "ar"
                      ? `مرحباً، أود السؤال عن منتج: *${product.nameAr}* من موقع برادايس للصابون بعطبرة وتأكيد التوفر للتوصيل.`
                      : `Hello, I'd like to check product: *${product.nameEn}* on your website.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-teal-600 text-teal-800 hover:bg-teal-50 font-bold py-3.5 px-6 rounded-xl transition-all text-xs sm:text-sm"
                >
                  <WhatsAppIcon className="h-4 w-4" title="WhatsApp" />
                  <span>{locale === "ar" ? "طلب عبر واتساب 2 (0114537190)" : "Order via WhatsApp 2"}</span>
                </a>
              </div>
            </div>

            {/* Local Trust Badges inside Product Detail */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-400 pt-2 border-t border-gray-50 text-center">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50">
                <Truck className="h-4.5 w-4.5 text-emerald-800" />
                <span>{locale === "ar" ? "توصيل لعطبرة" : "Atbara Shipping"}</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-800" />
                <span>{locale === "ar" ? "فحص آمن للبشرة" : "100% Skin-Safe"}</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50">
                <Landmark className="h-4.5 w-4.5 text-emerald-800" />
                <span>{locale === "ar" ? "تحويل بنكك متاح" : "Bankak OK"}</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* REVIEWS & USER FEEDBACK SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Reviews List */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <MessageSquare className="h-5 w-5 text-emerald-800" />
            <h2 className="text-xl font-extrabold text-gray-950 font-serif">
              {t("reviews")} ({reviewsList.length})
            </h2>
          </div>

          {reviewsList.length > 0 ? (
            <div className="space-y-4">
              {reviewsList.map((review) => {
                const rName = locale === "ar" ? review.reviewerNameAr : review.reviewerNameEn;
                const rComment = locale === "ar" ? review.commentAr : review.commentEn;
                return (
                  <div key={review.id} className="bg-white p-5 rounded-2xl border border-emerald-50/50 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-extrabold text-gray-800">
                            {rName}
                          </h4>
                          <div className="flex text-amber-400 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1 font-mono">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(review.createdAt).toLocaleDateString(locale === "ar" ? "ar-SD" : "en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed rtl:text-right ltr:text-left pr-2">
                      {rComment}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-8 text-center rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
              {t("noReviews")}
            </div>
          )}
        </div>

        {/* Submit Review Form */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm sticky top-24 space-y-4">
            <div className="flex items-center gap-1.5 border-b border-gray-100 pb-3">
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin-slow" />
              <h3 className="text-base font-extrabold text-gray-900 font-serif">
                {t("writeReview")}
              </h3>
            </div>

            {submitSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs leading-relaxed font-bold">
                ✓ {t("reviewSuccess")}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-right rtl:text-right ltr:text-left">
              
              {/* Reviewer Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  {t("yourName")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder={locale === "ar" ? "مثال: هبة محمود (عطبرة)" : "e.g., Heba Mahmoud (Atbara)"}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Rating Star input Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  {t("yourRating")} <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-500">({rating} / 5)</span>
                </div>
              </div>

              {/* Comment text */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  {t("yourComment")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={locale === "ar" ? "اكتب رأيك هنا بكل صدق وأمانة..." : "Share your honest experience..."}
                  className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-900/10 cursor-pointer disabled:opacity-50"
              >
                {isSubmittingReview ? t("submitting") : t("submitReview")}
              </button>

            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
