"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string | number;
  productId?: string | number;
  nameAr: string;
  nameEn?: string;
  priceSdg: number;
  sizeAr?: string;
  sizeEn?: string;
  image?: string;
  quantity: number;
}

const dictionary: Record<string, Record<string, string>> = {
  ar: {
    cartTitle: "سلة التسوق",
    emptyCart: "السلة فارغة حالياً",
    checkout: "إتمام الطلب عبر الواتساب",
    total: "المجموع الكلي",
    currency: "ج.س",
    continueShopping: "مواصلة التسوق",
    deleteItem: "حذف",
  },
  en: {
    cartTitle: "Shopping Cart",
    emptyCart: "Your cart is empty",
    checkout: "Checkout via WhatsApp",
    total: "Total",
    currency: "SDG",
    continueShopping: "Continue Shopping",
    deleteItem: "Delete",
  },
};

interface AppContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<string>("ar");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("paradise_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("paradise_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const t = (key: string): string => {
    return dictionary[locale]?.[key] || key;
  };

  const addToCart = (product: any) => {
    setCart((prev) => {
      const itemId = product.id || product.productId;
      const existing = prev.find((item) => (item.id || item.productId) === itemId);
      if (existing) {
        return prev.map((item) =>
          (item.id || item.productId) === itemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          id: itemId,
          productId: itemId,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id && item.productId !== id));
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id || item.productId === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.priceSdg || 0) * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        locale,
        setLocale,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
