import { useEffect, useState } from "react";
import { Plus, Search, Loader2, X } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Transfer { id: string; record_id: string; from_loc: string; to_loc: string; product: string; qty: string; status: "ready" | "draft" | "waiting" | "done" | "canceled"; date: string; }
const initialForm = { record_id: "", from_loc: "", to_loc: "", product: "", qty: "", status: "draft" as const, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

export default function Transfers() {
  const [data, setData] = useState<Transfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: records, error } = await supabase.from("transfers").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setData(records as Transfer[]);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("transfers").insert([formData]);
    if (error) toast.error(error.message);
    else { toast.success("Transfer added!"); setIsModalOpen(false); setFormData(initialForm); fetchData(); }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Internal Transfers</h1><p className="text-muted-foreground text-sm">Move stock between warehouses and locations.</p></div>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press hover:shadow-ceramic-hover transition-all"><Plus className="h-4 w-4" /> New Transfer</button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search transfers..." className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground" />
      </div>

      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">ID</th><th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">From</th><th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">To</th><th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase hidden md:table-cell">Product</th><th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Qty</th><th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase">Status</th>
              </tr>
            </thead>
            {loading ? <tbody><tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />Loading...</td></tr></tbody> : (
            <motion.tbody variants={container} initial="hidden" animate="show">
              {data.map((t) => (
                <motion.tr key={t.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{t.record_id}</td><td className="px-6 py-4 font-medium">{t.from_loc}</td><td className="px-6 py-4 font-medium">{t.to_loc}</td><td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{t.product}</td><td className="px-6 py-4 text-right font-mono-tabular font-medium">{t.qty}</td><td className="px-6 py-4"><StatusBadge status={t.status} /></td>
                </motion.tr>
              ))}
            </motion.tbody>
            )}
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border/50"><h2 className="text-xl font-semibold">New Transfer</h2><button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:bg-muted rounded-full"><X className="h-5 w-5" /></button></div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <input required placeholder="Transfer ID (e.g., TRF-022)" value={formData.record_id} onChange={e => setFormData({...formData, record_id: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="From Location" value={formData.from_loc} onChange={e => setFormData({...formData, from_loc: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="To Location" value={formData.to_loc} onChange={e => setFormData({...formData, to_loc: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="Product" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="Quantity (e.g., 50 m)" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm">
                <option value="draft">Draft</option><option value="ready">Ready</option><option value="done">Done</option>
              </select>
              <div className="pt-4 flex justify-end gap-3 border-t border-border/50"><button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg">Cancel</button><button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm text-primary-foreground bg-primary rounded-lg flex items-center gap-2">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Save</button></div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
