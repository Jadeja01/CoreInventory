import { Plus, Search } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";

const adjustments = [
  { id: "ADJ-007", product: "Steel Bolts M8", location: "Warehouse C", recorded: 50, counted: 47, diff: -3, reason: "Damaged", status: "done" as const, date: "Mar 13, 2026" },
  { id: "ADJ-008", product: "Rubber Gaskets (SM)", location: "Warehouse A", recorded: 15, counted: 0, diff: -15, reason: "Missing", status: "done" as const, date: "Mar 12, 2026" },
  { id: "ADJ-009", product: "PVC Pipes (4\")", location: "Warehouse A", recorded: 330, counted: 340, diff: 10, reason: "Recount", status: "draft" as const, date: "Mar 14, 2026" },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

export default function Adjustments() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stock Adjustments</h1>
          <p className="text-muted-foreground text-sm">Reconcile physical counts with recorded stock.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press inner-glow hover:shadow-ceramic-hover transition-all">
          <Plus className="h-4 w-4" />
          New Adjustment
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search adjustments..." className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground" />
      </div>

      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Recorded</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Counted</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Diff</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {adjustments.map((a) => (
                <motion.tr key={a.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{a.id}</td>
                  <td className="px-6 py-4 font-medium">{a.product}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{a.location}</td>
                  <td className="px-6 py-4 text-right font-mono-tabular hidden sm:table-cell">{a.recorded}</td>
                  <td className="px-6 py-4 text-right font-mono-tabular hidden sm:table-cell">{a.counted}</td>
                  <td className="px-6 py-4 text-right font-mono-tabular font-medium">
                    <span className={a.diff < 0 ? "text-destructive" : "text-primary"}>{a.diff > 0 ? `+${a.diff}` : a.diff}</span>
                  </td>
                  <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
