'use client';

import { useState } from 'react';

// ضع رابط مفتاح قاعدة البيانات ورابطها المباشر هنا
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export default function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sellerName, setSellerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';

      // 1. رفع الصورة إلى Supabase Storage بطلب مباشر (REST API)
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

        const uploadRes = await fetch(
          `${SUPABASE_URL}/storage/v1/object/product-images/${fileName}`,
          {
            method: 'POST',
            headers: {
              'apikey': SUPABASE_KEY,
              'Authorization': `Bearer ${SUPABASE_KEY}`,
              'Content-Type': imageFile.type,
            },
            body: imageFile,
          }
        );

        if (!uploadRes.ok) {
          const errData = await uploadRes.json();
          throw new Error('فشل رفع الصورة: ' + (errData.message || uploadRes.statusText));
        }

        // رابط الصورة المرفوعة
        imageUrl = `${SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
      }

      // 2. إضافة بيانات المنتج لجدول المنتجات مباشرة
      const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          image: imageUrl,
          seller_name: sellerName,
          whatsapp,
        }),
      });

      if (!dbRes.ok) {
        const dbErr = await dbRes.json();
        throw new Error(dbErr.message || 'فشل حفظ بيانات المنتج');
      }

      setMessage('✅ تم إضافة المنتج بنجاح مع الصورة!');
      setTitle('');
      setPrice('');
      setImageFile(null);
      setSellerName('');
      setWhatsapp('');
    } catch (error: any) {
      console.error(error);
      setMessage(`❌ حدث خطأ: ${error.message || 'تأكد من البيانات والأذونات'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>إضافة منتج جديد للمتجر 🛍️</h2>
      
      {message && (
        <div style={{ padding: '10px', marginBottom: '15px', borderRadius: '5px', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', color: message.includes('✅') ? '#155724' : '#721c24', textAlign: 'center' }}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>اسم المنتج:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="مثال: صابون معطر"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>السعر:</label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="مثال: 50"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>صورة المنتج:</label>
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#fff' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>اسم البائع:</label>
          <input
            type="text"
            required
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="مثال: عبدالله"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>رقم الواتساب للتواصل:</label>
          <input
            type="text"
            required
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="مثال: 0114537190"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'جاري رفع الصورة والإضافة...' : 'إضافة المنتج'}
        </button>
      </form>
    </div>
  );
}
