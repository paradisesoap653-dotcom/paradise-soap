import { pgTable, serial, text, integer, boolean, timestamp, jsonb, real } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  priceSdg: integer("price_sdg").notNull(),
  originalPriceSdg: integer("original_price_sdg"),
  category: text("category").notNull(), // 'liquid', 'solid', 'paste', 'gel', 'cosmetics'
  images: jsonb("images").$type<string[]>().notNull(), // JSON array of image URLs
  rating: real("rating").default(5.0),
  stock: integer("stock").notNull().default(20),
  scentAr: text("scent_ar"),
  scentEn: text("scent_en"),
  sizeAr: text("size_ar"),
  sizeEn: text("size_en"),
  isFeatured: boolean("is_featured").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  reviewerNameAr: text("reviewer_name_ar").notNull(),
  reviewerNameEn: text("reviewer_name_en").notNull(),
  rating: integer("rating").notNull(),
  commentAr: text("comment_ar").notNull(),
  commentEn: text("comment_en").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email"),
  districtAr: text("district_ar").notNull(), // Atbara neighborhood
  districtEn: text("district_en").notNull(),
  addressDetails: text("address_details"),
  paymentMethod: text("payment_method").notNull(), // 'bankak', 'cash'
  totalAmount: integer("total_amount").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'confirmed', 'delivered', 'cancelled'
  items: jsonb("items").$type<Array<{
    productId: number;
    nameAr: string;
    nameEn: string;
    priceSdg: number;
    quantity: number;
    image: string;
    sizeAr?: string;
    sizeEn?: string;
  }>>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  reviews: many(reviews),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  product: one(products, {
    fields: [reviews.productId],
    references: [products.id],
  }),
}));
