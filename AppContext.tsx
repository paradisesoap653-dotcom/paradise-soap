"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  productId: number;
  nameAr: string;
  nameEn: string;
  priceSdg: number;
  quantity: number;
  image: string;
  scentAr?: string;
  scentEn?: string;
  sizeAr?: string;
  sizeEn?: string;
};

type AppContextType = {
  locale: "ar" | "en";
  setLocale: (lang: "ar" | "en") => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  t: (key: string) => string;
};

const translations: Record<string, { ar: string; en: string }> = {
  // Navigation & Branding
  brandName: { ar: "برادايس للصابون", en: "Paradise Soap" },
  brandSubtitle: { ar: "لإنتاج وبيع جميع أنواع الصابون السائل، الصلب، المعجون، الجل وأدوات التجميل", en: "Production & Sale of Liquid, Solid, Paste, Gel Soaps & Cosmetics" },
  brandTarget: { ar: "عطبرة والولايات المجاورة", en: "Serving Atbara and Surrounding Areas" },
  home: { ar: "الرئيسية", en: "Home" },
  products: { ar: "المنتجات", en: "Products" },
  categories: { ar: "الأقسام", en: "Categories" },
  aboutUs: { ar: "من نحن", en: "About Us" },
  contact: { ar: "اتصل بنا", en: "Contact" },
  cart: { ar: "السلة", en: "Cart" },
  
  // Categories
  all: { ar: "الكل", en: "All" },
  liquid: { ar: "صابون سائل", en: "Liquid Soap" },
  solid: { ar: "صابون صلب", en: "Solid Soap" },
  paste: { ar: "معجون صابون", en: "Soap Paste" },
  gel: { ar: "جل منظف", en: "Cleaning Gel" },
  cosmetics: { ar: "أدوات التجميل", en: "Cosmetics & Beauty" },

  // Hero Section
  heroTitle: { ar: "عناية فائقة ونظافة تدوم.. من قلب عطبرة", en: "Premium Care & Lasting Freshness.. From Atbara" },
  heroDesc: { ar: "نقدم لكم في مصانع برادايس أجود أنواع الصابون الطبيعي المعالج، المعاجين عالية الفعالية، ومستحضرات التجميل الفاخرة المصنوعة بأعلى معايير الجودة خصيصاً لأهل عطبرة الكرام وما حولها.", en: "At Paradise, we craft the finest natural soaps, high-efficiency pastes, and luxury cosmetics, made with the highest quality standards especially for our valued customers in Atbara and its surroundings." },
  shopNow: { ar: "تسوق الآن", en: "Shop Now" },
  viewCategories: { ar: "تصفح الأقسام", en: "Browse Categories" },

  // Stats / Badges
  freeDeliveryAtbara: { ar: "توصيل سريع داخل عطبرة وما حولها", en: "Fast delivery within Atbara & suburbs" },
  naturalIngredients: { ar: "مكونات طبيعية وآمنة 100%", en: "100% safe & natural ingredients" },
  localProduction: { ar: "صناعة وطنية فخورة", en: "Proud local Sudanese craftsmanship" },

  // Store actions & filters
  searchPlaceholder: { ar: "ابحث عن منتجك المفضل...", en: "Search for your favorite product..." },
  sortBy: { ar: "ترتيب حسب", en: "Sort By" },
  defaultSort: { ar: "الافتراضي", en: "Default" },
  priceLowHigh: { ar: "السعر: من الأقل للأعلى", en: "Price: Low to High" },
  priceHighLow: { ar: "السعر: من الأعلى للأقل", en: "Price: High to Low" },
  ratingSort: { ar: "التقييم الأعلى", en: "Highest Rated" },
  currency: { ar: "جنيه سوداني", en: "SDG" },
  sdg: { ar: "ج.س", en: "SDG" },
  addToCartBtn: { ar: "أضف إلى السلة", en: "Add to Cart" },
  outOfStock: { ar: "نفذت الكمية", en: "Out of Stock" },
  inStock: { ar: "متوفر في المخزن", en: "In Stock" },
  onlyLeft: { ar: "متبقي {count} قطع فقط", en: "Only {count} items left" },
  scent: { ar: "الرائحة:", en: "Scent:" },
  size: { ar: "الحجم/الوزن:", en: "Size/Weight:" },

  // Product details & reviews
  reviews: { ar: "تقييمات العملاء", en: "Customer Reviews" },
  noReviews: { ar: "لا توجد تقييمات بعد. كن أول من يكتب تقييماً!", en: "No reviews yet. Be the first to write a review!" },
  writeReview: { ar: "أضف تقييمك", en: "Write a Review" },
  yourName: { ar: "اسمك الكامل", en: "Your Full Name" },
  yourRating: { ar: "تقييمك (من 5)", en: "Your Rating (out of 5)" },
  yourComment: { ar: "تعليقك ورأيك في المنتج", en: "Your Review / Feedback" },
  submitReview: { ar: "إرسال التقييم", en: "Submit Review" },
  reviewSuccess: { ar: "تم إضافة تقييمك بنجاح! شكراً لك.", en: "Your review was submitted successfully! Thank you." },
  submitting: { ar: "جاري الإرسال...", en: "Submitting..." },

  // Slideout Cart
  cartTitle: { ar: "سلة المشتريات", en: "Shopping Cart" },
  emptyCart: { ar: "سلتك فارغة حالياً!", en: "Your cart is currently empty!" },
  continueShopping: { ar: "متابعة التسوق", en: "Continue Shopping" },
  subtotal: { ar: "المجموع الفرعي", en: "Subtotal" },
  deliveryCharges: { ar: "رسوم التوصيل (داخل عطبرة)", en: "Delivery (Within Atbara)" },
  free: { ar: "مجاني / رمزي", en: "Very Low / Free" },
  checkoutBtn: { ar: "الانتقال للدفع وتأكيد الطلب", en: "Proceed to Checkout" },
  itemRemoved: { ar: "تم إزالة المنتج من السلة", en: "Product removed from cart" },

  // Checkout Form
  checkoutTitle: { ar: "إتمام الطلب وتأكيد التوصيل", en: "Complete Order & Confirm Delivery" },
  fullName: { ar: "الاسم الكامل (ثلاثي)", en: "Full Name" },
  phone: { ar: "رقم الهاتف والواتساب النشط", en: "Active Phone & WhatsApp Number" },
  phonePlaceholder: { ar: "مثال: 0913009060", en: "Example: 0913009060" },
  email: { ar: "البريد الإلكتروني (اختياري)", en: "Email Address (Optional)" },
  district: { ar: "الحي السكني في عطبرة وما حولها", en: "Atbara District / Neighborhood" },
  selectDistrict: { ar: "اختر الحي السكني...", en: "Select your neighborhood..." },
  addressDetailsLabel: { ar: "تفاصيل العنوان وعلامات مميزة", en: "Address Details / Landmarks" },
  addressDetailsPlaceholder: { ar: "مثال: بالقرب من صيدلية كذا أو مربع كذا", en: "Example: Near certain pharmacy, street, or block" },
  paymentMethodLabel: { ar: "طريقة الدفع المفضلة", en: "Preferred Payment Method" },
  payCash: { ar: "الدفع نداً عند الاستلام (كاش)", en: "Cash on Delivery (COD)" },
  payBankak: { ar: "تحويل بنكي عبر تطبيق (بنكك - بنك الخرطوم)", en: "Bank Transfer via Bankak (Bank of Khartoum)" },
  bankakInstructions: { ar: "الرجاء تحويل المبلغ للحساب: 3154826 باسم (مصنع برادايس للصابون) وإرسال لقطة شاشة التحويل للرقم 0913009060 أو 0114537190 عبر الواتساب لتأكيد طلبك فوراً.", en: "Please transfer the total amount to Bankak A/C: 3154826 under 'Paradise Soap Factory' and send the transfer screenshot to WhatsApp: 0913009060 or 0114537190 to immediately dispatch your order." },
  placeOrderBtn: { ar: "تأكيد الطلب وإرسال", en: "Confirm & Place Order" },
  orderProcessing: { ar: "جاري تأكيد طلبك...", en: "Processing your order..." },

  // Checkout Success
  orderSuccessTitle: { ar: "تم استلام طلبك بنجاح! 🎉", en: "Order Placed Successfully! 🎉" },
  orderSuccessDesc: { ar: "شكراً لثقتك بـ برادايس للصابون. تم استلام طلبك برقم #{id}. سنقوم بالتواصل معك عبر الهاتف أو الواتساب فوراً لتأكيد موعد التوصيل إلى حي {district}.", en: "Thank you for shopping with Paradise Soap! Your order #{id} has been placed. We will contact you via phone or WhatsApp shortly to coordinate delivery to {district}." },
  bankakUrgentNote: { ar: "ملاحظة هامة: إذا اخترت الدفع عبر تطبيق بنكك، يرجى إرسال إشعار التحويل إلى واتساب المبيعات لتسريع خروج المندوب.", en: "Important: If you chose Bankak transfer, please send the transfer receipt to our sales WhatsApp to expedite delivery." },
  backToHome: { ar: "العودة للرئيسية", en: "Back to Home" },

  // General terms
  contactInfo: { ar: "معلومات الاتصال", en: "Contact Information" },
  atbaraSudan: { ar: "عطبرة، ولاية نهر النيل، السودان", en: "Atbara, River Nile State, Sudan" },
  ourShowrooms: { ar: "معارضنا متواجدة لخدمتكم طوال الأسبوع.", en: "Our showrooms are open all week to serve you." }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<"ar" | "en">("ar");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load language and cart state on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("paradise_soap_locale");
    if (savedLocale === "en" || savedLocale === "ar") {
      setLocale(savedLocale);
    }

    const savedCart = localStorage.getItem("paradise_soap_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("paradise_soap_cart", JSON.stringify(cart));
  }, [cart]);

  // Sync locale to localStorage
  const handleSetLocale = (lang: "ar" | "en") => {
    setLocale(lang);
    localStorage.setItem("paradise_soap_locale", lang);
  };

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true); // Auto-open cart on add
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.priceSdg * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const t = (key: string) => {
    if (translations[key]) {
      return translations[key][locale];
    }
    return key;
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale: handleSetLocale,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        t,
      }}
    >
      <div dir={locale === "ar" ? "rtl" : "ltr"} className={locale === "ar" ? "font-sans" : "font-sans"}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppContextProvider");
  }
  return context;
};
