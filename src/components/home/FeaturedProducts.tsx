"use client";

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { sampleProducts, sampleCategories } from "@/lib/sample-data";
import type { Product } from "@/types";

interface Props {
  title: string;
  subtitle?: string;
  filter: "featured" | "new" | "bestseller";
  limit?: number;
  viewAllHref?: string;
}

export default function FeaturedProducts({ title, subtitle, filter, limit = 4, viewAllHref = "/shop" }: Props) {
  const filtered = sampleProducts
    .filter((p) => {
      if (filter === "featured") return p.featured;
      if (filter === "new") return p.isNew;
      if (filter === "bestseller") return p.isBestseller;
      return true;
    })
    .slice(0, limit)
    .map((p) => ({
      ...p,
      category: sampleCategories.find((c) => c.id === p.categoryId),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })) as unknown as Product[];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            {subtitle && (
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#999] mb-2">{subtitle}</p>
            )}
            <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-light tracking-[-0.01em]" style={{ fontFamily: "var(--font-display)" }}>
              {title}
            </h2>
          </div>
          <Link href={viewAllHref} className="hidden sm:inline-flex items-center gap-3 text-[#888] text-[11px] tracking-[0.2em] uppercase group hover:text-black transition-colors">
            View All
            <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href={viewAllHref} className="text-[11px] tracking-[0.2em] uppercase text-black inline-flex items-center gap-3 group">
            View All <span className="w-6 h-px bg-black/30 group-hover:w-10 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
