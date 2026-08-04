import { products } from '@/data/products';
import ProductListClient from './ProductListClient';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <section className="relative bg-[#5a6b48] text-white py-12 px-6 text-center rounded-b-3xl shadow-sm">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs font-semibold">
            ✨ منتجات طبيعية وعضوية 100%
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Paradise Soap
          </h1>

          <p className="text-lg font-medium opacity-90">
            برادايس سوب — صابون ومستحضرات التجميل
          </p>

          <p className="text-sm max-w-xl mx-auto opacity-80 leading-relaxed">
            منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#products-section"
              className="w-full sm:w-auto bg-white text-[#5a6b48] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              تسوق الآن
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20 max-w-lg mx-auto">
            <div>
              <div className="text-xl font-bold">100%</div>
              <div className="text-xs opacity-75">طبيعي</div>
            </div>
            <div>
              <div className="text-xl font-bold">+500</div>
              <div className="text-xs opacity-75">عميل سعيد</div>
            </div>
            <div>
              <div className="text-xl font-bold">★ 4.9</div>
              <div className="text-xs opacity-75">تقييم عام</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Products Grid (connected to cart) */}
      <ProductListClient products={products} />

      {/* Footer Section */}
      <footer id="footer" className="bg-[#2c3e2e] text-white py-10 px-6 text-center text-sm space-y-4">
        <h3 className="text-xl font-bold">Paradise Soap</h3>
        <p className="text-gray-300 max-w-md mx-auto">منصتك الأولى للمنتجات والمستحضرات الطبيعية العضوية.</p>

        <div className="flex justify-center gap-6 pt-2">
          <a href="https://wa.me/249114556141" target="_blank" rel="noreferrer" className="hover:underline">واتساب</a>
          <a href="#" className="hover:underline">فيسبوك</a>
          <a href="#" className="hover:underline">إنستغرام</a>
        </div>

        <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
          جميع الحقوق محفوظة © 2026 Paradise Soap
        </div>
      </footer>
    </main>
  );
}
