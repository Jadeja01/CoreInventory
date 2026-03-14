"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navigation() {
  const { data: session } = useSession();
  const [openMenu, setOpenMenu] = useState(false);

  const getInitial = () => {
    const name = session?.user?.name || session?.user?.email || "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <>
      {/* NAVBAR */}

      <nav className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">

        <Link href="/dashboard" className="text-xl font-bold text-indigo-600">
          CoreInventory
        </Link>

        {/* Linear Navigation */}

        <div className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-indigo-600">Products</Link>
          <Link href="/receipts" className="hover:text-indigo-600">Receipts</Link>
          <Link href="/delivery" className="hover:text-indigo-600">Delivery Orders</Link>
          <Link href="/adjustment" className="hover:text-indigo-600">Inventory Adjustment</Link>
          <Link href="/moves" className="hover:text-indigo-600">Move History</Link>
          <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
          <Link href="/settings/warehouse" className="hover:text-indigo-600">Settings</Link>
        </div>

        {/* Avatar */}

        {session && (
          <div
            onClick={() => setOpenMenu(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-semibold cursor-pointer hover:bg-indigo-700"
          >
            {getInitial()}
          </div>
        )}
      </nav>

      {/* DARK OVERLAY */}

      {openMenu && (
        <div
          onClick={() => setOpenMenu(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      {/* SLIDE SIDEBAR */}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 
        ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">

          <h2 className="text-lg font-semibold mb-6">Profile Menu</h2>

          <ul className="space-y-3">

            <li>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => setOpenMenu(false)}
              >
                My Profile
              </Link>
            </li>

            <li>
              <button
                onClick={() => signOut()}
                className="w-full text-left px-3 py-2 rounded text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </li>

          </ul>

        </div>
      </div>
    </>
  );
}