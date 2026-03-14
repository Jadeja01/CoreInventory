"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Sidebar() {

  return (

    <aside className="w-64 bg-white border-r min-h-screen p-6">

      <h2 className="text-sm font-semibold text-gray-400 uppercase mb-6">
        Navigation
      </h2>

      <div className="space-y-4">

        <Link href="/dashboard" className="block hover:text-indigo-600">
          Dashboard
        </Link>

        <Link href="/products" className="block hover:text-indigo-600">
          Products
        </Link>

        <div className="pt-4">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Operations
          </p>

          <div className="space-y-2 ml-2">

            <Link href="/operations/receipts" className="block hover:text-indigo-600">
              Receipts
            </Link>

            <Link href="/operations/deliveries" className="block hover:text-indigo-600">
              Delivery Orders
            </Link>

            <Link href="/operations/adjustments" className="block hover:text-indigo-600">
              Inventory Adjustment
            </Link>

            <Link href="/operations/history" className="block hover:text-indigo-600">
              Move History
            </Link>

          </div>

        </div>

        <div className="pt-4">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Settings
          </p>

          <Link href="/settings/warehouse" className="block hover:text-indigo-600 ml-2">
            Warehouse
          </Link>

        </div>

        <div className="pt-4">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Profile
          </p>

          <Link href="/profile" className="block hover:text-indigo-600 ml-2">
            My Profile
          </Link>

          <button
            onClick={() => signOut()}
            className="block text-left w-full hover:text-red-500 ml-2"
          >
            Logout
          </button>

        </div>

      </div>

    </aside>
  );
}