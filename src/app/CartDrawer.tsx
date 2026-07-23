"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Phone, ExternalLink } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const ATBARA_DISTRICTS = [
  { ar: "الداخلة", en: "Al-Dakhla" },
  { ar: "السودنة", en: "Al-Sudana" },
  { ar: "الحصايا", en: "Al-Hassaya" },
  { ar: "المطار / حي المطار", en: "Al-Matar District" },
  { ar: "خليوة", en: "Khaleewa" },
  { ar: "السيالة", en: "Al-Sayala" },
  { ar: "ام بكول", en: "Um Bakol" },
  { ar: "الخريج", en: "Al-Khureij" },
  { ar: "وسط المدينة / السوق", en: "Downtown / Atbara Market" },
  { ar: "حي العشير", en: "Al-Asheer District" },
  { ar: "حي الدرجة", en: "Al-Daraja District" },
  { ar: "حي الفكيكة", en: "Al-Fikaika District" },
  { ar: "حي النخيل", en: "Al-Nakheel District" },
  { ar: "حي مساكن الشعبية", en: "Al-Sha'biya" },
  { ar: "حي الريان", en: "Al-Rayyan District" },
  { ar: "قرى ومناطق حول عطبرة", en: "Atbara Suburbs / Surrounding Villages" },
];

export default function CartDrawer() {
  const {
    locale,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    t,
  } = useApp();

  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    districtIndex: "", // Index of ATBARA_DISTRICTS
    addressDetails: "",
    paymentMethod: "cash", // 'cash' or 'bankak'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.customerName.trim()) {
      errors.customerName = locale === "ar" ? "الاسم مطلوب" : "Name is required";
    }
    if (!formData.customerPhone.trim()) {
      errors.customerPhone = locale === "ar" ? "رقم الهاتف والواتساب مطلوب" : "Phone number is required";
    } else if (formData.customerPhone.trim().length < 9) {
      errors.customerPhone = locale === "ar" ? "رقم الهاتف غير صالح" : "Invalid phone number";
    }
    if (!formData.districtIndex) {
      errors.districtIndex = locale === "ar" ? "يرجى اختيار الحي السكني" : "Please select your neighborhood";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const selectedDistrict = ATBARA_DISTRICTS[parseInt(formData.districtIndex)];

    const orderPayload = {
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail || null,
      districtAr: selectedDistrict.ar,
      districtEn: selectedDistrict.en,
      addressDetails: formData.addressDetails,
      paymentMethod: formData.paymentMethod,
      totalAmount: cartTotal,
      items: cart.map((item) => ({
        productId: item.productId,
        nameAr: item.nameAr,
        nameEn: item.nameEn,
        priceSdg: item.priceSdg,
        quantity: item.quantity,
        image: item.image,
        sizeAr: item.sizeAr,
        sizeEn: item.sizeEn,
      })),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderSuccess(result.order);
        clearCart();
      } else {
        alert(locale === "ar" ? "حدث خطأ أثناء تقديم الطلب. يرجى المحاولة لاحقاً." : "Error placing order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert(locale === "ar" ? "فشل الاتصال بالخادم." : "Server connection failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate WhatsApp Order Link for immediate confirmation
  const getWhatsAppLink = (order: any) => {
    const selectedDistrict = locale === "ar" ? order.districtAr : order.districtEn;
    const paymentText = order.paymentMethod === "bankak" 
      ? (locale === "ar" ? "تحويل بنكك 💳" : "Bankak Transfer 💳")
      : (locale === "ar" ? "كاش عند الاستلام 💵" : "Cash on Delivery 💵");

    let itemsText = order.items.map((it: any) => {
      const name = locale === "ar" ? it.nameAr : it.nameEn;
      const size = it.sizeAr ? ` (${locale === "ar" ? it.sizeAr : it.sizeEn})` : "";
      return `- ${name}${size} × ${it.quantity} (${it.priceSdg.toLocaleString()} ج.س)`;
    }).join("\n");

    const text = locale === "ar" 
      ? `مرحباً برادايس للصابون ومستحضرات التجميل 🌿\nلقد قمت بتقديم طلب جديد عبر موقعكم الإلكتروني:\n\n*رقم الطلب:* #${order.id}\n*اسم العميل:* ${order.customerName}\n*الهاتف والواتساب:* ${order.customerPhone}\n*الحي السكني:* ${selectedDistrict}\n*العنوان بالتفصيل:* ${order.addressDetails || 'عطبرة'}\n*طريقة الدفع:* ${paymentText}\n\n*المنتجات المطلوبة:*\n${itemsText}\n\n*المجموع الكلي:* ${order.totalAmount.toLocaleString()} جنيه سوداني\n\nيرجى تأكيد وتجهيز الطلب للتوصيل الفوري 🚀`
      : `Hello Paradise Soap & Cosmetics 🌿\nI have placed a new order on your website:\n\n*Order ID:* #${order.id}\n*Customer Name:* ${order.customerName}\n*Phone/WhatsApp:* ${order.customerPhone}\n*Neighborhood:* ${selectedDistrict}\n*Address Details:* ${order.addressDetails || 'Atbara'}\n*Payment Method:* ${paymentText}\n\n*Ordered Items:*\n${itemsText}\n\n*Total Amount:* ${order.totalAmount.toLocaleString()} SDG\n\nPlease confirm and prepare my order for express delivery 🚀`;

    return `https://wa.me/249913009060?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!orderSuccess) {
            setIsCartOpen(false);
            setIsCheckoutMode(false);
          }
        }}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white flex flex-col shadow-2xl h-full animate-slide-in">
          
          {/* Header */}
          <div className="px-4 py-5 bg-gradient-to-r from-emerald-900 to-teal-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-amber-300" />
              <h2 className="text-lg font-bold">
                {orderSuccess
                  ? t("orderSuccessTitle")
                  : isCheckoutMode
                  ? t("checkoutTitle")
                  : t("cartTitle")}
              </h2>
            </div>
            {!orderSuccess && (
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutMode(false);
                }}
                className="p-1 text-teal-100 hover:text-white hover:bg-emerald-800 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {orderSuccess ? (
              /* Success Screen */
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-6">
                <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">
                    {locale === "ar" ? "تهانينا! تم تأكيد طلبك" : "Congratulations! Order Confirmed"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("orderSuccessDesc")
                      .replace("{id}", orderSuccess.id.toString())
                      .replace("{district}", locale === "ar" ? orderSuccess.districtAr : orderSuccess.districtEn)}
                  </p>
                </div>

                {/* Bankak Details Box */}
                {orderSuccess.paymentMethod === "bankak" && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-right text-xs text-amber-900 space-y-2.5">
                    <p className="font-bold text-sm border-b border-amber-200 pb-1 flex items-center justify-between">
                      <span>💳 تطبيق بنكك (بنك الخرطوم)</span>
                      <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded text-amber-800 font-normal">خطوة تفعيل</span>
                    </p>
                    <p className="leading-relaxed">
                      {t("bankakInstructions")}
                    </p>
                    <div className="bg-white p-2 rounded border border-amber-100 flex items-center justify-between font-mono text-sm">
                      <span className="font-bold">3154826</span>
                      <span className="text-gray-400 text-xs">{locale === "ar" ? "رقم الحساب" : "Account No."}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium">
                      {locale === "ar" ? "يمكنك إرسال إشعار التحويل لأي من الرقمين: 0913009060 أو 0114537190" : "You can send the transfer receipt to either number: 0913009060 or 0114537190"}
                    </div>
                  </div>
                )}

                {/* Total Invoice */}
                <div className="w-full bg-gray-50 rounded-xl p-4 text-sm border border-gray-100 space-y-2">
                  <div className="flex justify-between font-bold text-gray-900 border-b border-gray-200 pb-2">
                    <span>{locale === "ar" ? "الفاتورة الإجمالية:" : "Total Invoice:"}</span>
                    <span className="text-emerald-700">{orderSuccess.totalAmount.toLocaleString()} {t("sdg")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{locale === "ar" ? "طريقة الدفع:" : "Payment Method:"}</span>
                    <span className="font-medium text-gray-700">
                      {orderSuccess.paymentMethod === "bankak" ? t("payBankak") : t("payCash")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{locale === "ar" ? "رقم هاتف المستلم:" : "Receiver Phone:"}</span>
                    <span className="font-medium text-gray-700">{orderSuccess.customerPhone}</span>
                  </div>
                </div>

                {/* Direct WhatsApp Action Button */}
                <div className="w-full space-y-3 pt-4">
                  <a
                    href={getWhatsAppLink(orderSuccess)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-4 rounded-xl font-bold text-sm shadow-md shadow-green-100 transition-all transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="h-5 w-5 text-white" title="WhatsApp" />
                    <span>{locale === "ar" ? "أرسل الطلب فوراً لواتساب المبيعات 🟢" : "Send Order via WhatsApp Now 🟢"}</span>
                  </a>
                  <p className="text-[11px] text-gray-400">
                    {t("bankakUrgentNote")}
                  </p>
                </div>

                {/* Back to shop */}
                <button
                  onClick={() => {
                    setOrderSuccess(null);
                    setIsCartOpen(false);
                    setIsCheckoutMode(false);
                  }}
                  className="text-sm font-semibold text-emerald-800 hover:text-emerald-900 underline pt-2"
                >
                  {t("backToHome")}
                </button>
              </div>
            ) : isCheckoutMode ? (
              /* Checkout Form View */
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                
                {/* Back Link */}
                <button
                  type="button"
                  onClick={() => setIsCheckoutMode(false)}
                  className="flex items-center gap-1.5 text-xs text-emerald-800 hover:text-emerald-950 font-bold mb-2 cursor-pointer"
                >
                  {locale === "ar" ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                  <span>{locale === "ar" ? "الرجوع لتعديل السلة" : "Back to Edit Cart"}</span>
                </button>

                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">
                  {locale === "ar" ? "✍️ الرجاء تعبئة بيانات التوصيل بدقة:" : "✍️ Please provide shipping details:"}
                </h3>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    {t("fullName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder={locale === "ar" ? "مثال: عمر البشير عوض" : "e.g., Omer El-Bashir Awad"}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors ${
                      formErrors.customerName ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                    }`}
                  />
                  {formErrors.customerName && <p className="text-[11px] text-red-500">{formErrors.customerName}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    {t("phone")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    placeholder={t("phonePlaceholder")}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors text-left ${
                      formErrors.customerPhone ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                    }`}
                  />
                  {formErrors.customerPhone && <p className="text-[11px] text-red-500">{formErrors.customerPhone}</p>}
                </div>

                {/* Email (Optional) */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="example@mail.com"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* District Selection */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    {t("district")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="districtIndex"
                    value={formData.districtIndex}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors cursor-pointer ${
                      formErrors.districtIndex ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                    }`}
                  >
                    <option value="">{t("selectDistrict")}</option>
                    {ATBARA_DISTRICTS.map((dist, idx) => (
                      <option key={idx} value={idx}>
                        {locale === "ar" ? dist.ar : dist.en}
                      </option>
                    ))}
                  </select>
                  {formErrors.districtIndex && <p className="text-[11px] text-red-500">{formErrors.districtIndex}</p>}
                </div>

                {/* Detailed Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700">
                    {t("addressDetailsLabel")}
                  </label>
                  <textarea
                    name="addressDetails"
                    rows={2}
                    value={formData.addressDetails}
                    onChange={handleInputChange}
                    placeholder={t("addressDetailsPlaceholder")}
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700">
                    {t("paymentMethodLabel")}
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    
                    {/* Cash Option */}
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "cash" 
                        ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold" 
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex flex-col text-right rtl:text-right ltr:text-left">
                        <span className="text-xs sm:text-sm">{t("payCash")}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{locale === "ar" ? "ادفع نقداً عند استلام طلبك أمام باب بيتك" : "Pay in cash when goods are delivered at your doorstep"}</span>
                      </div>
                    </label>

                    {/* Bankak Option */}
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.paymentMethod === "bankak" 
                        ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 font-bold" 
                        : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bankak"
                        checked={formData.paymentMethod === "bankak"}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex flex-col text-right rtl:text-right ltr:text-left">
                        <span className="text-xs sm:text-sm">{t("payBankak")}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{locale === "ar" ? "تحويل آمن وبسيط عبر بنك الخرطوم" : "Secure payment via Bank of Khartoum mobile app"}</span>
                      </div>
                    </label>

                  </div>
                </div>

                {/* Bankak static instructions notice during checkout */}
                {formData.paymentMethod === "bankak" && (
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
                    <p className="font-bold mb-1">🏦 {locale === "ar" ? "معلومات تحويل بنكك الحالية:" : "Current Bankak Transfer info:"}</p>
                    <p>{t("bankakInstructions")}</p>
                  </div>
                )}

                {/* Subtotal summary */}
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>{t("subtotal")}</span>
                    <span>{cartTotal.toLocaleString()} {t("sdg")}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t("deliveryCharges")}</span>
                    <span className="text-emerald-700 font-medium">{t("free")}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-gray-900 border-t border-gray-200 pt-2">
                    <span>{locale === "ar" ? "الإجمالي الكلي:" : "Total Amount:"}</span>
                    <span className="text-emerald-800">{cartTotal.toLocaleString()} {t("sdg")}</span>
                  </div>
                </div>

                {/* Form Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("orderProcessing") : t("placeOrderBtn")}
                </button>

              </form>
            ) : cart.length === 0 ? (
              /* Empty Cart View */
              <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{t("emptyCart")}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {locale === "ar" ? "تصفح معارضنا الممتازة وأضف صابونك المفضل للسلة" : "Browse our collections and select your preferred items."}
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {t("continueShopping")}
                </button>
              </div>
            ) : (
              /* Cart Items List View */
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-gray-500 border-b border-gray-100 pb-2">
                  <span>{locale === "ar" ? `لديك ${cart.length} أصناف في السلة` : `You have ${cart.length} types of soap`}</span>
                  <button onClick={clearCart} className="text-amber-700 hover:text-red-700 font-semibold flex items-center gap-1">
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>{locale === "ar" ? "تفريغ السلة" : "Empty Cart"}</span>
                  </button>
                </div>

                {/* Items loop */}
                <div className="divide-y divide-gray-100 max-h-[50vh] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.productId} className="py-3 flex gap-3.5">
                      <img
                        src={item.image}
                        alt={locale === "ar" ? item.nameAr : item.nameEn}
                        className="h-16 w-16 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                            {locale === "ar" ? item.nameAr : item.nameEn}
                          </h4>
                          {/* Scent & Size badges */}
                          {(item.sizeAr || item.scentAr) && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.sizeAr && (
                                <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                  {locale === "ar" ? item.sizeAr : item.sizeEn}
                                </span>
                              )}
                              {item.scentAr && (
                                <span className="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                                  🌻 {locale === "ar" ? item.scentAr : item.scentEn}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs sm:text-sm font-bold text-emerald-800">
                            {(item.priceSdg * item.quantity).toLocaleString()} {t("sdg")}
                          </span>
                          
                          {/* Counter */}
                          <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-1 hover:bg-white rounded text-gray-500 hover:text-emerald-800 transition-colors"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-xs font-bold text-gray-800 px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-1 hover:bg-white rounded text-gray-500 hover:text-emerald-800 transition-colors"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-300 hover:text-red-500 transition-colors self-center p-1"
                        title={locale === "ar" ? "حذف" : "Remove"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Total Summary & Checkout Button */}
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 font-medium">{t("subtotal")}:</span>
                    <span className="text-lg font-extrabold text-emerald-950">{cartTotal.toLocaleString()} {t("sdg")}</span>
                  </div>
                  
                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{locale === "ar" ? "توصيل عالي الجودة:" : "Care Delivery:"}</span>{" "}
                      <span>{locale === "ar" ? "مندوبينا مجهزون بمبردات للحفاظ على سلامة الصابون ومستحضرات التجميل من حرارة شمس عطبرة." : "Our dispatch team uses proper shading to guarantee the cosmetics reach you cool and pristine."}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutMode(true)}
                    className="w-full bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-emerald-950/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t("checkoutBtn")}</span>
                    {locale === "ar" ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </button>

                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors py-1 cursor-pointer"
                  >
                    {t("continueShopping")}
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
