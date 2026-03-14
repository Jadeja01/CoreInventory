import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import nodemailer from "nodemailer";

export async function POST(req){

 const {email} = await req.json();

 await connectDB();

 const user = await User.findOne({email});

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

 user.otp = otp;
 user.otpExpire = Date.now() + 300000;

 await user.save();

 return Response.json({success:true});
}