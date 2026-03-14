import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req){

 const {email,otp,newPassword} = await req.json();

 await connectDB();

 const user = await User.findOne({email});

 if(!user){
  return Response.json({error:"User not found"});
 }

 if(user.otp != otp){
  return Response.json({error:"Invalid OTP"});
 }

 if(Date.now() > user.otpExpire){
  return Response.json({error:"OTP expired"});
 }

 user.password = newPassword;
 user.otp = null;
 user.otpExpire = null;

 await user.save();

 return Response.json({success:true});
}