"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

/* Status styles */

const STATUS_STYLES = {
  Done: "bg-green-50 text-green-800 ring-green-200",
  Ready: "bg-blue-50 text-blue-800 ring-blue-200",
  Waiting: "bg-amber-50 text-amber-800 ring-amber-200",
  Draft: "bg-gray-100 text-gray-600 ring-gray-200",
};

/* KPI config */

const KPI_CONFIG = [
  { key: "totalProducts", label: "Total Products", accent: "bg-blue-500", value: "text-blue-700" },
  { key: "lowStock", label: "Low Stock", accent: "bg-amber-500", value: "text-amber-700" },
  { key: "outOfStock", label: "Out of Stock", accent: "bg-red-500", value: "text-red-700" },
  { key: "pendingReceipts", label: "Pending Receipts", accent: "bg-teal-500", value: "text-teal-700" },
  { key: "pendingDeliveries", label: "Pending Deliveries", accent: "bg-orange-500", value: "text-orange-700" },
  { key: "scheduledTransfers", label: "Internal Transfers", accent: "bg-violet-500", value: "text-violet-700" },
];

/* Components */

function KpiCard({ label, value, accent, valueColor }) {
  return (
    <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-5">
      <div className={`absolute inset-y-0 left-0 w-1 ${accent} rounded-r`} />

      <p className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-2 pl-2">
        {label}
      </p>

      <p className={`text-3xl font-semibold pl-2 ${valueColor}`}>
        {value ?? "—"}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.Draft;

  return (
    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${styles}`}>
      {status}
    </span>
  );
}

function TypePill({ type }) {
  return (
    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
      {type}
    </span>
  );
}

/* Dashboard */
export default function Dashboard() {

  const { data: session, status } = useSession();

  const [kpi, setKpi] = useState(null);
  const [operations, setOperations] = useState([]);

  const [filters, setFilters] = useState({
    type: "All Types",
    status: "All Status",
    warehouse: "All Warehouses",
  });

  /* Load KPI */

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setKpi);
  }, []);

  /* Load operations */

  useEffect(() => {

    const query = new URLSearchParams(filters).toString();

    fetch(`/api/operations?${query}`)
      .then((res) => res.json())
      .then(setOperations);

  }, [filters]);

  /* SESSION CHECK AFTER HOOKS */

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Checking authentication...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Please login to access the dashboard.
      </div>
    );
  }

  if (!kpi) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  /* UI continues here */

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10 space-y-8 max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Warehouse Dashboard
        </h1>

      </div>

      {/* KPI Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {KPI_CONFIG.map(({ key, label, accent, value }) => (
          <KpiCard
            key={key}
            label={label}
            value={kpi[key]}
            accent={accent}
            valueColor={value}
          />
        ))}
      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">

        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
            Filters
          </h2>
        </div>

        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

          <select
            value={filters.type}
            onChange={(e)=>setFilters({...filters,type:e.target.value})}
            className="w-full text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
          >
            <option>All Types</option>
            <option>Receipt</option>
            <option>Delivery</option>
            <option>Transfer</option>
          </select>

          <select
            value={filters.status}
            onChange={(e)=>setFilters({...filters,status:e.target.value})}
            className="w-full text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
          >
            <option>All Status</option>
            <option>Draft</option>
            <option>Waiting</option>
            <option>Ready</option>
            <option>Done</option>
          </select>

          <select
            value={filters.warehouse}
            onChange={(e)=>setFilters({...filters,warehouse:e.target.value})}
            className="w-full text-sm rounded-lg border border-gray-200 bg-gray-50 px-3 py-2"
          >
            <option>All Warehouses</option>
            <option>Warehouse A</option>
            <option>Warehouse B</option>
          </select>

        </div>

      </div>

      {/* Operations Table */}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-gray-100 flex justify-between">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">
            Recent Operations
          </h2>

          <span className="text-xs text-gray-400">
            {operations.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-3 text-left text-xs text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 uppercase">Document</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 uppercase">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-400 uppercase">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">

              {operations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-300">
                    No operations found
                  </td>
                </tr>
              ) : (
                operations.map((op,i)=>(
                  <tr key={i} className="hover:bg-gray-50">

                    <td className="px-6 py-3"><TypePill type={op.type}/></td>

                    <td className="px-6 py-3 font-mono text-xs">{op.document}</td>

                    <td className="px-6 py-3 text-gray-600">{op.warehouse}</td>

                    <td className="px-6 py-3"><StatusBadge status={op.status}/></td>

                    <td className="px-6 py-3 text-xs text-gray-400">
                      {new Date(op.date).toLocaleDateString("en-GB")}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}