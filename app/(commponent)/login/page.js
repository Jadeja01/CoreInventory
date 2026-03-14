"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  async function handleSubmit(e){

    e.preventDefault();

    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    const res = await signIn("credentials",{
      email,
      password,
      redirect:false
    });

    setLoading(false);

    if(res.error){
      setError("Invalid email or password");
    }else{
      window.location.href="/dashboard";
    }

  }

  return (

  <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <div className="bg-white p-8 rounded-xl shadow w-96">

      <h2 className="text-2xl font-bold text-center mb-6">
        Inventory Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <div className="text-center mt-4">

        <a
          href="/forgot-password"
          className="text-sm text-indigo-600 hover:underline"
        >
          Forgot Password?
        </a>

      </div>

    </div>

  </div>

  );
}