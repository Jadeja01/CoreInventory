"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <aside className="w-64 bg-white border-r min-h-screen p-6">
        <p className="text-gray-400 text-sm">Loading...</p>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">

      <h2 className="text-sm font-semibold text-gray-400 uppercase mb-6">
        Navigation
      </h2>

      <div className="space-y-4">

        {/* Main Links */}
        <Link href="/dashboard" className="block hover:text-indigo-600">
          Dashboard
        </Link>

        <Link href="/products" className="block hover:text-indigo-600">
          Products
        </Link>

        {/* Operations */}
        <div className="pt-4">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Operations
          </p>

          <div className="space-y-2 ml-2">

            <Link
              href="/operations/receipts"
              className="block hover:text-indigo-600"
            >
              Receipts
            </Link>

            <Link
              href="/operations/deliveries"
              className="block hover:text-indigo-600"
            >
              Delivery Orders
            </Link>

            <Link
              href="/operations/adjustments"
              className="block hover:text-indigo-600"
            >
              Inventory Adjustment
            </Link>

            <Link
              href="/operations/history"
              className="block hover:text-indigo-600"
            >
              Move History
            </Link>

          </div>
        </div>

        {/* Settings */}
        <div className="pt-4">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Settings
          </p>

          <Link
            href="/settings/warehouse"
            className="block hover:text-indigo-600 ml-2"
          >
            Warehouse
          </Link>

        </div>

        {/* Profile Section */}
        <div className="pt-4">

          <p className="text-xs text-gray-400 uppercase mb-2">
            Profile
          </p>

          {session ? (
            <>
              {/* Avatar + Name */}
              <div className="flex items-center gap-3 ml-2 mb-3">
                <img
                  src={session.user?.image || "/default-avatar.png"}
                  alt="avatar"
                  className="w-9 h-9 rounded-full border"
                />

                <div>
                  <p className="text-sm font-medium">
                    {session.user?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {session.user?.email}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                className="block hover:text-indigo-600 ml-2"
              >
                My Profile
              </Link>

              <button
                onClick={() => signOut()}
                className="block text-left w-full hover:text-red-500 ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block hover:text-indigo-600 ml-2"
            >
              Login
            </Link>
          )}

        </div>

      </div>

    </aside>
  );
}