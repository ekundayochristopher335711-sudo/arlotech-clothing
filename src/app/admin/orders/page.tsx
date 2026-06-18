"use client";

import { useState } from "react";

const orders = [
  { id: "ARL-M3KF7-A2BX", customer: "Adaeze Okonkwo", email: "adaeze@example.com", items: 2, total: 485, status: "Delivered", payment: "Paid", date: "2026-06-12", method: "Paystack" },
  { id: "ARL-K9LP2-X4CW", customer: "Tunde Adeyemi", email: "tunde@example.com", items: 1, total: 320, status: "Shipped", payment: "Paid", date: "2026-06-11", method: "Stripe" },
  { id: "ARL-R7NQ4-D8FZ", customer: "Chioma Eze", email: "chioma@example.com", items: 3, total: 710, status: "Processing", payment: "Paid", date: "2026-06-10", method: "Paystack" },
  { id: "ARL-P2MT8-G5KY", customer: "Marcus Chen", email: "marcus@example.com", items: 1, total: 165, status: "Pending", payment: "Pending", date: "2026-06-10", method: "Paystack" },
  { id: "ARL-V5XH3-J7NR", customer: "Sarah Mitchell", email: "sarah@example.com", items: 4, total: 895, status: "Delivered", payment: "Paid", date: "2026-06-09", method: "Stripe" },
  { id: "ARL-W8BT6-L3QP", customer: "Chidi Emeka", email: "chidi@example.com", items: 2, total: 540, status: "Cancelled", payment: "Refunded", date: "2026-06-08", method: "Paystack" },
];

const statusColors: Record<string, string> = { Delivered: "text-emerald-600 bg-emerald-50", Shipped: "text-blue-600 bg-blue-50", Processing: "text-amber-600 bg-amber-50", Pending: "text-gray-600 bg-gray-100", Cancelled: "text-red-600 bg-red-50" };
const paymentColors: Record<string, string> = { Paid: "text-emerald-600", Pending: "text-amber-600", Refunded: "text-red-600" };

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const filtered = orders.filter((o) => { const s = o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer.toLowerCase().includes(searchQuery.toLowerCase()); return s && (!statusFilter || o.status === statusFilter); });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-semibold">Orders</h1><p className="text-sm text-muted mt-1">{orders.length} total orders</p></div>
        <button className="btn-outline text-xs cursor-pointer">↓ Export</button>
      </div>

      <div className="bg-white border border-border rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search orders..." className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-lg focus:border-foreground focus:outline-none transition-colors" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 text-sm border border-border bg-white rounded-lg cursor-pointer">
          <option value="">All Status</option><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
        </select>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Order", "Customer", "Date", "Payment", "Status", "Total"].map((h) => <th key={h} className={`${h === "Total" ? "text-right" : "text-left"} px-5 py-3 text-[11px] tracking-widest uppercase text-muted font-semibold`}>{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-5 py-4"><p className="text-sm font-medium">{o.id}</p><p className="text-xs text-muted">{o.items} items &middot; {o.method}</p></td>
                <td className="px-5 py-4"><p className="text-sm">{o.customer}</p><p className="text-xs text-muted">{o.email}</p></td>
                <td className="px-5 py-4 text-sm text-muted">{o.date}</td>
                <td className="px-5 py-4"><span className={`text-sm font-medium ${paymentColors[o.payment]}`}>{o.payment}</span></td>
                <td className="px-5 py-4"><span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded ${statusColors[o.status]}`}>{o.status}</span></td>
                <td className="px-5 py-4 text-right text-sm font-semibold">${o.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
