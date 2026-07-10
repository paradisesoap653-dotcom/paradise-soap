import { db } from "@/db";
import { products, reviews } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductDetailClient from "@/components/ProductDetailClient";
import Link from "next/link";
import { Sparkles, AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  if (isNaN(productId)) {
    return <ProductNotFound />;
  }

  // Fetch the product from the database
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product) {
    return <ProductNotFound />;
  }

  // Fetch reviews for this product
  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1">
        <ProductDetailClient product={product} initialReviews={productReviews} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slideout Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto space-y-6">
        <div className="h-16 w-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
          <AlertCircle className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 font-serif">
            عذراً، هذا المنتج غير متوفر!
          </h1>
          <p className="text-sm text-gray-500">
            ربما تم نقل الصنف أو نفذت كميته تماماً من مخازن برادايس للصابون بعطبرة. تصفح المعروضات الأخرى للحصول على صابون بجودة تليق بك.
          </p>
        </div>
        <Link
          href="/"
          className="bg-emerald-800 hover:bg-emerald-950 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-emerald-900/10 inline-flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>الرجوع لمعرض المنتجات الرئيسي</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
