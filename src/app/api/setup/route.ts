import { pool } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS paradise_soap_products (
        id SERIAL PRIMARY KEY,
        name_ar TEXT NOT NULL,
        name_en TEXT,
        description_ar TEXT,
        description_en TEXT,
        price_sdg NUMERIC NOT NULL,
        original_price_sdg NUMERIC,
        category TEXT DEFAULT 'solid',
        image TEXT,
        seller_name TEXT,
        stock INTEGER DEFAULT 10,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    return NextResponse.json({ success: true, message: 'تم إنشاء الجدول بنجاح' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
