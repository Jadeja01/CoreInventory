import { useEffect, useState } from "react";
import { Package, Plus, Search, Filter, Loader2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// 1. Define the TypeScript shape based on your DB and UI
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

export default function Products() {
  // 2. Add State for the DB data
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 3. Fetch data on load
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

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground text-sm">Manage your product catalog and stock levels.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press inner-glow hover:shadow-ceramic-hover transition-all">
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
            
            {/* 4. Handle Loading State gracefully */}
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
                      key={product.id} // Changed to use DB ID
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
    </div>
  );
}
