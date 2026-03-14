import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Inventory Dashboard
          </h1>
          <p className="text-gray-500">
            Welcome back, {session.user.name}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={session.user.image || "https://i.pravatar.cc/40"}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium capitalize">
            {session.user.role}
          </span>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Total Products
          </h3>
          <p className="text-3xl font-bold mt-2">
            124
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Low Stock
          </h3>
          <p className="text-3xl font-bold mt-2 text-red-500">
            8
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Pending Receipts
          </h3>
          <p className="text-3xl font-bold mt-2">
            5
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">
            Pending Deliveries
          </h3>
          <p className="text-3xl font-bold mt-2">
            3
          </p>
        </div>

      </div>

      {/* Operations Section */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">
            Products
          </h3>
          <p className="text-gray-500 mb-4">
            Manage your product catalog and stock levels.
          </p>

          <a
            href="/dashboard/products"
            className="text-indigo-600 font-medium"
          >
            Manage Products →
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">
            Warehouse Operations
          </h3>
          <p className="text-gray-500 mb-4">
            Handle receipts, transfers, and deliveries.
          </p>

          <a
            href="/dashboard/operations"
            className="text-indigo-600 font-medium"
          >
            View Operations →
          </a>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">
            Stock Adjustments
          </h3>
          <p className="text-gray-500 mb-4">
            Fix mismatches between system and physical stock.
          </p>

          <a
            href="/dashboard/adjustments"
            className="text-indigo-600 font-medium"
          >
            Manage Adjustments →
          </a>
        </div>

      </div>

    </main>
  );
}