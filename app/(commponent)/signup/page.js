"use client";

import { useRouter } from "next/navigation";

export default function Signup(){

 const router = useRouter();

 async function handleSubmit(e){

  e.preventDefault();

  const data = {
   name: e.target.name.value,
   email: e.target.email.value,
   password: e.target.password.value,
   role: e.target.role.value
  };

  await fetch("/api/auth/signup",{
   method:"POST",
   body:JSON.stringify(data)
  });

  router.push("/login");
 }

 return(

 <div className="min-h-screen flex items-center justify-center bg-gray-100">

  <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-96 space-y-4">

   <h2 className="text-2xl font-bold text-center">Create Account</h2>

   <input name="name" placeholder="Name" className="w-full border p-2 rounded"/>

   <input name="email" placeholder="Email" className="w-full border p-2 rounded"/>

   <input name="password" type="password" placeholder="Password" className="w-full border p-2 rounded"/>

   <select name="role" className="w-full border p-2 rounded">
    <option value="staff">Warehouse Staff</option>
    <option value="inventory_manager">Inventory Manager</option>
   </select>

   <button className="w-full bg-indigo-600 text-white py-2 rounded">
    Sign Up
   </button>

  </form>

 </div>

 )
}