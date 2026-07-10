import "dotenv/config";
import { db } from "./index";
import { products, reviews } from "./schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🌱 Starting seeding database...");

  // Clear existing database entries
  try {
    await db.delete(reviews);
    await db.delete(products);
    console.log("🧹 Cleared existing database tables successfully.");
  } catch (error) {
    console.warn("⚠️ Failed to clear tables (might be empty):", error);
  }

  // 10 Premium Local Products
  const seedProducts = [
    {
      nameAr: "صابون لافندر سائل فاخر",
      nameEn: "Premium Lavender Liquid Soap",
      descriptionAr: "صابون سائل طبيعي ممتاز لليدين والجسم برائحة اللافندر المهدئة والمريحة للأعصاب. غني بخلاصة زيت الزيتون وزيت جوز الهند ومضادات الأكسدة لترطيب عميق يحمي البشرة من الجفاف وحرارة الجو في عطبرة.",
      descriptionEn: "Premium natural hand and body liquid soap infused with calming Lavender essential oil. Enriched with nourishing olive and coconut oils, keeping your skin soft, hydrated, and protected against Atbara's dry summer breeze.",
      priceSdg: 6500,
      originalPriceSdg: 8000,
      category: "liquid",
      images: [
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.8,
      stock: 45,
      scentAr: "خلاصة اللافندر الطبيعي",
      scentEn: "Natural Lavender Extract",
      sizeAr: "500 مل",
      sizeEn: "500ml",
      isFeatured: true,
    },
    {
      nameAr: "معجون برادايس بالليمون لغسيل الأواني",
      nameEn: "Paradise Lemon Dishwashing Paste",
      descriptionAr: "معجون غسيل الأواني عالي الفعالية، يقضي على الدهون العنيدة والمستعصية تماماً بلمسة مذهلة وسريعة. يحافظ على لمعان الأواني الفضية والزجاجية ويترك يديك ناعمتين تماماً برائحة الليمون المنعش التي تدوم طويلاً.",
      descriptionEn: "High-efficiency grease-cutting cleaning paste for dishes and cookware. Instantly eliminates stubborn oil residues, restores shine to steel and glassware, and leaves hands soft and scented with fresh, crisp lemons.",
      priceSdg: 4000,
      originalPriceSdg: 4800,
      category: "paste",
      images: [
        "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.9,
      stock: 60,
      scentAr: "الليمون البلدي الفواح",
      scentEn: "Strong Local Lemon Scent",
      sizeAr: "1 كيلوجرام",
      sizeEn: "1kg",
      isFeatured: true,
    },
    {
      nameAr: "صابون النيم والنعناع الطبيعي الصلب",
      nameEn: "Herbal Solid Neem & Mint Soap",
      descriptionAr: "صابون صلب طبيعي 100% مصنوع بالكامل من مستخلص أوراق النيم الطبية والنعناع البري المنعش. رائع وموصى به لعلاج حب الشباب، تنقية البشرة، وتبريد الجسم وتخفيف الحكة والحرارة في صيف عطبرة الحار.",
      descriptionEn: "100% natural medicated bar soap infused with active neem leaf extract and organic wild mint. Outstanding for soothing acne, purifying the pores, and delivering an instant cooling, antibacterial wash in Atbara's hot summer.",
      priceSdg: 3000,
      originalPriceSdg: 3500,
      category: "solid",
      images: [
        "https://images.unsplash.com/photo-1607006342411-1a90e3d23c8a?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.7,
      stock: 35,
      scentAr: "النعناع والقرنفل الطبيعي",
      scentEn: "Mint & Herbal Clove",
      sizeAr: "150 جرام",
      sizeEn: "150g",
      isFeatured: true,
    },
    {
      nameAr: "جل الاستحمام الفاخر بالعود الملكي",
      nameEn: "Royal Oud Luxurious Shower Gel",
      descriptionAr: "جل الاستحمام الفاخر برائحة العود الملكي العربي الأصيل. بتركيبة غنية تمنحك رغوة كريمية كثيفة وعطراً شرقياً ساحراً وجذاباً يدوم طوال اليوم. يمنح الجسم ترطيباً فائقاً يغنيك عن اللوشن.",
      descriptionEn: "Ultra-luxurious moisturizing shower gel with authentic Arabic Royal Oud. Formulated with extra rich emollients to create a dense, creamy lather and a captivating warm scent that lingers all day. No body lotion needed after!",
      priceSdg: 9500,
      originalPriceSdg: 11000,
      category: "gel",
      images: [
        "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1515008055582-76174b4139d0?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 5.0,
      stock: 25,
      scentAr: "العود الملكي الفاخر مع الصندل",
      scentEn: "Royal Oud & Sandalwood",
      sizeAr: "750 مل",
      sizeEn: "750ml",
      isFeatured: true,
    },
    {
      nameAr: "زبدة الشيا العضوية بالفانيليا لترطيب عميق",
      nameEn: "Paradise Organic Shea & Vanilla Butter",
      descriptionAr: "زبدة الشيا الأفريقية العضوية النقية غير المكررة، مخفوقة وممزوجة بزيت اللوز الحلو، زيت جوز الهند وفيتامين E، معززة بعبير الفانيليا الدافئ. مثالية لعلاج تشققات البشرة الجافة وتنعيم الكعبين واليدين تماماً.",
      descriptionEn: "Unrefined pure organic African shea butter, whipped to perfection with sweet almond oil, coconut oil, vitamin E, and a warm touch of vanilla bean. The ultimate treatment for healing dry cracked skin, elbows, and feet.",
      priceSdg: 12000,
      originalPriceSdg: 15000,
      category: "cosmetics",
      images: [
        "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.9,
      stock: 20,
      scentAr: "الفانيليا الحلوة والكاكاو",
      scentEn: "Sweet Vanilla & Cocoa",
      sizeAr: "250 جرام",
      sizeEn: "250g",
      isFeatured: true,
    },
    {
      nameAr: "بخاخ ماء الورد الطبيعي النقي 100%",
      nameEn: "100% Pure Natural Rosewater Spray",
      descriptionAr: "ماء ورد بلدي مقطر ومصفى بعناية فائقة خالٍ من الكحول والمواد الكيميائية. يعمل كتونر ممتاز لشد المسام وتجديد خلايا الوجه وتهدئة البشرة المتهيجة من الشمس، مما يعطيك نضارة وحيوية طبيعية لا مثيل لها.",
      descriptionEn: "100% pure steam-distilled Damask rosewater spray with zero alcohol or chemicals. Acts as an excellent pore-tightening toner, instantly refreshing fatigued skin, neutralizing redness, and adding a radiant natural glow.",
      priceSdg: 4800,
      originalPriceSdg: 5500,
      category: "cosmetics",
      images: [
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.6,
      stock: 40,
      scentAr: "الورد البلدي المقطر الأصيل",
      scentEn: "Pure Distilled Damask Rose",
      sizeAr: "200 مل",
      sizeEn: "200ml",
      isFeatured: false,
    },
    {
      nameAr: "صابون القطران الطبي المطهر السائل",
      nameEn: "Pine Tar Antiseptic Liquid Soap",
      descriptionAr: "تركيبة طبية فريدة تجمع بين فوائد قطران الصنوبر الطبيعي والمطهرات الطبية الحديثة. صابون سائل مضاد للفطريات والبكتيريا، مثالي لمعالجة حكة الجلد، قشرة الرأس المستعصية، الإكزيما، ومناسب للاستخدام اليومي الوقائي.",
      descriptionEn: "A unique medicinal formula blending natural pine tar extract with modern antiseptic agents. Excellent antibacterial and antifungal liquid soap, widely recommended for skin itching, scalp dandruff, and eczema relief.",
      priceSdg: 7000,
      originalPriceSdg: 8200,
      category: "liquid",
      images: [
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1626880842125-8f7f8f802847?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.8,
      stock: 30,
      scentAr: "قطران الصنوبر المنعش الطبيعي",
      scentEn: "Natural Pine & Earthy Herbs",
      sizeAr: "500 مل",
      sizeEn: "500ml",
      isFeatured: false,
    },
    {
      nameAr: "صابون زيت الزيتون والغار التقليدي الصلب",
      nameEn: "Traditional Olive Oil & Laurel Solid Soap",
      descriptionAr: "صابون الغار السوري التقليدي الأصيل والمحضّر على البارد بنسبة 100% من زيت زيتون نقي مع زيت الغار الطبيعي. خالٍ تماماً من الأصباغ والمواد الحافظة والعطور الصناعية. مغذٍ فائق ومناسب للبشرة الحساسة والأطفال.",
      descriptionEn: "Authentic cold-processed Laurel and Olive Oil bar soap. Highly conditioning, biodegradable, and completely free of synthetic perfumes, colorants, or preservatives. Extremely mild and nourishing for sensitive skin and babies.",
      priceSdg: 3500,
      originalPriceSdg: 4000,
      category: "solid",
      images: [
        "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1607006342411-1a90e3d23c8a?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.9,
      stock: 50,
      scentAr: "زيت الزيتون والغار النقي",
      scentEn: "Pure Olive Oil & Laurel",
      sizeAr: "180 جرام",
      sizeEn: "180g",
      isFeatured: false,
    },
    {
      nameAr: "مقشر القهوة العربية وجوز الهند لتفتيح البشرة",
      nameEn: "Premium Coffee & Coconut Scrub",
      descriptionAr: "مقشر طبيعي فاخر للوجه والجسم، يدمج حبوب القهوة العربية المحمصة والمطحونة بدقة مع زيت جوز الهند العضوي وسكر القصب البني. يزيل خلايا الجلد الميتة، ويحارب السيلوليت والتشققات، ويعيد الحيوية الفائقة لجسمك.",
      descriptionEn: "Luxurious face and body scrub blending finely ground roasted Arabic coffee beans with cold-pressed organic coconut oil and brown cane sugar. Gently exfoliates dead skin cells, targets cellulite, and unlocks silky skin tone.",
      priceSdg: 8500,
      originalPriceSdg: 10000,
      category: "cosmetics",
      images: [
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.8,
      stock: 22,
      scentAr: "القهوة العربية وجوز الهند",
      scentEn: "Rich Roasted Arabic Coffee",
      sizeAr: "300 جرام",
      sizeEn: "300g",
      isFeatured: true,
    },
    {
      nameAr: "جل برادايس المعقم الفعال متعدد الاستخدامات",
      nameEn: "Antiseptic Multi-use Gel",
      descriptionAr: "تركيبة معقمة مركزة من الجل الطبي بمستخلص زيت شجرة الشاي والكافور والصنوبر. مثالي لتعقيم الأسطح والأرضيات والمطابخ في المنازل، ويوفر حماية متكاملة من الجراثيم والميكروبات لجميع سكان مدينة عطبرة.",
      descriptionEn: "High-concentration disinfectant gel enriched with active tea tree oil, pine, and eucalyptus. Excellent for deep cleaning, home surface sanitizing, and absolute hygiene, ensuring reliable germ-killing action.",
      priceSdg: 6000,
      originalPriceSdg: 7500,
      category: "gel",
      images: [
        "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600"
      ],
      rating: 4.7,
      stock: 40,
      scentAr: "الكافور والصنوبر وزيت شجرة الشاي",
      scentEn: "Eucalyptus, Pine & Tea Tree Oil",
      sizeAr: "1 لتر",
      sizeEn: "1 Liter",
      isFeatured: false,
    }
  ];

  // Store inserted product IDs to seed reviews
  for (const prod of seedProducts) {
    const [insertedProduct] = await db.insert(products).values(prod).returning({ id: products.id });
    
    // Seed some nice reviews for each product
    const demoReviews = [
      {
        productId: insertedProduct.id,
        reviewerNameAr: "أحمد عبد الله (عطبرة - حي الداخلة)",
        reviewerNameEn: "Ahmed Abdallah (Atbara - Al-Dakhla)",
        rating: 5,
        commentAr: "منتج رائع جداً وجودة تضاهي المنتجات المستوردة وبسعر معقول ومناسب جداً. التوصيل كان سريعاً والتعامل في قمة الذوق.",
        commentEn: "An amazing product! The quality easily matches imported soaps and the price is very reasonable. Delivery within Atbara was fast and professional.",
      },
      {
        productId: insertedProduct.id,
        reviewerNameAr: "فاطمة محمد (عطبرة - حي السودنة)",
        reviewerNameEn: "Fatima Mohamed (Atbara - Al-Sudana)",
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        commentAr: "الرائحة منعشة ولطيفة للغاية وجلدنا في هذا الصيف الحار كان يحتاج لشيء طبيعي مثل هذا. أنصح الجميع بتجربته وبشدة.",
        commentEn: "The fragrance is incredibly refreshing and natural. In this dry summer, our skin really needed something soothing like this. Highly recommended!",
      }
    ];

    await db.insert(reviews).values(demoReviews);
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  });
