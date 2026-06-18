"use client";

import Link from "next/link";

export default function BrandEthos() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent font-semibold mb-6">
          The Brand
        </p>
        <h2
          className="text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.2] font-light mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We don&apos;t follow trends.{" "}
          <span className="text-muted">
            We create pieces for people who know exactly who they are.
          </span>
        </h2>
        <p className="text-muted text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
          Born in Lagos, designed for the world. Every Arlotech piece is crafted with intention —
          premium fabrics, purposeful silhouettes, and the kind of quiet confidence that speaks louder than logos.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 text-foreground text-[12px] tracking-[0.2em] uppercase font-semibold group"
        >
          Discover the Collection
          <span className="w-8 h-[1px] bg-foreground/30 group-hover:w-14 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
