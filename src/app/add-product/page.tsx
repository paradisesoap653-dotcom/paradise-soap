
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// تهيئة الاتصال بـ Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.from('products').insert([
      {
        title,
        price: parseFloat(price),
        image,
        seller_name: sellerName,
        whatsapp,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage('❌ حدث خطأ أثناء إضافة المنتج. تأكد من البيانات.');
    } else {
      setMessage('✅ تم إضافة المنتج بنجاح إلى المتجر!');
      setTitle('');
      setPrice('');
      setImage('');
      setSellerName('');
      setWhatsapp('');
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
            placeholder="مثال: صابون طبيعي بالزيوت"
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
          <label style={{ display: 'block', marginBottom: '5px' }}>رابط صورة المنتج (URL):</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="https://example.com/image.jpg"
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
            placeholder="اسمك أو اسم المحل"
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
            placeholder="مثال: 249123456789"
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
          {loading ? 'جاري الإضافة...' : 'إضافة المنتج'}
        </button>
      </form>
    </div>
  );
}
