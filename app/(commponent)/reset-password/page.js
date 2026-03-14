"use client";

import { useState } from "react";
import { useSearchParams,useRouter } from "next/navigation";

export default function ResetPassword(){

 const params = useSearchParams();
 const email = params.get("email");

 const router = useRouter();

 const [otp,setOtp]=useState("");
 const [password,setPassword]=useState("");

 async function reset(){

  const res = await fetch("/api/auth/reset-password",{
   method:"POST",
   body:JSON.stringify({
    email,
    otp,
    newPassword:password
   })
  });

  const data = await res.json();

  if(data.success){
   alert("Password updated");
   router.push("/login");
  }else{
   alert(data.error);
  }

 }

 return(

 <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <div className="bg-white p-8 rounded-xl shadow w-96">

   <h2 className="text-xl font-bold mb-4 text-center">
    Reset Password
   </h2>

   <input
    placeholder="OTP"
    value={otp}
    onChange={(e)=>setOtp(e.target.value)}
    className="w-full border p-2 rounded mb-3"
   />

   <input
    type="password"
    placeholder="New Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    className="w-full border p-2 rounded mb-4"
   />

   <button
    onClick={reset}
    className="w-full bg-indigo-600 text-white py-2 rounded"
   >
    Reset Password
   </button>

  </div>

 </div>

 );

}