import { Package, Plus, Search, Filter } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";

const products = [
  { sku: "STL-ROD-50", name: "Steel Rods (50mm)", category: "Raw Materials", uom: "kg", stock: 450, location: "Warehouse A", status: "ready" as const },
  { sku: "ALM-SHT-2M", name: "Aluminum Sheets (2m)", category: "Raw Materials", uom: "pcs", stock: 120, location: "Warehouse A", status: "ready" as const },
  { sku: "CPR-WRE-2M", name: "Copper Wire (2mm)", category: "Raw Materials", uom: "m", stock: 8, location: "Warehouse B", status: "draft" as const },
  { sku: "PVC-PPE-4I", name: "PVC Pipes (4\")", category: "Finished Goods", uom: "pcs", stock: 340, location: "Warehouse A", status: "ready" as const },
  { sku: "STL-BLT-M8", name: "Steel Bolts M8", category: "Components", uom: "pcs", stock: 3, location: "Warehouse C", status: "waiting" as const },
  { sku: "GLS-PNL-1M", name: "Glass Panels (1m)", category: "Finished Goods", uom: "pcs", stock: 55, location: "Warehouse B", status: "ready" as const },
  { sku: "RBR-GSK-SM", name: "Rubber Gaskets (SM)", category: "Components", uom: "pcs", stock: 0, location: "Warehouse A", status: "canceled" as const },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

export default function Products() {
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
            <motion.tbody variants={container} initial="hidden" animate="show">
              {products.map((product) => (
                <motion.tr
                  key={product.sku}
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
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
