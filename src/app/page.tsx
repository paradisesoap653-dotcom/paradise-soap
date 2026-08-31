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

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 004.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.04h-.01a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.13.82.84-3.05-.2-.31a8.14 8.14 0 01-1.25-4.27c0-4.51 3.68-8.19 8.2-8.19a8.15 8.15 0 018.19 8.19c0 4.51-3.68 8.13-8.16 8.13zm4.48-6.13c-.24-.12-1.44-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.96-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42-.14-.01-.31-.01-.47-.01-.16 0-.42.06-.65.3-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.71 2.62 4.15 3.67.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77 4.9 4.9 0 01-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm5.2-8.4a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      <path d="M16.6 5.82c-.9-.98-1.4-2.26-1.4-3.62h-3.4v13.9c0 1.5-1.22 2.72-2.72 2.72a2.72 2.72 0 01-2.72-2.72 2.72 2.72 0 012.72-2.72c.28 0 .55.04.8.12v-3.46a6.2 6.2 0 00-.8-.05A6.15 6.15 0 003 16.02a6.15 6.15 0 006.15 6.15 6.15 6.15 0 006.15-6.15V9.02a8.6 8.6 0 004.9 1.52V7.16c-1.2 0-2.32-.5-3.6-1.34z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
      <path d="M23.5 6.2a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.02 3.02 0 002.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.5v-7l6.25 3.5-6.25 3.5z" />
    </svg>
  );
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
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

      {/* About Section */}
      <section
        id="about"
        className="mx-auto max-w-3xl space-y-4 px-6 py-14 text-center"
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

      {/* Contact Section */}
      <section
        id="contact"
        className="mx-auto max-w-3xl space-y-5 px-6 py-14 text-center"
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

      {/* Footer */}
      <footer
        id="footer"
        className="bg-[#5f733d] px-6 py-16 text-center text-white"
      >
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-4 text-3xl font-extrabold">
            Paradise Astore
          </h3>

          <p className="mb-10 text-lg text-white/75">
            منصتك الأولى للمنتجات والمستحضرات الطبيعية العضوية.
          </p>

          <h4 className="mb-8 text-2xl font-medium text-white/85">
            تواصل معنا مباشرة
          </h4>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {/* تيك توك */}
            <a
              href="https://www.tiktok.com/@paradise_12s"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تيك توك"
              title="تيك توك"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-110"
            >
              <TikTokIcon />
            </a>

            {/* إنستغرام */}
            <a
              href="https://www.instagram.com/paradise_tech2"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="إنستغرام"
              title="إنستغرام"
              className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-110"
              style={{
                background:
                  "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
              }}
            >
              <InstagramIcon />
            </a>

            {/* فيسبوك */}
            <a
              href="https://m.facebook.com/paradisetech1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="فيسبوك"
              title="فيسبوك"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-lg transition hover:scale-110"
            >
              <FacebookIcon />
            </a>

            {/* واتساب */}
            <a
              href="https://wa.me/249114556141"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="واتساب"
              title="واتساب"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-110"
            >
              <WhatsAppIcon />
            </a>

            {/* الهاتف */}
            <a
              href="tel:+249114556141"
              aria-label="اتصال"
              title="اتصال"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2585F5] text-white shadow-lg transition hover:scale-110"
            >
              <PhoneIcon />
            </a>

            {/* يوتيوب */}
            <a
              href="https://youtube.com/@paradisetech_1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="يوتيوب"
              title="يوتيوب"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-lg transition hover:scale-110"
            >
              <YouTubeIcon />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-base text-white/75">
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

          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/55">
            جميع الحقوق محفوظة © {new Date().getFullYear()} — Paradise Astore
          </div>
        </div>
      </footer>
    </main>
  );
}
