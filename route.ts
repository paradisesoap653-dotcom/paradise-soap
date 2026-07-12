import { NextResponse } from "next/server";
import { db } from "@/db";
import { reviews, products } from "@/db/schema";
import { eq, avg } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, reviewerName, rating, comment } = body;

    if (!productId || !reviewerName || !rating || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert the review
    // Since we receive reviewerName and comment, we can store it in both Arabic and English fields 
    // or parse accordingly. Let's duplicate it into both so it works seamlessly on either locale.
    const [newReview] = await db
      .insert(reviews)
      .values({
        productId: parseInt(productId),
        reviewerNameAr: reviewerName,
        reviewerNameEn: reviewerName,
        rating: parseInt(rating),
        commentAr: comment,
        commentEn: comment,
      })
      .returning();

    // Recalculate average rating for this product
    try {
      const result = await db
        .select({ average: avg(reviews.rating) })
        .from(reviews)
        .where(eq(reviews.productId, parseInt(productId)));

      if (result && result[0] && result[0].average) {
        const newAvg = parseFloat(parseFloat(result[0].average).toFixed(1));
        await db
          .update(products)
          .set({ rating: newAvg })
          .where(eq(products.id, parseInt(productId)));
      }
    } catch (avgErr) {
      console.warn("Failed to update average rating:", avgErr);
    }

    return NextResponse.json(
      { message: "Review added successfully", review: newReview },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Review insertion failed:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
