import clientPromise from "@/lib/mongodb";

export async function POST(req){

 const {email,otp,newPassword} = await req.json();

 const client = await clientPromise;
 const db = client.db();

 const user = await db.collection("users").findOne({email});

 if(!user){
  return Response.json({error:"User not found"});
 }

 if(user.otp != otp){
  return Response.json({error:"Invalid OTP"});
 }

 if(Date.now() > user.otpExpire){
  return Response.json({error:"OTP expired"});
 }

 await db.collection("users").updateOne(
  {email},
  {
   $set:{password:newPassword},
   $unset:{otp:"",otpExpire:""}
  }
 );

 return Response.json({success:true});
}