'use client';

import { useState, useEffect } from 'react';

const SUPABASE_URL = 'https://lhxebcykgdyxehcyohzk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoeGViY3lrZ2R5eGVoY3lvaHprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ4MzEwMjgsImV4cCI6MjEwMDQwNzAyOH0.k4FnoyO8nv_PZxPkK8WVhY1pEp-JWBBHGmzAwYSDtGc';

interface Product {
  id?: number;
  title: string;
  price: number;
  image: string;
  seller_name?: string;
  whatsapp?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = async () => {
          if ((window as any).supabase) {
            const client = (window as any).supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const { data, error } = await client
              .from('products')
              .select('*')
              .order('id', { ascending: false });

            if (!error && data) {
              setProducts(data);
            }
          }
          setLoading(false);
        };
        document.head.appendChild(script);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', direction: 'rtl', backgroundColor: '#faf8f5', minHeight: '100vh', color: '#333' }}>
      
      {/* الشريط العلوي الإعلاني */}
      <div style={{ backgroundColor: '#6d4c2b', color: '#fff', textAlign: 'center', padding: '8px 15px', fontSize: '13px' }}>
        ✨ منتجات طبيعية وعضوية 100% لتغذية وترطيب البشرة — شحن سريع لجميع الولايات ✨
      </div>

      {/* القائمة العلوية Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #eee', backgroundColor: '#fff', position: 'relative' }}>
        
        {/* زر القائمة الجانبية */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
        >
          ☰
        </button>

        {/* اسم المتجر */}
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#4d5d3b' }}>
          برادايس سوب
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', border: '1px solid #ccc', padding: '3px 8px', borderRadius: '12px' }}>EN</span>
          <a href="/add-product" title="إضافة منتج" style={{ textDecoration: 'none', fontSize: '20px' }}>🛍️</a>
        </div>

        {/* القائمة المنسدلة المكتملة */}
        {menuOpen && (
          <div style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 100, width: '200px' }}>
            <a href="/" style={{ display: 'block', padding: '12px 15px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #eee' }}>الصفحة الرئيسية</a>
            <a href="#products-section" onClick={() => { setMenuOpen(false); scrollToProducts(); }} style={{ display: 'block', padding: '12px 15px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #eee' }}>جميع المنتجات</a>
            <a href="/add-product" style={{ display: 'block', padding: '12px 15px', color: '#28a745', textDecoration: 'none', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>➕ إضافة منتج جديد</a>
            <a href="#about" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 15px', color: '#333', textDecoration: 'none', borderBottom: '1px solid #eee' }}>عن المتجر</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '12px 15px', color: '#333', textDecoration: 'none' }}>اتصل بنا</a>
          </div>
        )}
      </header>

      {/* القسم الرئيسي Banner */}
      <section style={{ backgroundColor: '#5c6347', color: '#fff', textAlign: 'center', padding: '50px 20px', borderRadius: '0 0 25px 25px' }}>
        <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '15px', fontSize: '13px' }}>
          ✨ منتجات طبيعية وعضوية 100%
        </span>
        <h1 style={{ fontSize: '36px', margin: '20px 0 10px 0', fontWeight: 'bold' }}>Paradise Soap</h1>
        <h2 style={{ fontSize: '22px', fontWeight: 'normal', color: '#f0e6d2', marginBottom: '15px' }}>برادايس سوب — صابون ومستحضرات التجميل</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto 25px auto', lineHeight: '1.6', fontSize: '15px', color: '#e2e8d5' }}>
          منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
        </p>
        <button
          onClick={scrollToProducts}
          style={{ backgroundColor: '#fff', color: '#333', border: 'none', padding: '12px 35px', borderRadius: '25px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          تسوق الآن
        </button>

        {/* إحصائيات */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '35px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>100%</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>طبيعي</div>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>+500</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>عميل سعيد</div>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>★ 4.9</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>تقييم عام</div>
          </div>
        </div>
      </section>

      {/* قسم عرض المنتجات */}
      <section id="products-section" style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#4d5d3b', marginBottom: '30px', fontSize: '26px' }}>
          منتجاتنا المميزة 🌿
        </h2>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#888' }}>جاري تحميل المنتجات...</p>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: '30px', borderRadius: '15px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>لا توجد منتجات معروضة حالياً.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {products.map((item, index) => (
              <div key={item.id || index} style={{ backgroundColor: '#fff', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ height: '200px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                    <img
                      src={item.image || 'https://via.placeholder.com/200'}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '15px' }}>
                    <h3 style={{ fontSize: '18px', margin: '0 0 10px 0', color: '#333' }}>{item.title}</h3>
                    <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745', margin: '0 0 10px 0' }}>
                      {item.price} جنيه
                    </p>
                    {item.seller_name && (
                      <p style={{ fontSize: '12px', color: '#777', margin: 0 }}>البائع: {item.seller_name}</p>
                    )}
                  </div>
                </div>

                <div style={{ padding: '0 15px 15px 15px' }}>
                  {item.whatsapp ? (
                    <a
                      href={`https://wa.me/${item.whatsapp}?text=${encodeURIComponent('السلام عليكم، أرغب في طلب منتج: ' + item.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', textAlign: 'center', backgroundColor: '#25D366', color: '#fff', textDecoration: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}
                    >
                      طلب عبر الواتساب 💬
                    </a>
                  ) : (
                    <button style={{ width: '100%', backgroundColor: '#4d5d3b', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' }}>
                      إضافة للسلة 🛍️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
