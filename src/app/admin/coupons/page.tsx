"use client";

import toast from "react-hot-toast";

const coupons = [
  { id: "1", code: "ARLOTECH10", type: "percentage", value: 10, minPurchase: 50, maxUses: 500, used: 127, active: true, expires: "2026-12-31" },
  { id: "2", code: "WELCOME20", type: "percentage", value: 20, minPurchase: 100, maxUses: 1000, used: 342, active: true, expires: "2026-09-30" },
  { id: "3", code: "FLAT50", type: "fixed", value: 50, minPurchase: 200, maxUses: 200, used: 89, active: true, expires: "2026-08-31" },
  { id: "4", code: "SUMMER15", type: "percentage", value: 15, minPurchase: 75, maxUses: 300, used: 300, active: false, expires: "2026-06-30" },
  { id: "5", code: "VIP25", type: "percentage", value: 25, minPurchase: 150, maxUses: 100, used: 43, active: true, expires: null },
];

export default function AdminCouponsPage() {
  const copyCode = (code: string) => { navigator.clipboard.writeText(code); toast.success(`Copied: ${code}`); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-semibold">Coupons</h1><p className="text-sm text-muted mt-1">Manage discount codes and promotions</p></div>
        <button className="btn-primary text-xs cursor-pointer">+ Create Coupon</button>
      </div>

      <div className="bg-white border border-border rounded-xl overflow-x-auto">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Code", "Discount", "Min. Purchase", "Usage", "Status", "Expires", "Actions"].map((h) => <th key={h} className={`${h === "Actions" ? "text-right" : "text-left"} px-5 py-3 text-[11px] tracking-widest uppercase text-muted font-semibold`}>{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {coupons.map((c) => (
              <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-semibold bg-surface px-2 py-1 rounded">{c.code}</code>
                    <button onClick={() => copyCode(c.code)} className="text-muted hover:text-foreground cursor-pointer text-xs">Copy</button>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-medium">{c.type === "percentage" ? `${c.value}%` : `$${c.value}`}</td>
                <td className="px-5 py-4 text-sm text-muted">${c.minPurchase}</td>
                <td className="px-5 py-4 text-sm">{c.used} / {c.maxUses}</td>
                <td className="px-5 py-4"><span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded ${c.active ? "text-emerald-600 bg-emerald-50" : "text-gray-600 bg-gray-100"}`}>{c.active ? "Active" : "Expired"}</span></td>
                <td className="px-5 py-4 text-sm text-muted">{c.expires || "No expiry"}</td>
                <td className="px-5 py-4 text-right text-xs text-muted hover:text-foreground cursor-pointer">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
