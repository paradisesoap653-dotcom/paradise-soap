import Link from "next/link";
import { Sparkles, ShieldCheck, Truck, Star, Phone, Landmark, CheckCircle, Flame, Check, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

// قائمة منتجات افتراضية مؤقتة لضمان نجاح البناء بدون قاعدة بيانات
const allProducts = [
  {
    id: "1",
    nameAr: "صابون النيم والنعناع الطبيعي",
    priceSdg: 3500,
    sizeAr: "قطعة 150 جرام",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1607006342411-1a90e3d23c8a?auto=format&fit=crop&q=80&w=600"]
  },
  {
    id: "2",
    nameAr: "معجون غسيل الصحون الفائق (بالليمون)",
    priceSdg: 4500,
    sizeAr: "عبوة 1 كيلو",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600"]
  },
  {
    id: "3",
    nameAr: "جل استحمام برائحة العود الملكي",
    priceSdg: 6000,
    sizeAr: "عبوة 500 مل",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600"]
  },
  {
    id: "4",
    nameAr: "صابون زيت الزيتون وزبدة الشيا",
    priceSdg: 4000,
    sizeAr: "قطعة 180 جرام",
    isFeatured: true,
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"]
  }
];

export default function HomePage() {
  const featuredProducts = allProducts.filter((p) => p.isFeatured);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      {/* Navbar Header */}
      <header className="bg-emerald-950 text-white sticky top-0 z-50 border-b border-emerald-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold font-serif text-amber-400">برادايس للصابون</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:0913009060"
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>0913009060</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white py-10 md:py-16 border-b border-emerald-800">
          <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              <div className="lg:col-span-7 space-y-4 text-right pt-2 md:pt-4">
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

                <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
                  <a
                    href="#products-section"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-extrabold text-sm md:text-base px-8 py-4 rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <span>تسوق المنتجات الآن</span>
                  </a>
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

              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/3] bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1607006342411-1a90e3d23c8a?auto=format&fit=crop&q=80&w=800"
                      alt="Paradise Soap Handmade"
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
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED BENEFITS / BADGES GRID */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">صابون نقي ومطهر</h4>
                  <p className="text-xs text-gray-500">مكونات طبيعية وأعشاب طبية آمنة للبشرة الحساسة.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Flame className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">إزالة الدهون المستعصية</h4>
                  <p className="text-xs text-gray-500">معجون غسيل صحون وأواني فائق التركيز والقوة.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-emerald-50">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                  <Landmark className="h-6 w-6 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">الدفع عبر تطبيق بنكك</h4>
                  <p className="text-xs text-gray-500">تحويل سريع وآمن وفوري بنقرة زر واحدة عبر هاتفك.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-emerald-50">
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

        {/* PRODUCTS SECTION */}
        <section id="products-section" className="py-16 bg-emerald-50/20 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-right">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">🌟 المنتجات المتاحة</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif">قائمة منتجات برادايس للصابون</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-2xl border border-emerald-50/80 shadow-sm hover:shadow-md transition-shadow text-right">
                  <div className="block relative aspect-square overflow-hidden rounded-xl bg-gray-50 mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.nameAr}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-gray-900">{p.nameAr}</h3>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                      <span className="text-sm font-extrabold text-emerald-800">{p.priceSdg.toLocaleString()} ج.س</span>
                      <span className="text-xs text-gray-400">{p.sizeAr}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">
            <h2 className="text-2xl font-extrabold text-gray-900 font-serif mb-4">عن مصانع برادايس للصابون</h2>
            <p className="text-gray-600 leading-relaxed max-w-3xl">
              تأسست مجموعة برادايس للصابون ومستحضرات التجميل في مدينة عطبرة بهدف تقديم بديل وطني ممتاز يفوق المنتجات المستوردة جودةً وبأسعار تنافسية. نستخدم المكونات الطبيعية والزيوت العضوية لإنتاج منتجات عالية الجودة تناسب جميع الاحتياجات.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 py-8 border-t border-emerald-900 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-amber-400">مجموعة برادايس للصابون ومستحضرات التجميل - عطبرة</p>
          <p className="text-xs text-emerald-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
