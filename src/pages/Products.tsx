import { useEffect, useState } from "react";
import { Package, Plus, Search, Filter, Loader2, X } from "lucide-react"; // NEW: Imported 'X' for the close button
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  uom: string;
  stock: number;
  location: string;
  status: "ready" | "draft" | "waiting" | "canceled";
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

// NEW: Default state for a blank form
const initialFormState = {
  name: "",
  sku: "",
  category: "Raw Materials",
  uom: "pcs",
  stock: 0,
  location: "Warehouse A",
  status: "ready" as const,
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // NEW: State to control the modal and form data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setProducts(data as Product[]);
    } catch (error: any) {
      toast.error("Failed to load inventory: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // NEW: Function to handle form submission
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Insert the data into Supabase
      const { error } = await supabase
        .from("products")
        .insert([formData]);

      if (error) throw error;

      // 2. Success! Show a toast, close modal, clear form, and refresh the list
      toast.success("Product added successfully!");
      setIsModalOpen(false);
      setFormData(initialFormState);
      fetchProducts(); 
      
    } catch (error: any) {
      toast.error("Failed to add product: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground text-sm">Manage your product catalog and stock levels.</p>
        </div>
        
        {/* NEW: Added onClick handler to open the modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press inner-glow hover:shadow-ceramic-hover transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search by name or SKU..."
            className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground"
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-card border border-border/50 text-muted-foreground hover:bg-muted transition-colors btn-press">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">SKU</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Location</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading inventory...
                  </td>
                </tr>
              </tbody>
            ) : (
              <motion.tbody variants={container} initial="hidden" animate="show">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                      No products found. Add one to get started!
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <motion.tr
                      key={product.id}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{product.sku}</td>
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{product.category}</td>
                      <td className="px-6 py-4 text-right font-mono-tabular font-medium">
                        <span className={product.stock <= 5 ? "text-destructive" : ""}>
                          {product.stock} <span className="text-muted-foreground text-xs">{product.uom}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{product.location}</td>
                      <td className="px-6 py-4"><StatusBadge status={product.status} /></td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            )}
          </table>
        </div>
      </div>

      {/* NEW: The Add Product Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold">Add New Product</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. Copper Wire (2mm)"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">SKU</label>
                  <input
                    required
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g. CW-02-018"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Raw Materials">Raw Materials</option>
                    <option value="Components">Components</option>
                    <option value="Finished Goods">Finished Goods</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Initial Stock</label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Unit of Measure</label>
                  <select
                    value={formData.uom}
                    onChange={(e) => setFormData({ ...formData, uom: e.target.value })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="pcs">Pieces (pcs)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="m">Meters (m)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="Warehouse A">Warehouse A</option>
                    <option value="Warehouse B">Warehouse B</option>
                    <option value="Warehouse C">Warehouse C</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="ready">Ready</option>
                    <option value="draft">Draft</option>
                    <option value="waiting">Waiting</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-border/50 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg shadow-ceramic hover:shadow-ceramic-hover transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
