import { useEffect, useState } from "react";
import { Plus, Search, Loader2, X } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Receipt {
  id: string;
  record_id: string;
  supplier: string;
  products: string;
  qty: string;
  status: "ready" | "draft" | "waiting" | "done" | "canceled";
  date: string;
}

const initialForm = { record_id: "", supplier: "", products: "", qty: "", status: "waiting" as const, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

export default function Receipts() {
  const [data, setData] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: records, error } = await supabase.from("receipts").select("*").order("created_at", { ascending: false });
    if (error) toast.error("Error loading receipts: " + error.message);
    else setData(records as Receipt[]);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("receipts").insert([formData]);
    if (error) toast.error("Error: " + error.message);
    else {
      toast.success("Receipt added!");
      setIsModalOpen(false);
      setFormData(initialForm);
      fetchData();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Receipts</h1>
          <p className="text-muted-foreground text-sm">Track incoming goods from suppliers.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press inner-glow hover:shadow-ceramic-hover transition-all">
          <Plus className="h-4 w-4" /> New Receipt
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search receipts..." className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground" />
      </div>

      <div className="bg-card rounded-2xl shadow-ceramic border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">ID</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Supplier</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Products</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quantity</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            {loading ? <tbody><tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />Loading...</td></tr></tbody> : (
            <motion.tbody variants={container} initial="hidden" animate="show">
              {data.map((r) => (
                <motion.tr key={r.id} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{r.record_id}</td>
                  <td className="px-6 py-4 font-medium">{r.supplier}</td>
                  <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{r.products}</td>
                  <td className="px-6 py-4 text-right font-mono-tabular font-medium">{r.qty}</td>
                  <td className="px-6 py-4"><StatusBadge status={r.status} /></td>
                  <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{r.date}</td>
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
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold">New Receipt</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <input required placeholder="Receipt ID (e.g., REC-006)" value={formData.record_id} onChange={e => setFormData({...formData, record_id: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="Supplier Name" value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="Products (e.g., Steel Rods)" value={formData.products} onChange={e => setFormData({...formData, products: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <input required placeholder="Quantity (e.g., 100 kg)" value={formData.qty} onChange={e => setFormData({...formData, qty: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm" />
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm">
                <option value="waiting">Waiting</option>
                <option value="done">Done</option>
                <option value="draft">Draft</option>
              </select>
              <div className="pt-4 flex justify-end gap-3 border-t border-border/50">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm text-primary-foreground bg-primary rounded-lg flex items-center gap-2">{isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
