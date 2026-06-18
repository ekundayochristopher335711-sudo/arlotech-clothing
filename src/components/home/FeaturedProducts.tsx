"use client";

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { sampleProducts, sampleCategories } from "@/lib/sample-data";
import type { Product } from "@/types";

interface Props { title: string; subtitle?: string; filter: "featured" | "new" | "bestseller"; limit?: number; viewAllHref?: string; }

export default function FeaturedProducts({ title, subtitle, filter, limit = 4, viewAllHref = "/shop" }: Props) {
  const filtered = sampleProducts
    .filter((p) => filter === "featured" ? p.featured : filter === "new" ? p.isNew : p.isBestseller)
    .slice(0, limit)
    .map((p) => ({ ...p, category: sampleCategories.find((c) => c.id === p.categoryId), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })) as unknown as Product[];

  return (
    <section className="py-16 sm:py-24 border-t border-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            {subtitle && <p className="text-[#F5C518] text-[10px] tracking-[0.4em] uppercase font-bold mb-2">{subtitle}</p>}
            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>{title}</h2>
          </div>
          <Link href={viewAllHref} className="hidden sm:block text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-[#F5C518] transition-colors">View All →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
