'use client';

import { useState, useEffect } from 'react';

const SUPABASE_URL = 'https://lhxebcykgdyxehcyohzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoeGViY3lrZ2R5eGVoY3lvaHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MzEwMjgsImV4cCI6MjEwMDQwNzAyOH0.k4FnoyO8nv_PZxPkK8WVhY1pEp-JWBBHGmzAwYSDtGc';

export default function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sellerName, setSellerName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [supabaseClient, setSupabaseClient] = useState<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = () => {
      if ((window as any).supabase) {
        const client = (window as any).supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabaseClient(client);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const activeSupabase = supabaseClient || ((window as any).supabase ? (window as any).supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null);

      if (!activeSupabase) {
        throw new Error('جاري الاتصال... اضغط مرة أخرى.');
      }

      let imageUrl = '';

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const cleanFileName = `${Date.now()}.${fileExt}`;

        const { error: uploadError } = await activeSupabase.storage
          .from('product-images')
          .upload(cleanFileName, imageFile, { upsert: true });

        if (uploadError) throw new Error('فشل رفع الصورة: ' + uploadError.message);

        const { data: urlData } = activeSupabase.storage
          .from('product-images')
          .getPublicUrl(cleanFileName);

        imageUrl = urlData.publicUrl;
      }

      const { error: dbError } = await activeSupabase.from('products').insert([
        {
          title,
          price: parseFloat(price),
          image: imageUrl,
          seller_name: sellerName,
          whatsapp,
        },
      ]);

      if (dbError) throw dbError;

      setMessage('✅ تم إضافة المنتج بنجاح!');
      setTitle('');
      setPrice('');
      setImageFile(null);
      setSellerName('');
      setWhatsapp('');
    } catch (error: any) {
      setMessage(`❌ ${error.message || 'حدث خطأ أثناء الإضافة.'}`);
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
            placeholder="مثال: 0114537290"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: loading ? '#6c757d' : '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'جاري الرفع والإضافة...' : 'إضافة المنتج'}
        </button>
      </form>
    </div>
  );
}
