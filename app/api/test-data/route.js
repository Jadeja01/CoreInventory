import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function GET(){

  await connectDB();

  await Product.insertMany([
    {name:"Keyboard",sku:"P1",quantity:20,minStock:5},
    {name:"Mouse",sku:"P2",quantity:3,minStock:5},
    {name:"Monitor",sku:"P3",quantity:0,minStock:5}
  ]);

  return Response.json({message:"Seeded"});
}