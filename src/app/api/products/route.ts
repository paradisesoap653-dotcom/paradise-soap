import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

// جلب كل المنتجات
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM paradise_soap_products ORDER BY created_at DESC`
    );
    return NextResponse.json({ success: true, products: result.rows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// إضافة منتج جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nameAr,
      nameEn,
      descriptionAr,
      priceSdg,
      image,
      sellerName,
    } = body;

    if (!nameAr || !priceSdg) {
      return NextResponse.json(
        { success: false, error: 'اسم المنتج والسعر مطلوبين' },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO paradise_soap_products
        (name_ar, name_en, description_ar, price_sdg, image, seller_name)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nameAr, nameEn || null, descriptionAr || null, priceSdg, image || null, sellerName || null]
    );

    return NextResponse.json({ success: true, product: result.rows[0] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
