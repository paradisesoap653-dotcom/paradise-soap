import { db } from "@/db";
import { products } from "@/db/schema";
import ProductListClient from "@/components/ProductListClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Sparkles, ShieldCheck, Truck, Star, Phone, Landmark, CheckCircle, Flame, Check } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Query all products from database using Drizzle
  const allProducts = await db.select().from(products);

  // Filter featured products for a special homepage slider/highlights
  const featuredProducts = allProducts.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white py-10 md:py-16 border-b border-emerald-800">
          {/* Subtle abstract background glowing shapes */}
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Brand Copy */}
              <div className="lg:col-span-7 space-y-4 text-right lg:text-right rtl:text-right ltr:text-left pt-2 md:pt-4">
                
                {/* Atbara Special Welcome Badge */}
                <div className="inline-flex items-center gap-2 bg-emerald-800/60 border border-emerald-700/50 text-white text-xs font-bold px-4 py-2 rounded-full shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  <span>📍 لأهلنا في مدينة عطبرة، الدامر والمناطق المجاورة</span>
                </div>

                <div className="inline-flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 shadow-inner backdrop-blur-sm">
                  <span className="text-xl sm:text-3xl font-black text-white font-serif leading-tight">برادايس للصابون</span>
                  <span className="text-sm sm:text-xl font-extrabold text-amber-200 leading-tight tracking-wide">Paradise Soap</span>
                </div>

                <p className="text-sm sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
                  ننتج بكل فخر واعتزاز أجود أنواع الصابون الطبيعي والبيئي السائل، الصلب، الجل والمعاجين ومستحضرات التجميل العضوية. منتجاتنا مصنعة بأعلى معايير النقاوة لحماية بشرتكم وتوفير نظافة مثالية في صيف عطبرة الحار.
                </p>

                {/* Quick Selling Points */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-sm text-emerald-50">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>صابون سائل، صلب، معجون وجل</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>توصيل سريع لباب المنزل 🚀</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-amber-400 shrink-0" />
                    <span>تحويل بنكك أو كاش عند الاستلام</span>
                  </div>
                </div>

                {/* Hero CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
                  <Link
                    href="#products-section"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm md:text-base px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 transition-all animate-bounce-slow"
                  >
                    <span>تسوق المنتجات الآن</span>
                  </Link>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <a
                      href="tel:0913009060"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-800/60 hover:bg-emerald-800/90 text-white border border-emerald-700 font-extrabold text-xs md:text-sm px-5 py-3 rounded-xl transition-all"
                    >
                      <Phone className="h-4 w-4 text-amber-400" />
                      <span>اتصال: 0913009060</span>
                    </a>
                    <a
                      href="tel:0114537190"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-800/60 hover:bg-emerald-800/90 text-white border border-emerald-700 font-extrabold text-xs md:text-sm px-5 py-3 rounded-xl transition-all"
                    >
                      <Phone className="h-4 w-4 text-amber-400" />
                      <span>اتصال: 0114537190</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Right Column: Visual Collage / Showcase */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                  
                  {/* Backdrop glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-3xl rotate-3 scale-102 opacity-20" />
                  
                  {/* Floating Main Badge */}
                  <div className="absolute -top-4 -right-4 bg-amber-500 text-slate-950 text-xs font-black p-3.5 rounded-2xl shadow-xl z-20 flex flex-col items-center rotate-6">
                    <span className="text-[10px] uppercase">{allProducts.length}+ أصناف</span>
                    <span>متوفرة بالمخزن</span>
                  </div>

                  {/* Main Hero Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1607006342411-1a90e3d23c8a?auto=format&fit=crop&q=80&w=800"
                      alt="Paradise Soap Handmade Collage"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Star className="h-4 w-4 fill-amber-300" />
                        <Star className="h-4 w-4 fill-amber-300" />
                        <Star className="h-4 w-4 fill-amber-300" />
                        <Star className="h-4 w-4 fill-amber-300" />
                        <Star className="h-4 w-4 fill-amber-300" />
                        <span className="text-white text-xs font-bold ml-1">4.9/5 تقييم مبيعات</span>
                      </div>
                      <p className="text-sm font-bold text-white mt-1">صابون برادايس الطبيعي - جودة تفخر بها عائلتكم</p>
                    </div>
                  </div>

                  {/* Overlay small floating card */}
                  <div className="absolute -bottom-6 -left-4 bg-white text-slate-900 p-3.5 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-emerald-50">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <Truck className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">توصيل اليوم التالي</h4>
                      <p className="text-[10px] text-gray-400">داخل عطبرة بـ 2,000 ج فقط أو مجاناً للطلبات الكبيرة</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED BENEFITS / BADGES GRID */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              {/* Feature 1 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-emerald-50/20 transition-all border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">صابون نقي ومطهر</h4>
                  <p className="text-xs text-gray-500">مكونات طبيعية وأعشاب طبية آمنة للبشرة الحساسة.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-emerald-50/20 transition-all border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Flame className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">إزالة الدهون المستعصية</h4>
                  <p className="text-xs text-gray-500">معجون غسيل صحون وأواني فائق التركيز والقوة.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-emerald-50/20 transition-all border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Landmark className="h-6 w-6 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">الدفع عبر تطبيق بنكك</h4>
                  <p className="text-xs text-gray-500">تحويل سريع وآمن وفوري بنقرة زر واحدة عبر هاتفك.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 hover:bg-emerald-50/20 transition-all border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Truck className="h-6 w-6 text-teal-700" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">سكان مدينة عطبرة وما حولها</h4>
                  <p className="text-xs text-gray-500">خدمة توصيل مرنة وسريعة في نفس اليوم أو اليوم التالي.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED COLLECTIONS SPOTLIGHT */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-emerald-50/20 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">🌟 عروض ترويجية محدودة</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">المنتجات الأكثر طلباً هذا الأسبوع</h2>
                </div>
                <Link href="#products-section" className="text-sm font-bold text-emerald-800 hover:text-emerald-950 underline transition-colors">
                  تصفح كامل المعرض ➔
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((p) => (
                  <div key={p.id} className="bg-white p-3 rounded-2xl border border-emerald-50/50 shadow-sm hover:shadow-md transition-shadow">
                    <Link href={`/product/${p.id}`} className="block relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-3 group">
                      <img
                        src={p.images[0]}
                        alt={p.nameAr}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-emerald-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        الأكثر مبيعاً 🔥
                      </span>
                    </Link>
                    <div className="space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">
                        {p.nameAr}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-extrabold text-emerald-800">
                          {p.priceSdg.toLocaleString()} ج.س
                        </span>
                        <span className="text-[10px] text-gray-400 font-semibold">{p.sizeAr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* DYNAMIC PRODUCTS SECTION WITH FILTERS AND SORTING */}
        <ProductListClient products={allProducts} />

        {/* BRAND STORY & TRADITION (ABOUT US) */}
        <section className="py-20 bg-gradient-to-br from-white to-emerald-50/30 overflow-hidden relative border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left visual collage */}
              <div className="lg:col-span-6 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <img
                      src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400"
                      alt="Natural lavender"
                      className="rounded-2xl object-cover aspect-[3/4] shadow-md"
                    />
                    <div className="bg-emerald-800 text-white p-6 rounded-2xl shadow-md text-center flex flex-col justify-center">
                      <span className="text-3xl font-extrabold text-amber-300">100%</span>
                      <span className="text-xs font-bold mt-1">زيوت ومستخلصات نباتية عضوية نقية</span>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-amber-500 text-slate-950 p-6 rounded-2xl shadow-md text-center flex flex-col justify-center">
                      <span className="text-2xl font-black">عطبرة</span>
                      <span className="text-[10px] font-bold mt-1">الإنتاج والتعبئة محلياً بمهارة سودانية</span>
                    </div>
                    <img
                      src="https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=400"
                      alt="Skin cosmetics"
                      className="rounded-2xl object-cover aspect-[3/4] shadow-md"
                    />
                  </div>
                </div>
              </div>

              {/* Right text details */}
              <div className="lg:col-span-6 space-y-6 text-right rtl:text-right ltr:text-left">
                <div className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase">
                  <span>من نحن - قصة مصانع برادايس</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 font-serif leading-tight">
                  نصنع النظافة والجمال بلمسة طبيعية فاخرة تناسب تطلعاتكم
                </h2>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  تأسست <strong>مجموعة برادايس للصابون ومستحضرات التجميل</strong> في مدينة عطبرة بهدف تقديم بديل وطني ممتاز يفوق المنتجات المستوردة جودةً وبأسعار تنافسية تناسب الوضع الاقتصادي. نحن لا نصنع صابوناً عادياً، بل ندمج المكونات الطبيعية والزيوت العلاجية مثل زيت جوز الهند، زيت الزيتون، زبدة الشيا، ومستخلص أوراق النيم واللافندر لإنتاج رغوة غنية تمنح بشرتكم الأمان والترطيب طوال اليوم.
                </p>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  سواء كنت تبحث عن صابون سائل معقم للأيدي، أو معجون غسيل صحون يقضي على أعتى الدهون لراحة سيدات المنازل، أو جل استحمام ينعش حواسك بروائح شرقية فواحة كالعود الملكي والصندل، فإن برادايس هي خيارك الأول والموثوق في ولاية نهر النيل.
                </p>

                {/* Cover checkmarks */}
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2 justify-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <span>مكونات نباتية وخالية من الشحوم الضارة</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <span>معاد تدويرها وصديقة للبيئة</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <span>خيارات علاجية لحب الشباب والحساسية</span>
                  </div>
                  <div className="flex items-center gap-2 justify-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                      ✓
                    </div>
                    <span>توصيل مرن لكل أرجاء عطبرة</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href="#products-section"
                    className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
                  >
                    <span>استكشف كتالوج المنتجات بالكامل</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* LOCAL ATBARA TESTIMONIALS */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">{`أراء أهلنا وثقتهم بنا`}</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif mt-1">ماذا يقول سكان مدينة عطبرة عن صابون برادايس؟</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-50 shadow-sm space-y-4">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {`"جربت صابون النيم والنعناع الصلب وكان منقذاً حقيقياً لي ولأطفالي من حمو النيل وحرارة الجو المرتفعة هنا في عطبرة. صابون بارد ولطيف على الجلد ورغوته ممتازة جداً. سأكرر الشراء بكل تأكيد!"`}
                </p>
                <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-xs text-gray-500">
                  <span className="font-bold text-gray-800">إشراقة صالح</span>
                  <span>(عطبرة - حي الحصايا)</span>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-50 shadow-sm space-y-4">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {`"معجون غسيل الأواني بالليمون رائع للغاية، يقضي على الدهون من أول مسحة وكمية الكيلو تدوم معنا لفترة طويلة جداً مقارنة بالمنتجات الأخرى وسعره رخيص ومناسب. فخورين جداً بوجود هذا المصنع في عطبرة."`}
                </p>
                <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-xs text-gray-500">
                  <span className="font-bold text-gray-800">صفاء عبد الرحيم</span>
                  <span>(عطبرة - حي السودنة)</span>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-2xl border border-emerald-50 shadow-sm space-y-4">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  {`"قمت بطلب جل الاستحمام بالعود الفاخر ووصلني الطلب لباب منزلي في حي المطار خلال ساعات معدودة. تعامل راقي ومحترم والدفع تم بسهولة عبر تطبيق بنكك. الرائحة فخمة وتدوم طويلاً، أنصح به."`}
                </p>
                <div className="border-t border-gray-50 pt-3 flex justify-between items-center text-xs text-gray-500">
                  <span className="font-bold text-gray-800">م. محمد سليمان</span>
                  <span>(عطبرة - حي المطار)</span>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
}
