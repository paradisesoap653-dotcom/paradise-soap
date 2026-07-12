import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      districtAr,
      districtEn,
      addressDetails,
      paymentMethod,
      totalAmount,
      items,
    } = body;

    // Basic Validation
    if (!customerName || !customerPhone || !districtAr || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields or empty cart" },
        { status: 400 }
      );
    }

    // Begin single database insert and stock adjustment
    // Since we are using standard Postgres, we can do these sequentially or within a transaction
    const [newOrder] = await db
      .insert(orders)
      .values({
        customerName,
        customerPhone,
        customerEmail,
        districtAr,
        districtEn,
        addressDetails,
        paymentMethod,
        totalAmount,
        items,
        status: "pending",
      })
      .returning();

    // Decrement stock for each item ordered
    for (const item of items) {
      try {
        await db
          .update(products)
          .set({
            stock: sql`GREATEST(0, ${products.stock} - ${item.quantity})`,
          })
          .where(eq(products.id, item.productId));
      } catch (stockErr) {
        console.warn(`Failed to update stock for product ID ${item.productId}:`, stockErr);
        // Continue order processing even if stock update fails so the customer doesn't lose their purchase
      }
    }

    return NextResponse.json(
      { message: "Order created successfully", order: newOrder },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
