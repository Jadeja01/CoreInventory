import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(req){

 const {name,email,password,role} = await req.json();

 const client = await clientPromise;
 const db = client.db();

 const existing = await db.collection("users").findOne({email});

 if(existing){
  return Response.json({error:"User already exists"});
 }

 const hashedPassword = await bcrypt.hash(password,10);

 await db.collection("users").insertOne({
  name,
  email,
  password: hashedPassword,
  role: role || "staff",
  provider: "credentials",
  createdAt: new Date()
 });

 return Response.json({success:true});
}