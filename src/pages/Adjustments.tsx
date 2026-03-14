import { useEffect, useState } from "react";
import { Plus, Search, Loader2, X } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface Adjustment { id: string; record_id: string; product: string; location: string; recorded: number; counted: number; diff: number; reason: string; status: "ready" | "draft" | "waiting" | "done" | "canceled"; date: string; }
const initialForm = { record_id: "", product: "", location: "", recorded: 0, counted: 0, reason: "", status: "draft" as const, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };

export default function Adjustments() {
  const [data, setData] = useState<Adjustment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: records, error } = await supabase.from("adjustments").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message); else setData(records as Adjustment[]);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Calculate difference automatically before saving
    const submissionData = { ...formData, diff: formData.counted - formData.recorded };
    
    const { error } = await supabase.from("adjustments").insert([submissionData]);
    if (error) toast.error(error.message);
    else { toast.success("Adjustment added!"); setIsModalOpen(false); setFormData(initialForm); fetchData(); }
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stock Adjustments</h1><p className="text-muted-foreground text-sm">Reconcile physical counts with recorded stock.</p></div>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold shadow-ceramic btn-press hover:shadow-ceramic-hover transition-all"><Plus className="h-4 w-4" /> New Adjustment</button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left
