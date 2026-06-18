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
    <section className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 sm:mb-14">
          <div>
            {subtitle && (
              <p className="text-[11px] tracking-[0.4em] uppercase text-accent font-semibold mb-2">{subtitle}</p>
            )}
            <h2
              className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-light"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="hidden sm:inline-flex items-center gap-3 text-muted-foreground text-[12px] tracking-[0.2em] uppercase font-medium group hover:text-foreground transition-colors"
          >
            View All
            <span className="w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-500" />
          </Link>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 text-center sm:hidden">
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-3 text-foreground text-[12px] tracking-[0.2em] uppercase font-semibold group"
          >
            View All
            <span className="w-6 h-[1px] bg-foreground/30 group-hover:w-10 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}
