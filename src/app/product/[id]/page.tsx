import Link from "next/link";
import { Sparkles, Phone, ArrowRight, Star, Check } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

// قائمة منتجات افتراضية مؤقتة لضمان عرض تفاصيل المنتج ونجاح البناء
const mockProducts = [
  {
    id: "1",
    nameAr: "صابون النيم والنعناع الطبيعي",
    priceSdg: 3500,
    sizeAr: "قطعة 150 جرام",
    description: "صابون طبيعي مصنع بحرفية عالية يعالج مشاكل البشرة والجلد، ومناسب لطقس عطبرة الحار.",
    image: "https://images.unsplash.com/photo-1607006342411-1a90e3d23c8a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "2",
    nameAr: "معجون غسيل الصحون الفائق (بالليمون)",
    priceSdg: 4500,
    sizeAr: "عبوة 1 كيلو",
    description: "تركيبة فائقة التركيز للقضاء على الدهون المستعصية وإعطاء لمعان تام للأواني.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "3",
    nameAr: "جل استحمام برائحة العود الملكي",
    priceSdg: 6000,
    sizeAr: "عبوة 500 مل",
    description: "ينعش حواسك بروائح شرقية فواحة تدوم طويلاً، مع مرطبات لحماية البشرة.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "4",
    nameAr: "صابون زيت الزيتون وزبدة الشيا",
    priceSdg: 4000,
    sizeAr: "قطعة 180 جرام",
    description: "مصنوع من زيوت نقية 100% لتغذية البشرة وترطيبها بعمق.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
  }
];

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // البحث عن المنتج أو عرض أول منتج كافتراضي
  const product = mockProducts.find((p) => p.id === productId) || mockProducts[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
      {/* Navbar Header */}
      <header className="bg-emerald-950 text-white sticky top-0 z-50 border-b border-emerald-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-extrabold font-serif text-sm">
            <ArrowRight className="h-4 w-4" />
            <span>الرجوع للرئيسية</span>
          </Link>
          <span className="text-xl font-extrabold font-serif text-amber-400">برادايس للصابون</span>
          <a
            href="tel:0913009060"
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>0913009060</span>
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-50 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Product Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img
              src={product.image}
              alt={product.nameAr}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6 text-right">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full">
                <span>منتج طبيعي أصلي</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif leading-tight">
                {product.nameAr}
              </h1>
              <div className="flex items-center gap-1 text-amber-400 text-xs pt-1">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <span className="text-gray-500 font-bold mr-1">(4.9/5)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="text-2xl font-black text-emerald-800">
                {product.priceSdg.toLocaleString()} <span className="text-sm">جنيه سوداني</span>
              </div>
              <div className="text-xs text-gray-500 font-semibold">الحجم / الكمية: {product.sizeAr}</div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>توصيل سريع داخل مدينة عطبرة والدامر</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>الدفع عند الاستلام أو عبر تطبيق بنكك</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0913009060"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white font-extrabold text-sm py-4 rounded-xl shadow-md transition-all"
              >
                <Phone className="h-4 w-4 text-amber-300" />
                <span>اطلب الآن هاتفيناً: 0913009060</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-100 py-8 border-t border-emerald-900 text-center mt-12">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-bold text-amber-400">مجموعة برادايس للصابون ومستحضرات التجميل - عطبرة</p>
          <p className="text-xs text-emerald-400">جميع الحقوق محفوظة © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
