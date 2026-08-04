export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  priceSdg: number;
  originalPriceSdg: number | null;
  category: string;
  images: string[];
  rating: number | null;
  stock: number;
  scentAr: string | null;
  scentEn: string | null;
  sizeAr: string | null;
  sizeEn: string | null;
  isFeatured: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    nameAr: "صابون زبدة الشيا الطبيعي",
    nameEn: "Natural Shea Butter Soap",
    descriptionAr:
      "صابون طبيعي 100% مصنوع يدويًا بزبدة الشيا النقية، يمنح البشرة نعومة وترطيبًا عميقًا، مناسب لكل أنواع البشرة.",
    descriptionEn:
      "100% natural handmade soap with pure shea butter for deep skin moisture.",
    priceSdg: 6000,
    originalPriceSdg: null,
    category: "solid",
    images: ["/soap3.jpg"],
    rating: 5,
    stock: 20,
    scentAr: "طبيعي",
    scentEn: "Natural",
    sizeAr: "قطعة 100 جرام",
    sizeEn: "100g bar",
    isFeatured: true,
  },
  {
    id: 2,
    nameAr: "صابون اللافندر الطبيعي",
    nameEn: "Natural Lavender Soap",
    descriptionAr:
      "صابون مهدئ برائحة اللافندر الطبيعية، يساعد على استرخاء البشرة والحواس، مصنوع يدويًا بمكونات طبيعية خالصة.",
    descriptionEn:
      "Calming handmade soap with natural lavender scent, made with pure natural ingredients.",
    priceSdg: 6500,
    originalPriceSdg: null,
    category: "solid",
    images: ["/soap2.jpg"],
    rating: 5,
    stock: 15,
    scentAr: "لافندر",
    scentEn: "Lavender",
    sizeAr: "قطعة 100 جرام",
    sizeEn: "100g bar",
    isFeatured: true,
  },
  {
    id: 3,
    nameAr: "مجموعة الصابون الطبيعي المشكلة",
    nameEn: "Assorted Natural Soap Set",
    descriptionAr:
      "مجموعة متنوعة من الصابون الطبيعي اليدوي بروائح وقوام مختلف، مثالية للتجربة أو كهدية.",
    descriptionEn:
      "A varied set of handmade natural soaps with different scents, perfect to try or gift.",
    priceSdg: 3500,
    originalPriceSdg: null,
    category: "solid",
    images: ["/soap1.jpg"],
    rating: 5,
    stock: 10,
    scentAr: "متنوع",
    scentEn: "Assorted",
    sizeAr: "مجموعة 3 قطع",
    sizeEn: "Set of 3",
    isFeatured: false,
  },
];
