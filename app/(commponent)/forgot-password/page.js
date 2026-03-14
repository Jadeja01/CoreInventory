"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword(){

 const [email,setEmail]=useState("");
 const router = useRouter();

 async function sendOtp(){

  await fetch("/api/auth/send-otp",{
   method:"POST",
   body:JSON.stringify({email})
  });

  router.push(`/reset-password?email=${email}`);
 }

 return(

 <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <div className="bg-white p-8 rounded-xl shadow w-96">

   <h2 className="text-xl font-bold mb-4 text-center">
    Forgot Password
   </h2>

   <input
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    placeholder="Enter your email"
    className="w-full border p-2 rounded mb-4"
   />

   <button
    onClick={sendOtp}
    className="w-full bg-indigo-600 text-white py-2 rounded"
   >
    Send OTP
   </button>

  </div>

 </div>

 );

}