"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useApp } from "@/context/AppContext";

const sampleProducts = [
  {
    id: "1",
    nameAr: "صابون النيم والنعناع الطبيعي",
    sizeAr: "قطعة 100 جرام",
    descriptionAr: "صابون طبيعي ينظف البشرة بعمق ويساعد على تهدئة التهابات الجلد والبشرة الحساسة.",
    priceSdg: 3500,
    image: "/images/placeholder.jpg",
  },
  {
    id: "2",
    nameAr: "معجون غسيل الصحون الفائق (بالليمون)",
    sizeAr: "عبوة 1 كيلو",
    descriptionAr: "تركيبة مركزة وقوية لإزالة الدهون المستعصية مع حماية فائقة للأيدي.",
    priceSdg: 4500,
    image: "/images/placeholder.jpg",
  },
  {
    id: "3",
    nameAr: "جل استحمام برائحة العود الملكي",
    sizeAr: "عبوة 500 مل",
    descriptionAr: "تجربة استحمام فاخرة برائحة العود الأصيل تدوم طويلاً وتمنح بشرتك النعومة.",
    priceSdg: 6000,
    image: "/images/placeholder.jpg",
  },
];

export default function HomePage() {
  const { addToCart } = useApp();

  return (
    <div style={{ backgroundColor: "#FAF7F2", color: "#2D3748", fontFamily: "sans-serif", direction: "rtl", minHeight: "100vh" }}>
      {/* الهيدر العلوي */}
      <Navbar />

      {/* 1. قسم الواجهة الرئيسي (Hero) بدون ظلال معتمة وبخط عربي واضح */}
      <section style={{ backgroundColor: "#5C6348", color: "#FFFFFF", padding: "40px 16px 50px", textAlign: "center", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <span style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#FEF3C7", padding: "6px 16px", borderRadius: "20px", fontSize: "12px", display: "inline-block", marginBottom: "15px" }}>
            ✨ منتجات طبيعية وعضوية 100%
          </span>

          <h1 style={{ fontSize: "36px", fontWeight: "bold", margin: "5px 0", letterSpacing: "1px" }}>
            Paradise Soap
          </h1>
          <h2 style={{ fontSize: "22px", color: "#FDE68A", fontWeight: "600", margin: "0 0 15px 0" }}>
            برادايس سوب — صابون الجنة
          </h2>

          <p style={{ color: "#F3F4F6", fontSize: "14px", lineHeight: "1.6", margin: "0 auto 20px", maxWidth: "450px" }}>
            منتجاتنا المصنوعة يدوياً بأجود الزيوت والمكونات الطبيعية لتغذية وترطيب بشرتك كل يوم.
          </p>

          <a href="#products" style={{ backgroundColor: "#FFFFFF", color: "#5C6348", fontWeight: "bold", padding: "12px 30px", borderRadius: "25px", display: "inline-block", textDecoration: "none", fontSize: "14px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            تسوق الآن
          </a>

          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)", fontSize: "12px" }}>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>100%</div>
              <div style={{ color: "#FDE68A" }}>طبيعي</div>
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>+500</div>
              <div style={{ color: "#FDE68A" }}>عميل سعيد</div>
            </div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>4.9★</div>
              <div style={{ color: "#FDE68A" }}>تقييم عام</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. قسم المميزات - كروت بيضاء ناعمة بحواف انسيابية */}
      <section style={{ maxWidth: "900px", margin: "-20px auto 40px", padding: "0 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
          
          <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "20px", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🌱</div>
            <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: "0 0 5px" }}>مكونات طبيعية 100%</h3>
            <p style={{ fontSize: "12px", color: "#718096", margin: 0, lineHeight: "1.5" }}>خالية تماماً من المواد الكيميائية الضارة لضمان صحة ونضارة بشرتك.</p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "20px", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>✨</div>
            <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: "0 0 5px" }}>صناعة يدوية فاخرة</h3>
            <p style={{ fontSize: "12px", color: "#718096", margin: 0, lineHeight: "1.5" }}>كل قطعة تُصنع بحب وعناية فائقة لتمنحك تجربة استخدام فريدة.</p>
          </div>

          <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "20px", textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🚚</div>
            <h3 style={{ fontSize: "15px", fontWeight: "bold", margin: "0 0 5px" }}>توصيل سريع وآمن</h3>
            <p style={{ fontSize: "12px", color: "#718096", margin: 0, lineHeight: "1.5" }}>يصلك طلبك حتى باب المنزل في أسرع وقت ممكن.</p>
          </div>

        </div>
      </section>

      {/* 3. قسم المنتجات المتميزة */}
      <section id="products" style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px 16px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 5px", color: "#1A202C" }}>منتجاتنا المتميزة</h2>
          <p style={{ fontSize: "13px", color: "#718096", margin: 0 }}>تصفح تشكيلتنا المختارة من الصابون ومستحضرات التجميل الطبيعية</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {sampleProducts.map((product) => (
            <div key={product.id} style={{ backgroundColor: "#FFFFFF", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 15px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ position: "relative", height: "180px", backgroundColor: "#F7FAFC" }}>
                  <Image src={product.image} alt={product.nameAr} fill style={{ objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: "12px", right: "12px", backgroundColor: "#FFFFFF", color: "#78350F", padding: "4px 12px", borderRadius: "15px", fontSize: "11px", fontWeight: "bold", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                    {product.sizeAr}
                  </span>
                </div>
                <div style={{ padding: "18px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px", color: "#2D3748" }}>{product.nameAr}</h3>
                  <p style={{ fontSize: "12px", color: "#718096", margin: 0, lineHeight: "1.6" }}>{product.descriptionAr}</p>
                </div>
              </div>

              <div style={{ padding: "15px 18px", borderTop: "1px solid #EDF2F7", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: "18px", fontWeight: "bold", color: "#78350F" }}>
                  {product.priceSdg.toLocaleString()} <span style={{ fontSize: "11px", fontWeight: "normal", color: "#A0AEC0" }}>ج.س</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Link href={`/products/${product.id}`} style={{ padding: "8px 12px", borderRadius: "10px", border: "1px solid #E2E8F0", color: "#4A5568", textDecoration: "none", fontSize: "12px", fontWeight: "500" }}>
                    التفاصيل
                  </Link>
                  <button onClick={() => addToCart({ ...product, quantity: 1 })} style={{ backgroundColor: "#5C6348", color: "#FFFFFF", border: "none", padding: "8px 16px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", cursor: "pointer" }}>
                    إضافة للسلة
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. قسم الآراء والتقييمات */}
      <section style={{ backgroundColor: "#EFECE6", padding: "50px 16px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "25px" }}>آراء عملائنا</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "15px" }}>
            <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "20px", textAlign: "right", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ color: "#F59E0B", marginBottom: "8px" }}>★★★★★</div>
              <p style={{ fontSize: "12px", color: "#4A5568", lineHeight: "1.6", margin: "0 0 10px" }}>"الصابون ممتاز جداً ونعومته واضحة على البشرة من أول استخدام. تسلم الأيادي!"</p>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#2D3748" }}>— سارة أحمد</div>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", padding: "20px", borderRadius: "20px", textAlign: "right", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <div style={{ color: "#F59E0B", marginBottom: "8px" }}>★★★★★</div>
              <p style={{ fontSize: "12px", color: "#4A5568", lineHeight: "1.6", margin: "0 0 10px" }}>"رائحة زكية وجودة عالية جداً والتوصيل كان سريع. بالتأكيد سأكرر التجربة."</p>
              <div style={{ fontSize: "12px", fontWeight: "bold", color: "#2D3748" }}>— منى الباقر</div>
            </div>
          </div>
        </div>
      </section>

      {/* الفوتر */}
      <footer style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #E2E8F0", padding: "20px 16px", textAlign: "center", fontSize: "12px", color: "#A0AEC0" }}>
        <p style={{ margin: 0 }}>جميع الحقوق محفوظة © {new Date().getFullYear()} — صابون الجنة (Paradise Soap)</p>
      </footer>
    </div>
  );
}
