"use client";

import { useState } from "react";

const customers = [
  { id: "1", name: "Adaeze Okonkwo", email: "adaeze@example.com", orders: 6, spent: 2840, joined: "2025-03-15", location: "Lagos, Nigeria" },
  { id: "2", name: "Tunde Adeyemi", email: "tunde@example.com", orders: 4, spent: 1920, joined: "2025-05-22", location: "Abuja, Nigeria" },
  { id: "3", name: "Marcus Chen", email: "marcus@example.com", orders: 8, spent: 4150, joined: "2025-01-08", location: "London, UK" },
  { id: "4", name: "Chioma Eze", email: "chioma@example.com", orders: 3, spent: 985, joined: "2025-07-30", location: "Port Harcourt, Nigeria" },
  { id: "5", name: "Sarah Mitchell", email: "sarah@example.com", orders: 12, spent: 6780, joined: "2024-11-12", location: "New York, USA" },
  { id: "6", name: "David Park", email: "david@example.com", orders: 2, spent: 450, joined: "2026-02-18", location: "Seoul, South Korea" },
  { id: "7", name: "Fatima Al-Hassan", email: "fatima@example.com", orders: 5, spent: 2100, joined: "2025-09-05", location: "Dubai, UAE" },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = customers.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-semibold">Customers</h1><p className="text-sm text-muted mt-1">{customers.length} registered customers</p></div>
      </div>

      <div className="bg-white border border-border rounded-xl p-4 mb-6">
        <div className="relative max-w-md">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search customers..." className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-lg focus:border-foreground focus:outline-none transition-colors" />
        </div>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Customer", "Location", "Orders", "Total Spent", "Joined"].map((h) => <th key={h} className="text-left px-5 py-3 text-[11px] tracking-widest uppercase text-muted font-semibold">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-accent text-white text-xs flex items-center justify-center rounded-full font-medium">{c.name.split(" ").map((n) => n[0]).join("")}</div><div><p className="text-sm font-medium">{c.name}</p><p className="text-xs text-muted">{c.email}</p></div></div></td>
                <td className="px-5 py-4 text-sm text-muted">{c.location}</td>
                <td className="px-5 py-4 text-sm">{c.orders}</td>
                <td className="px-5 py-4 text-sm font-medium">${c.spent.toLocaleString()}</td>
                <td className="px-5 py-4 text-sm text-muted">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
