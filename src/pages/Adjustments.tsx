import { useEffect, useState } from "react";
import { Plus, Search, Loader2, X } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Adjustment { 
  id: string; 
  record_id: string; 
  product: string; 
  location: string; 
  recorded: number; 
  counted: number; 
  diff: number; 
  reason: string; 
  status: "ready" | "draft" | "waiting" | "done" | "canceled"; 
  date: string; 
}

const initialForm = { 
  record_id: "", 
  product: "", 
  location: "", 
  recorded: 0, 
  counted: 0, 
  reason: "", 
  status: "draft" as const, 
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
};

const container = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.04 } } 
};

export default function Adjustments() {
  const [data, setData] = useState<Adjustment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { 
    fetchData(); 
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: records, error } = await supabase
      .from("adjustments")
      .select("*")
      .order("created_at", { ascending: false });
      
    if (error) {
      toast.error("Error loading adjustments: " + error.message);
    } else {
      setData(records as Adjustment[]);
    }
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Automatically calculate the difference before sending to Supabase
    const submissionData = { 
      ...formData, 
      diff: formData.counted - formData.recorded 
    };
    
    const { error } = await supabase.from("adjustments").insert([submissionData]);
    
    if (error) {
      toast.error("Error: " + error.message);
    } else {
      toast.success("Adjustment added!"); 
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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stock Adjustments</h1>
          <p className="text-muted-foreground text-sm">Reconcile physical counts with recorded stock.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press hover:shadow-ceramic-hover transition-all"
        >
          <Plus className="h-4 w-4" /> 
          New Adjustment
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input 
          placeholder="Search adjustments..." 
          className="w-full bg-card border-2 border-transparent focus:border-primary/30 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none transition-colors shadow-ceramic placeholder:text-muted-foreground" 
        />
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
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading...
                  </td>
                </tr>
              </tbody>
            ) : (
              <motion.tbody variants={container} initial="hidden" animate="show">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                      No adjustments found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  data.map((a) => (
                    <motion.tr 
                      key={a.id} 
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} 
                      className="border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 font-mono-tabular text-xs text-muted-foreground">{a.record_id}</td>
                      <td className="px-6 py-4 font-medium">{a.product}</td>
                      <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{a.location}</td>
                      <td className="px-6 py-4 text-right font-mono-tabular hidden sm:table-cell">{a.recorded}</td>
                      <td className="px-6 py-4 text-right font-mono-tabular hidden sm:table-cell">{a.counted}</td>
                      <td className="px-6 py-4 text-right font-mono-tabular font-medium">
                        <span className={a.diff < 0 ? "text-destructive" : "text-primary"}>
                          {a.diff > 0 ? `+${a.diff}` : a.diff}
                        </span>
                      </td>
                      <td className="px-6 py-4"><StatusBadge status={a.status} /></td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            )}
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-md bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-xl font-semibold">New Adjustment</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4">
              <input required placeholder="Adjustment ID (e.g., ADJ-010)" value={formData.record_id} onChange={e => setFormData({...formData, record_id: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
              <input required placeholder="Product Name" value={formData.product} onChange={e => setFormData({...formData, product: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
              <input required placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground">Recorded</label>
                  <input type="number" required value={formData.recorded} onChange={e => setFormData({...formData, recorded: parseInt(e.target.value) || 0})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Counted</label>
                  <input type="number" required value={formData.counted} onChange={e => setFormData({...formData, counted: parseInt(e.target.value) || 0})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
              </div>
              <input placeholder="Reason (e.g., Damaged)" value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                <option value="draft">Draft</option>
                <option value="done">Done</option>
                <option value="waiting">Waiting</option>
              </select>
              <div className="pt-4 flex justify-end gap-3 border-t border-border/50 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity">
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />} 
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
