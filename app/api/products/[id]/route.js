import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {

  await connectDB();

  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(
    params.id,
    body,
    { new: true }
  );

  return NextResponse.json(updated);

}