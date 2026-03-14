import { Search } from "lucide-react";
import { motion } from "framer-motion";

const history = [
  { id: "MOV-101", type: "Receipt", product: "Steel Rods (50mm)", from: "Vendor: MetalCo", to: "Warehouse A", qty: "+100 kg", date: "Mar 14, 2:30 PM" },
  { id: "MOV-102", type: "Transfer", product: "Copper Wire (2mm)", from: "Main Warehouse", to: "Production Floor", qty: "75 m", date: "Mar 14, 11:00 AM" },
  { id: "MOV-103", type: "Delivery", product: "Aluminum Sheets", from: "Warehouse A", to: "Customer: BuildRight", qty: "-250 pcs", date: "Mar 14, 1:15 PM" },
  { id: "MOV-104", type: "Adjustment", product: "Steel Bolts M8", from: "Warehouse C", to: "—", qty: "-3 pcs", date: "Mar 13, 4:45 PM" },
  { id: "MOV-105", type: "Receipt", product: "PVC Pipes (4\")", from: "Vendor: PipeTech", to: "Warehouse A", qty: "+200 pcs", date: "Mar 13, 3:20 PM" },
  { id: "MOV-106", type: "Transfer", product: "Steel Bolts M8", from: "Warehouse A", to: "Warehouse B", qty: "500 pcs", date: "Mar 13, 9:00 AM" },
];

const typeColors: Record<string, string> = {
  Receipt: "bg-primary/15 text-primary-foreground",
  Delivery: "bg-accent/30 text-accent-foreground",
  Transfer: "bg-accent-blue/20 text-accent-blue-foreground",
  Adjustment: "bg-muted text-muted-foreground",
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

export default function MoveHistory() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Move History</h1>
        <p className="text-muted-foreground text-sm">Complete ledger of all stock movements.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search history..." className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground" />
      </div>

      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">From</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">To</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Qty</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {history.map((h) => (
                <motion.tr key={h.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{h.id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${typeColors[h.type]}`}>{h.type}</span>
                  </td>
                  <td className="px-6 py-4 font-medium">{h.product}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{h.from}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{h.to}</td>
                  <td className="px-6 py-4 text-right font-mono-tabular font-medium">{h.qty}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{h.date}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
