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
    <section className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            {subtitle && (
              <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-1.5">{subtitle}</p>
            )}
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-light" style={{ fontFamily: "var(--font-display)" }}>
              {title}
            </h2>
          </div>
          <Link href={viewAllHref} className="text-[12px] tracking-widest uppercase text-muted hover:text-foreground transition-colors hidden sm:block">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href={viewAllHref} className="btn-outline text-[11px]">View All</Link>
        </div>
      </div>
    </section>
  );
}
