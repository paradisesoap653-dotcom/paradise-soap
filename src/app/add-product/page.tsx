'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

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

      // 1. رفع الصورة إلى Supabase Storage
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error('فشل رفع الصورة: ' + uploadError.message);
        }

        // الحصول على الرابط العام للصورة
        const { data: urlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // 2. إدراج بيانات المنتج في الجدول
      const { error: dbError } = await supabase.from('products').insert([
        {
          title,
          price: parseFloat(price),
          image: imageUrl,
          seller_name: sellerName,
          whatsapp,
        },
      ]);

      if (dbError) throw dbError;

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
          {loading ? 'جاري رفع الصورة والإضافة...' : 'إضافة المنتج'}
        </button>
      </form>
    </div>
  );
}
