"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login(){

 const [error,setError]=useState("");

 async function handleSubmit(e){

  e.preventDefault();

  const email=e.target.email.value;
  const password=e.target.password.value;

  const res=await signIn("credentials",{
   email,
   password,
   redirect:false
  });

  if(res.error){
   setError("Invalid credentials");
  }else{
   window.location.href="/dashboard";
  }

 }

 return(

 <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <form
   onSubmit={handleSubmit}
   className="bg-white p-8 rounded-xl shadow w-96 space-y-4"
  >

   <h2 className="text-xl font-bold text-center">
    Inventory Login
   </h2>

   <input
    name="email"
    type="email"
    placeholder="Email"
    className="w-full border p-2 rounded"
   />

   <input
    name="password"
    type="password"
    placeholder="Password"
    className="w-full border p-2 rounded"
   />

   {error && (
    <p className="text-red-500 text-sm">{error}</p>
   )}

   <button className="w-full bg-indigo-600 text-white py-2 rounded">
    Login
   </button>

   <a
    href="/forgot-password"
    className="text-sm text-indigo-600"
   >
    Forgot Password?
   </a>

  </form>

 </div>

 )
}