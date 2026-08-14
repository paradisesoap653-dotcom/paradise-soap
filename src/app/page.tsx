import ProductListClient from './ProductListClient';
import { pool } from '@/lib/db';

async function getProducts() {
  try {
    const result = await pool.query(
      `SELECT * FROM paradise_soap_products ORDER BY created_at DESC`
    );
    return result.rows.map((row: any) => ({
      id: row.id,
      nameAr: row.name_ar,
      nameEn: row.name_en || row.name_ar,
      descriptionAr: row.description_ar || '',
      descriptionEn: row.description_en || '',
      priceSdg: Number(row.price_sdg),
      originalPriceSdg: row.original_price_sdg ? Number(row.original_price_sdg) : null,
      category: row.category || 'solid',
      images: row.image ? [row.image] : [],
      rating: 5,
      stock: row.stock ?? 10,
      scentAr: null,
      scentEn: null,
      sizeAr: null,
      sizeEn: null,
      isFeatured: row.is_featured || false,
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts();

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

      <ProductListClient products={products} />

      {/* About Section */}
      <section id="about" className="max-w-3xl mx-auto px-6 py-14 text-center space-y-4 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#5a6b48]">عن برادايس سوب</h2>
        <p className="text-gray-600 leading-relaxed">
          برادايس سوب متجر سوداني متخصص في صناعة الصابون ومستحضرات العناية الطبيعية يدوياً،
          باستخدام زيوت ومكونات عضوية 100% خالية من المواد الكيميائية الضارة. هدفنا نوصلك
          منتجات آمنة وفعالة تعتني ببشرتك، مع شحن سريع لجميع الولايات.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-14 text-center space-y-5 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#5a6b48]">اتصل بنا</h2>
        <p className="text-gray-600 leading-relaxed">
          عندك سؤال عن منتج أو طلبية؟ تواصل معانا مباشرة عبر واتساب وهنرد عليك بأسرع وقت.
        </p>
        <a
          href="https://wa.me/249114556141"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-[#5a6b48] text-white font-bold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition"
        >
          راسلنا على واتساب
        </a>
      </section>

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
