"use client";

import { useState } from "react";
import Link from "next/link";
import { useCurrencyStore } from "@/store/currency";

const menuItems = [
  { label: "Orders", href: "/account/orders", count: 3 },
  { label: "Wishlist", href: "/account/wishlist", count: 0 },
  { label: "Addresses", href: "/account/addresses" },
  { label: "Settings", href: "/account/settings" },
];

const recentOrders = [
  { id: "ARL-M3KF7-A2BX", date: "Jun 12, 2026", total: 485, status: "Delivered", items: 2 },
  { id: "ARL-K9LP2-X4CW", date: "May 28, 2026", total: 320, status: "Shipped", items: 1 },
  { id: "ARL-R7NQ4-D8FZ", date: "May 15, 2026", total: 710, status: "Processing", items: 3 },
];

export default function AccountPage() {
  const [user] = useState({ name: "Adaeze Okonkwo", email: "adaeze@example.com", firstName: "Adaeze", memberSince: "March 2025" });
  const { format } = useCurrencyStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="grid lg:grid-cols-[260px,1fr] gap-10 lg:gap-16">
        {/* Sidebar */}
        <div>
          <div className="mb-8">
            <div className="w-14 h-14 bg-accent text-white flex items-center justify-center text-xl font-medium rounded-full mb-4">{user.firstName[0]}</div>
            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm text-muted">{user.email}</p>
            <p className="text-xs text-muted-light mt-1">Member since {user.memberSince}</p>
          </div>

          <nav className="space-y-1">
            <Link href="/account" className="flex items-center gap-3 px-4 py-3 text-sm bg-surface rounded-lg text-foreground font-medium">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round"/></svg>
              Dashboard
            </Link>
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center justify-between px-4 py-3 text-sm text-muted hover:text-foreground hover:bg-surface rounded-lg transition-colors">
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="w-5 h-5 bg-accent text-white text-[10px] flex items-center justify-center rounded-full">{item.count}</span>
                )}
              </Link>
            ))}
            <button className="flex items-center gap-3 px-4 py-3 text-sm text-muted hover:text-danger transition-colors w-full cursor-pointer rounded-lg">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Sign Out
            </button>
          </nav>
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-display)" }}>Welcome back, {user.firstName}</h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[{ label: "Total Orders", value: "12" }, { label: "Wishlist Items", value: "5" }, { label: "Loyalty Points", value: "2,450" }, { label: "Saved Addresses", value: "3" }].map((stat) => (
              <div key={stat.label} className="glass-card rounded-xl p-5 text-center">
                <p className="text-2xl font-semibold mb-1">{stat.value}</p>
                <p className="text-[11px] text-muted tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[11px] tracking-widest uppercase font-semibold">Recent Orders</h2>
              <Link href="/account/orders" className="text-[12px] text-muted hover:text-accent transition-colors">View All</Link>
            </div>

            <div className="glass-card rounded-xl divide-y divide-border overflow-hidden">
              {recentOrders.map((order) => (
                <Link key={order.id} href="/account/orders" className="flex items-center justify-between p-5 hover:bg-white/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-surface rounded-lg flex items-center justify-center">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-muted">{order.date} &middot; {order.items} {order.items === 1 ? "item" : "items"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{format(order.total)}</p>
                      <span className={`text-[10px] tracking-wider uppercase font-medium ${order.status === "Delivered" ? "text-success" : order.status === "Shipped" ? "text-accent" : "text-muted"}`}>{order.status}</span>
                    </div>
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#ccc" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
