import { Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";

const deliveries = [
  { id: "DEL-042", customer: "BuildRight Corp", products: "Aluminum Sheets", qty: "250 pcs", status: "ready" as const, date: "Mar 14, 2026" },
  { id: "DEL-043", customer: "HomeFit Solutions", products: "Glass Panels", qty: "30 pcs", status: "canceled" as const, date: "Mar 13, 2026" },
  { id: "DEL-044", customer: "StructurePro", products: "Steel Rods (50mm)", qty: "80 kg", status: "waiting" as const, date: "Mar 14, 2026" },
  { id: "DEL-045", customer: "QuickBuild Inc", products: "PVC Pipes (4\")", qty: "100 pcs", status: "done" as const, date: "Mar 12, 2026" },
  { id: "DEL-046", customer: "MetalWorks Ltd", products: "Copper Wire (2mm)", qty: "50 m", status: "draft" as const, date: "Mar 14, 2026" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

export default function Deliveries() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Delivery Orders</h1>
          <p className="text-muted-foreground text-sm">Manage outgoing shipments to customers.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press inner-glow hover:shadow-ceramic-hover transition-all">
          <Plus className="h-4 w-4" />
          New Delivery
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search deliveries..." className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground" />
      </div>

      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Products</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quantity</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {deliveries.map((d) => (
                <motion.tr key={d.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{d.id}</td>
                  <td className="px-6 py-4 font-medium">{d.customer}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{d.products}</td>
                  <td className="px-6 py-4 text-right font-mono-tabular font-medium">{d.qty}</td>
                  <td className="px-6 py-4"><StatusBadge status={d.status} /></td>
                  <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{d.date}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
