import clientPromise from "@/lib/mongodb";
import nodemailer from "nodemailer";

export async function POST(req){

 const {email} = await req.json();

 const client = await clientPromise;
 const db = client.db();

 const user = await db.collection("users").findOne({email});

 if(!user){
  return Response.json({error:"User not found"});
 }

 const otp = Math.floor(100000 + Math.random()*900000);

 const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
   user:process.env.EMAIL_USER,
   pass:process.env.EMAIL_PASS
  }
 });

 await transporter.sendMail({
  from:process.env.EMAIL_USER,
  to:email,
  subject:"Password Reset OTP",
  text:`Your OTP is ${otp}`
 });

 await db.collection("users").updateOne(
  {email},
  {
   $set:{
    otp,
    otpExpire: Date.now() + 300000
   }
  }
 );

 return Response.json({success:true});
}