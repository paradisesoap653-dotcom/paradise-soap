"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

// أضف أي استيرادات أخرى خاصة بك هنا (مثل الأيقونات أو الصور)
import WhatsAppIcon from "@/components/WhatsAppIcon"; 

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity } = useApp();

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.priceSdg * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col justify-between p-4 overflow-y-auto">
        <div>
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-lg font-bold">سلة التسوق</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gray-500 hover:text-gray-800 p-2 font-bold"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="text-center text-gray-500 my-8">السلة فارغة حالياً</p>
          ) : (
            <div className="divide-y my-4">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-sm">{item.nameAr}</h3>
                    {item.sizeAr && <p className="text-xs text-gray-500">المقاس: {item.sizeAr}</p>}
                    <p className="text-sm font-bold text-green-700">{item.priceSdg} ج.س</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 mr-2 text-xs"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between font-bold text-lg">
              <span>الإجمالي:</span>
              <span className="text-green-700">{total} ج.س</span>
            </div>
            
            {/* تم إزالة خاصية title="WhatsApp" من الأيقونة هنا لإصلاح خطأ TypeScript */}
            <a
              href={`https://wa.me/249xxxxxxxxx?text=طلب جديد من المتجر`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 rounded-lg font-bold transition-colors"
            >
              <WhatsAppIcon className="h-5 w-5 text-white" />
              <span>إتمام الطلب عبر واتساب</span>
            </a>
            
            <p className="text-[11px] text-gray-400 text-center">
              سيتم توجيهك إلى المحادثة المباشرة لتأكيد الطلب والعنوان
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
