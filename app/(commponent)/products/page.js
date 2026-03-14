"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    warehouseA: "",
    warehouseB: "",
    reorderLevel: ""
  });

  const fetchProducts = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {

    const product = {
      name: form.name,
      category: form.category,
      price: Number(form.price),

      stock: [
        { location: "WarehouseA", quantity: Number(form.warehouseA) },
        { location: "WarehouseB", quantity: Number(form.warehouseB) }
      ],

      reorderLevel: Number(form.reorderLevel)
    };

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    setShowForm(false);

    fetchProducts();
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between mb-6">

        <h1 className="text-2xl font-semibold">
          Products
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      {/* Product Table */}

      <div className="bg-white border rounded">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Warehouse A</th>
              <th className="p-3 text-left">Warehouse B</th>
              <th className="p-3 text-left">Reorder</th>
            </tr>

          </thead>

          <tbody>

            {products.map((p) => {

              const warehouseA =
                p.stock.find(s => s.location === "WarehouseA")?.quantity || 0;

              const warehouseB =
                p.stock.find(s => s.location === "WarehouseB")?.quantity || 0;

              return (
                <tr key={p._id} className="border-t">

                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{warehouseA}</td>
                  <td className="p-3">{warehouseB}</td>
                  <td className="p-3">{p.reorderLevel}</td>

                </tr>
              );

            })}

          </tbody>

        </table>

      </div>

      {/* Product Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-96">

            <h2 className="text-lg font-semibold mb-4">
              Create Product
            </h2>

            <div className="space-y-3">

              <input
                name="name"
                placeholder="Product Name"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="category"
                placeholder="Category"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="price"
                placeholder="Price"
                type="number"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="warehouseA"
                placeholder="Warehouse A Stock"
                type="number"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="warehouseB"
                placeholder="Warehouse B Stock"
                type="number"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="reorderLevel"
                placeholder="Reorder Level"
                type="number"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

            </div>

            <div className="flex justify-end gap-3 mt-4">

              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={addProduct}
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