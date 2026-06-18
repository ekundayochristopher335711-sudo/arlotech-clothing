"use client";

import { useState } from "react";
import Image from "next/image";
import { sampleProducts, sampleCategories } from "@/lib/sample-data";

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const products = sampleProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-semibold">Products</h1><p className="text-sm text-muted mt-1">{sampleProducts.length} total products</p></div>
        <button className="btn-primary text-xs cursor-pointer">+ Add Product</button>
      </div>

      <div className="bg-white border border-border rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2" className="absolute left-3 top-1/2 -translate-y-1/2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search products..." className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-lg focus:border-foreground focus:outline-none transition-colors" />
        </div>
        <select className="px-4 py-2.5 text-sm border border-border bg-white rounded-lg cursor-pointer"><option value="">All Categories</option>{sampleCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => <th key={h} className={`${h === "Actions" ? "text-right" : "text-left"} px-5 py-3 text-[11px] tracking-widest uppercase text-muted font-semibold`}>{h}</th>)}
          </tr></thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => {
              const cat = sampleCategories.find((c) => c.id === p.categoryId);
              const stock = p.variants.reduce((s, v) => s + v.stock, 0);
              const img = p.images[0];
              return (
                <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="relative w-12 h-14 bg-surface shrink-0 overflow-hidden rounded-lg">{img && <Image src={img.url} alt={p.name} fill className="object-cover" sizes="48px" />}</div><div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted">{p.sku}</p></div></div></td>
                  <td className="px-5 py-4 text-sm text-muted">{cat?.name || "-"}</td>
                  <td className="px-5 py-4"><p className="text-sm font-medium">${p.price}</p>{p.comparePrice && <p className="text-xs text-muted line-through">${p.comparePrice}</p>}</td>
                  <td className="px-5 py-4"><span className={`text-sm ${stock <= 5 ? "text-amber-600 font-medium" : stock === 0 ? "text-red-600 font-medium" : "text-muted"}`}>{stock}</span></td>
                  <td className="px-5 py-4"><span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded ${p.published ? "text-emerald-600 bg-emerald-50" : "text-gray-600 bg-gray-100"}`}>{p.published ? "Published" : "Draft"}</span></td>
                  <td className="px-5 py-4 text-right text-muted text-xs cursor-pointer hover:text-foreground">Edit</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
