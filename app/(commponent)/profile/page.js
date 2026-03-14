"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Profile() {

  const { data: session, status } = useSession();
    const emailInitial = session?.user?.name?.[0].toUpperCase() ?? "?";

  if (status === "loading") {
    return <div className="p-10">Loading...</div>;
  }

  if (!session) {
    redirect("/login");
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96 text-center">

        <div className="w-24 h-24 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
          {emailInitial}
        </div>

        <h2 className="text-xl font-bold">
          {session.user?.name}
        </h2>

        <p className="text-gray-500 mb-2">
          {session.user?.email}
        </p>

        <p className="text-indigo-600 font-medium capitalize mb-6">
          {session.user?.role}
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}