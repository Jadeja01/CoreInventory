"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Navbar() {

  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">

      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-indigo-600">
        CoreInventory
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">

        <Link href="/features" className="hover:text-indigo-600">
          Features
        </Link>

        <Link href="/about" className="hover:text-indigo-600">
          About
        </Link>

        <Link href="/contact" className="hover:text-indigo-600">
          Contact
        </Link>

        {/* If user logged in */}
        {session ? (

          <Link href="/profile">

            <img
              src={session.user?.image || "https://i.pravatar.cc/40"}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
            />

          </Link>

        ) : (

          <Link
            href="/login"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Login
          </Link>

        )}

      </div>

    </nav>
  );
}