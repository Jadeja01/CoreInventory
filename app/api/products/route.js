import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Product.create({
      name: body.name,
      sku: body.sku,
      category: body.category,
      unit: body.unit,
      stock: Number(body.stock) || 0
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Product creation failed" },
      { status: 500 }
    );
  }
}