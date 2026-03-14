"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProductsPage() {

  const { data: session, status } = useSession();

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    unit: "",
    stock: ""
  });

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    if (session) fetchProducts();
  }, [session]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createProduct = async () => {

    if (!form.name || !form.sku || !form.category || !form.unit) {
      alert("Please fill all required fields");
      return;
    }

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...form,
        stock: Number(form.stock) || 0
      })
    });

    if (!res.ok) {
      alert("Failed to create product");
      return;
    }

    setOpen(false);

    setForm({
      name: "",
      sku: "",
      category: "",
      unit: "",
      stock: ""
    });

    fetchProducts();
  };

  if (status === "loading") {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!session) {
    return (
      <div className="p-10 text-center">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-semibold">Products</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      <div className="bg-white border rounded">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Unit</th>
              <th className="p-3 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>

            {products.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (

              products.map((p) => (
                <tr key={p._id} className="border-t">

                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.sku}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.unit}</td>
                  <td className="p-3">{p.stock}</td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

      {open && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-lg font-semibold mb-4">
              Create Product
            </h2>

            <div className="space-y-3">

              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="sku"
                placeholder="SKU / Code"
                value={form.sku}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="unit"
                placeholder="Unit of Measure (pcs, kg, pack)"
                value={form.unit}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="stock"
                type="number"
                placeholder="Initial Stock"
                value={form.stock}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

            </div>

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={createProduct}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}