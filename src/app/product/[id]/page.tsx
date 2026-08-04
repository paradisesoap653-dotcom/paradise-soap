import { products } from '@/data/products';
import ProductDetailClient from '../../ProductDetailClient';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id, 10);

  const product = products.find((p) => p.id === productId) || products[0];

  return (
    <div className="min-h-screen bg-slate-50" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-950 font-bold text-sm"
        >
          <ArrowRight className="h-4 w-4" />
          <span>الرجوع للرئيسية</span>
        </Link>
      </div>

      <ProductDetailClient
        product={{
          id: product.id,
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          priceSdg: product.priceSdg,
          descriptionAr: product.descriptionAr,
          descriptionEn: product.descriptionEn,
          sizeAr: product.sizeAr || undefined,
          sizeEn: product.sizeEn || undefined,
          images: product.images,
        }}
      />
    </div>
  );
}
