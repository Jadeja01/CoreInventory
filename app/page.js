import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-white shadow">
        <h1 className="text-2xl font-bold text-indigo-600">
          CoreInventory
        </h1>

        <div className="flex items-center gap-6">
          <a className="hover:text-indigo-600 cursor-pointer">Features</a>
          <a className="hover:text-indigo-600 cursor-pointer">About</a>
          <a className="hover:text-indigo-600 cursor-pointer">Contact</a>

          <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Login
          </button>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-10 py-24 flex flex-col md:flex-row items-center justify-between">

        <div className="max-w-xl">
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Smart Inventory <br/> Management System
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            Digitize your warehouse operations and track products
            in real-time with a powerful inventory management platform.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Get Started
            </button>

            <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
              Live Demo
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d"
            alt="warehouse"
            className="w-[500px] rounded-xl shadow-lg"
          />
        </div>

      </section>


      {/* Features */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-10 text-center">

          <h2 className="text-4xl font-bold mb-14">
            Powerful Inventory Features
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">
                Product Management
              </h3>
              <p className="text-gray-600">
                Create products, manage SKUs, track stock levels,
                and organize items by categories.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">
                Warehouse Operations
              </h3>
              <p className="text-gray-600">
                Handle incoming receipts, delivery orders,
                internal transfers, and stock adjustments.
              </p>
            </div>

            <div className="p-8 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3">
                Real-time Dashboard
              </h3>
              <p className="text-gray-600">
                Monitor low stock alerts, deliveries,
                and warehouse activity instantly.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Dashboard Preview */}
      <section className="py-24 max-w-6xl mx-auto px-10 text-center">

        <h2 className="text-4xl font-bold mb-6">
          All Inventory Data in One Dashboard
        </h2>

        <p className="text-gray-600 mb-12">
          Track stock movements, manage warehouses,
          and monitor operations with powerful analytics.
        </p>

        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          alt="dashboard"
          className="rounded-xl shadow-lg"
        />

      </section>


      {/* CTA */}
      <section className="bg-indigo-600 text-white py-20 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Start Managing Inventory Smarter
        </h2>

        <p className="mb-8 text-lg">
          Replace spreadsheets and manual registers with
          a modern inventory system.
        </p>

        <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
          Create Free Account
        </button>

      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <p>© 2026 CoreInventory. All rights reserved.</p>
      </footer>

    </main>
  );
}
