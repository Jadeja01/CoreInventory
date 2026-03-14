import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { Package, AlertTriangle, ArrowDownToLine, Truck, ArrowLeftRight, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const kpis = [
  { title: "Total Products", value: "1,247", change: "+12 this week", changeType: "positive" as const, icon: Package, color: "primary" as const },
  { title: "Low Stock Items", value: "23", change: "5 critical", changeType: "negative" as const, icon: AlertTriangle, color: "accent" as const },
  { title: "Pending Receipts", value: "8", change: "3 arriving today", changeType: "neutral" as const, icon: ArrowDownToLine, color: "blue" as const },
  { title: "Pending Deliveries", value: "15", change: "6 ready to ship", changeType: "neutral" as const, icon: Truck, color: "primary" as const },
];

const recentOperations = [
  { id: "REC-001", type: "Receipt", product: "Steel Rods (50mm)", qty: "+100 kg", status: "done" as const, date: "Today, 2:30 PM" },
  { id: "DEL-042", type: "Delivery", product: "Aluminum Sheets", qty: "-250 pcs", status: "ready" as const, date: "Today, 1:15 PM" },
  { id: "TRF-018", type: "Transfer", product: "Copper Wire (2mm)", qty: "75 m", status: "waiting" as const, date: "Today, 11:00 AM" },
  { id: "ADJ-007", type: "Adjustment", product: "Steel Bolts M8", qty: "-3 pcs", status: "done" as const, date: "Yesterday, 4:45 PM" },
  { id: "REC-002", type: "Receipt", product: "PVC Pipes (4\")", qty: "+200 pcs", status: "draft" as const, date: "Yesterday, 3:20 PM" },
  { id: "DEL-043", type: "Delivery", product: "Glass Panels", qty: "-30 pcs", status: "canceled" as const, date: "Yesterday, 10:00 AM" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Inventory Dashboard</h1>
        <p className="text-muted-foreground text-sm">Real-time overview of your warehouse operations.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search operations..."
            className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Receipts", "Deliveries", "Transfers", "Adjustments"].map((f) => (
            <button
              key={f}
              className="px-3 py-2 rounded-xl text-xs font-medium bg-card border border-border/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors btn-press first:bg-primary/10 first:text-primary first:border-primary/20"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Operations Table */}
      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50">
          <h2 className="text-lg font-semibold">Recent Operations</h2>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="divide-y divide-border/50"
        >
          {recentOperations.map((op) => (
            <motion.div
              key={op.id}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-xs font-mono-tabular text-muted-foreground w-16 shrink-0">{op.id}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{op.product}</p>
                  <p className="text-xs text-muted-foreground">{op.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-sm font-mono-tabular font-medium hidden sm:block">{op.qty}</span>
                <StatusBadge status={op.status} />
                <span className="text-xs text-muted-foreground hidden md:block w-32 text-right">{op.date}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
