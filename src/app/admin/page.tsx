"use client";

import Link from "next/link";

const stats = [
  { label: "Total Revenue", value: "$48,752", change: "+12.5%", color: "bg-emerald-50 text-emerald-600" },
  { label: "Orders", value: "284", change: "+8.2%", color: "bg-blue-50 text-blue-600" },
  { label: "Customers", value: "1,429", change: "+22.1%", color: "bg-purple-50 text-purple-600" },
  { label: "Products", value: "86", change: "+3", color: "bg-amber-50 text-amber-600" },
];

const recentOrders = [
  { id: "ARL-M3KF7", customer: "Adaeze Okonkwo", total: 485, status: "Delivered", date: "Jun 12" },
  { id: "ARL-K9LP2", customer: "Tunde Adeyemi", total: 320, status: "Shipped", date: "Jun 11" },
  { id: "ARL-R7NQ4", customer: "Chioma Eze", total: 710, status: "Processing", date: "Jun 10" },
  { id: "ARL-P2MT8", customer: "Marcus Chen", total: 165, status: "Pending", date: "Jun 10" },
  { id: "ARL-V5XH3", customer: "Sarah Mitchell", total: 895, status: "Delivered", date: "Jun 9" },
];

const topProducts = [
  { name: "Noir Tailored Blazer", sold: 47, revenue: 22795 },
  { name: "Heritage Leather Tote", sold: 38, revenue: 12160 },
  { name: "Atlas Runner Sneakers", sold: 35, revenue: 7875 },
  { name: "Aura Cashmere Sweater", sold: 29, revenue: 12180 },
  { name: "Monolith Chelsea Boots", sold: 24, revenue: 8280 },
];

const statusColors: Record<string, string> = {
  Delivered: "text-emerald-600 bg-emerald-50", Shipped: "text-blue-600 bg-blue-50",
  Processing: "text-amber-600 bg-amber-50", Pending: "text-gray-600 bg-gray-100",
};

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted mt-1">Here&apos;s what&apos;s happening with your store.</p>
        </div>
        <select className="px-4 py-2 text-sm border border-border bg-white rounded-lg cursor-pointer">
          <option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-5 border border-border rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color} text-sm font-bold`}>
                {s.label[0]}
              </div>
              <span className="text-xs font-medium text-emerald-600">↑ {s.change}</span>
            </div>
            <p className="text-2xl font-semibold">{s.value}</p>
            <p className="text-xs text-muted mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr,380px] gap-6">
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-accent hover:text-accent-hover transition-colors">View All →</Link>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-surface/50 transition-colors">
                <div><p className="text-sm font-medium">{o.id}</p><p className="text-xs text-muted">{o.customer}</p></div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">${o.total}</span>
                  <span className={`text-[10px] tracking-wider uppercase font-medium px-2 py-1 rounded ${statusColors[o.status]}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Top Products</h2>
            <Link href="/admin/products" className="text-xs text-accent hover:text-accent-hover transition-colors">View All →</Link>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted w-5">#{i + 1}</span>
                  <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted">{p.sold} units sold</p></div>
                </div>
                <span className="text-sm font-medium">${p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-border mt-6 p-6 rounded-xl">
        <h2 className="text-sm font-semibold mb-4">Revenue Overview</h2>
        <div className="h-[300px] flex items-center justify-center text-muted">
          <div className="text-center">
            <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#D1CAC0" strokeWidth="1.2" className="mx-auto mb-3"><path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <p className="text-sm">Revenue chart will display here</p>
            <p className="text-xs text-muted-light mt-1">Connect to a database to see real analytics data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
