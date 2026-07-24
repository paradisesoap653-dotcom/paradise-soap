import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#2c3e2e]">
      {/* Top Banner */}
      <div className="bg-[#5c3447] text-white text-xs md:text-sm py-2 text-center px-4 font-medium">
        ✨ هل لديك منتجات طبيعية؟ انضم إلى Paradise Soap واعرضها مجاناً!
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#5a6b48] text-white py-16 px-6 text-center rounded-b-3xl shadow-sm">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold">
            ✨ منتجات طبيعية وعضوية 100%
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Paradise Soap
          </h1>
          
          <p className="text-lg md:text-xl font-medium opacity-90">
            برادايس سوب — صابون ومستحضرات التجميل
          </p>
          
          <p className="text-sm md:text-base max-w-xl mx-auto opacity-80 leading-relaxed">
            منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="#products" 
              className="w-full sm:w-auto bg-white text-[#5a6b48] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition duration-200"
            >
              تسوق الآن
            </Link>
            <Link 
              href="/become-a-seller" 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white/10 transition duration-200"
            >
              انضم كبائع 🌿
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20 max-w-lg mx-auto">
            <div>
              <div className="text-2xl font-bold">100%</div>
              <div className="text-xs opacity-75">طبيعي</div>
            </div>
            <div>
              <div className="text-2xl font-bold">+500</div>
              <div className="text-xs opacity-75">عميل سعيد</div>
            </div>
            <div>
              <div className="text-2xl font-bold">★ 4.9</div>
              <div className="text-xs opacity-75">تقييم عام</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          🌿 منتجاتنا المميزة
        </h2>
        {/* قسم كروت المنتجات يوضع هنا */}
      </section>

      {/* Become a Seller Banner Section */}
      <section className="max-w-4xl mx-auto my-12 mx-4 bg-white border border-[#e2dad1] rounded-2xl p-8 shadow-sm text-center">
        <div className="inline-block p-3 bg-[#f0f4ec] rounded-full text-2xl mb-4">🌿</div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#5a6b48] mb-3">
          هل أنت منتج؟
        </h2>
        <p className="text-[#6b7280] max-w-xl mx-auto mb-6 text-sm md:text-base leading-relaxed">
          حوّل منتجاتك إلى فرصة أكبر للنجاح. انضم إلى Paradise Soap واعرض منتجاتك أمام آلاف العملاء. أضف صور بضائعك، اكتب وصفاً لها، حدّد أسعارها، وابدأ البيع بسهولة.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-right max-w-2xl mx-auto mb-8 text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>إنشاء متجر مجاني</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>رفع صور المنتجات</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>إدارة سهلة للمبيعات</span>
          </div>
          <div className="flex items-center gap-2 bg-[#f9f8f6] p-3 rounded-lg border">
            <span>✅</span> <span>الوصول لعملاء جدد</span>
          </div>
        </div>

        <Link 
          href="/become-a-seller" 
          className="inline-block bg-[#5a6b48] text-white font-bold text-lg px-10 py-4 rounded-full shadow-md hover:bg-[#48563a] transition duration-200"
        >
          🟢 ابدأ البيع الآن
        </Link>
      </section>
    </main>
  );
}
