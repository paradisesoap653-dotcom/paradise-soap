import ProductDetailClient from '../../ProductDetailClient';
import { pool } from '@/lib/db';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const result = await pool.query(
      `SELECT * FROM paradise_soap_products WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const row = await getProduct(resolvedParams.id);

  if (!row) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center space-y-4">
          <p className="text-lg font-bold text-gray-700">المنتج غير موجود</p>
          <Link href="/" className="text-emerald-800 font-bold underline">
            الرجوع للرئيسية
          </Link>
        </div>
      </div>
    );
  }

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
          id: row.id,
          nameAr: row.name_ar,
          nameEn: row.name_en || row.name_ar,
          priceSdg: Number(row.price_sdg),
          descriptionAr: row.description_ar || '',
          descriptionEn: row.description_en || '',
          images: row.image ? [row.image] : [],
        }}
      />
    </div>
  );
}
