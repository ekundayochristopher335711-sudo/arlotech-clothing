"use client";

import Link from "next/link";

const orders = [
  { id: "ARL-M3KF7-A2BX", date: "June 12, 2026", total: 485, status: "Delivered", items: [{ name: "Noir Tailored Blazer", size: "M", color: "Black", price: 485, qty: 1, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" }], tracking: "DHL-9182736450" },
  { id: "ARL-K9LP2-X4CW", date: "May 28, 2026", total: 320, status: "Shipped", items: [{ name: "Heritage Leather Tote", size: null, color: "Cognac", price: 320, qty: 1, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&q=80" }], tracking: "FEDEX-5473829104" },
  { id: "ARL-R7NQ4-D8FZ", date: "May 15, 2026", total: 710, status: "Processing", items: [{ name: "Aura Cashmere Sweater", size: "S", color: "Oatmeal", price: 420, qty: 1, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80" }, { name: "Crescent Knit Polo", size: "M", color: "Navy", price: 145, qty: 2, image: "https://images.unsplash.com/photo-1625910513413-5fc421e0a7dc?w=200&q=80" }], tracking: null },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700", Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700", Pending: "bg-gray-100 text-gray-700",
};

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>Order History</h1>
        <p className="text-sm text-muted">{orders.length} orders placed</p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-border bg-white rounded-xl overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-border bg-surface">
              <div className="flex flex-wrap gap-6 text-sm">
                <div><p className="text-[11px] text-muted tracking-widest uppercase mb-0.5">Order</p><p className="font-medium">{order.id}</p></div>
                <div><p className="text-[11px] text-muted tracking-widest uppercase mb-0.5">Date</p><p>{order.date}</p></div>
                <div><p className="text-[11px] text-muted tracking-widest uppercase mb-0.5">Total</p><p className="font-semibold">${order.total}</p></div>
              </div>
              <span className={`text-[11px] tracking-wider uppercase font-medium px-3 py-1.5 rounded ${statusStyles[order.status]}`}>{order.status}</span>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-16 h-20 bg-surface shrink-0 overflow-hidden rounded-lg"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                  <div className="flex-1"><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-muted mt-0.5">{[item.size, item.color].filter(Boolean).join(" / ")} &middot; Qty: {item.qty}</p></div>
                  <p className="text-sm font-medium">${item.price}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-surface/50">
              {order.tracking ? <p className="text-xs text-muted">Tracking: <span className="font-medium text-foreground">{order.tracking}</span></p> : <p className="text-xs text-muted">Tracking available once shipped</p>}
              <button className="text-xs text-accent hover:text-accent-hover transition-colors cursor-pointer">View Details →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
