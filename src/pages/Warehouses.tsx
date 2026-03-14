import { Plus, Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const warehouses = [
  { name: "Warehouse A", code: "WH-A", locations: 12, products: 847, capacity: "84%", address: "Industrial Zone, Block 3" },
  { name: "Warehouse B", code: "WH-B", locations: 8, products: 312, capacity: "62%", address: "Industrial Zone, Block 7" },
  { name: "Warehouse C", code: "WH-C", locations: 5, products: 88, capacity: "35%", address: "Downtown Storage, Unit 2" },
  { name: "Production Floor", code: "PROD", locations: 3, products: 24, capacity: "40%", address: "Main Factory, Level 1" },
];

export default function Warehouses() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Warehouses</h1>
          <p className="text-muted-foreground text-sm">Manage your warehouse locations and capacity.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press inner-glow hover:shadow-ceramic-hover transition-all">
          <Plus className="h-4 w-4" />
          Add Warehouse
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {warehouses.map((wh, i) => (
          <motion.div
            key={wh.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-card rounded-2xl p-6 shadow-ceramic border border-border/50 hover:shadow-ceramic-hover transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">{wh.name}</h3>
                <p className="text-xs font-mono-tabular text-muted-foreground">{wh.code}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold font-mono-tabular">{wh.capacity}</p>
                <p className="text-xs text-muted-foreground">capacity</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
              <MapPin className="h-3 w-3" />
              {wh.address}
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="font-mono-tabular font-semibold">{wh.locations}</span>
                <span className="text-muted-foreground ml-1">locations</span>
              </div>
              <div>
                <span className="font-mono-tabular font-semibold">{wh.products}</span>
                <span className="text-muted-foreground ml-1">products</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
