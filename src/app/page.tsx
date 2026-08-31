import ProductListClient from "./ProductListClient";
import { pool } from "@/lib/db";

async function getProducts() {
  try {
    const result = await pool.query(
      `SELECT * FROM paradise_soap_products ORDER BY created_at DESC`
    );

    return result.rows.map((row: any) => ({
      id: row.id,
      nameAr: row.name_ar,
      nameEn: row.name_en || row.name_ar,
      descriptionAr: row.description_ar || "",
      descriptionEn: row.description_en || "",
      priceSdg: Number(row.price_sdg),
      originalPriceSdg: row.original_price_sdg
        ? Number(row.original_price_sdg)
        : null,
      category: row.category || "solid",
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
    console.error("Error fetching products:", error);
    return [];
  }
}

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <section className="relative rounded-b-3xl bg-[#5a6b48] px-6 py-12 text-center text-white shadow-sm">
        <div className="mx-auto max-w-3xl space-y-5">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-semibold backdrop-blur-md">
            ✨ منتجات طبيعية وعضوية 100%
          </span>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Paradise Astore
          </h1>

          <p className="text-lg font-medium opacity-90">
            برادايس استور — صابون ومستحضرات التجميل
          </p>

          <p className="mx-auto max-w-xl text-sm leading-relaxed opacity-80">
            منتجاتنا المصنوعة يدويًا بأجود الزيوت والمكونات الطبيعية لتغذية
            وترطيب بشرتك كل يوم.
          </p>

          <a
            href="#products-section"
            className="inline-block rounded-full bg-white px-8 py-3 font-bold text-[#5a6b48] shadow-lg transition hover:bg-gray-100"
          >
            تسوق الآن
          </a>

          <div className="mx-auto grid max-w-lg grid-cols-3 gap-4 border-t border-white/20 pt-6">
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

      <section
        id="about"
        className="mx-auto max-w-3xl scroll-mt-24 space-y-4 px-6 py-14 text-center"
      >
        <h2 className="text-2xl font-extrabold text-[#5a6b48] md:text-3xl">
          عن برادايس استور
        </h2>

        <p className="leading-relaxed text-gray-600">
          برادايس استور متجر سوداني متخصص في صناعة الصابون ومستحضرات العناية
          الطبيعية يدويًا، باستخدام زيوت ومكونات عضوية 100% خالية من المواد
          الكيميائية الضارة. هدفنا نوصلك منتجات آمنة وفعالة تعتني ببشرتك، مع
          شحن سريع لجميع الولايات.
        </p>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-3xl scroll-mt-24 space-y-5 px-6 py-14 text-center"
      >
        <h2 className="text-2xl font-extrabold text-[#5a6b48] md:text-3xl">
          اتصل بنا
        </h2>

        <p className="leading-relaxed text-gray-600">
          عندك سؤال عن منتج أو طلبية؟ تواصل معانا مباشرة عبر واتساب وهنرد عليك
          بأسرع وقت.
        </p>

        <a
          href="https://wa.me/249114556141"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[#5a6b48] px-8 py-3 font-bold text-white shadow-md transition hover:opacity-90"
        >
          راسلنا على واتساب
        </a>
      </section>

      <footer
        id="footer"
        className="bg-[#2c3e2e] px-6 py-12 text-center text-white"
      >
        <div className="mx-auto max-w-4xl space-y-8">
          <h3 className="text-3xl font-extrabold">Paradise Astore</h3>

          <p className="mx-auto max-w-md text-gray-300">
            منصتك الأولى للمنتجات والمستحضرات الطبيعية العضوية.
          </p>

          <div>
            <h4 className="text-xl font-bold">تواصل معنا مباشرة</h4>

            <p className="mt-2 text-sm text-gray-300">
              يسعدنا خدمتكم والإجابة على استفساراتكم دائمًا
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-3">
            <a
              href="https://wa.me/249114556141"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب"
              title="واتساب"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition hover:scale-110"
            >
              <img
                src="https://cdn.simpleicons.org/whatsapp/ffffff"
                alt="واتساب"
                className="h-9 w-9"
              />
            </a>

            <a
              href="https://m.facebook.com/paradisetech1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فيسبوك"
              title="فيسبوك"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1877F2] shadow-lg transition hover:scale-110"
            >
              <img
                src="https://cdn.simpleicons.org/facebook/ffffff"
                alt="فيسبوك"
                className="h-9 w-9"
              />
            </a>

            <a
              href="https://www.instagram.com/paradise_tech2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام"
              title="إنستغرام"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 shadow-lg transition hover:scale-110"
            >
              <img
                src="https://cdn.simpleicons.org/instagram/ffffff"
                alt="إنستغرام"
                className="h-9 w-9"
              />
            </a>

            <a
              href="https://www.tiktok.com/@paradise_12s"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تيك توك"
              title="تيك توك"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-black shadow-lg transition hover:scale-110"
            >
              <img
                src="https://cdn.simpleicons.org/tiktok/ffffff"
                alt="تيك توك"
                className="h-9 w-9"
              />
            </a>

            <a
              href="https://youtube.com/@paradisetech_1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="يوتيوب"
              title="يوتيوب"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF0000] shadow-lg transition hover:scale-110"
            >
              <img
                src="https://cdn.simpleicons.org/youtube/ffffff"
                alt="يوتيوب"
                className="h-9 w-9"
              />
            </a>

            <a
              href="tel:+249114556141"
              aria-label="اتصال"
              title="اتصال"
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4285F4] shadow-lg transition hover:scale-110"
            >
              <img
                src="https://cdn.simpleicons.org/phone/ffffff"
                alt="اتصال"
                className="h-9 w-9"
              />
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
            <a
              href="tel:+249114556141"
              className="transition hover:text-white"
            >
              📞 +249 11 455 6141
            </a>

            <a
              href="mailto:paradisesoap365@gmail.com"
              className="transition hover:text-white"
            >
              ✉️ paradisesoap365@gmail.com
            </a>
          </div>

          <div className="border-t border-gray-700 pt-5 text-xs text-gray-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()} — Paradise Astore
          </div>
        </div>
      </footer>
    </main>
  );
}
