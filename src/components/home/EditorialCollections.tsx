"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  { title: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=85", href: "/shop?category=menswear" },
  { title: "Hoodies", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=85", href: "/shop?category=womenswear" },
  { title: "Caps & Accessories", image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=800&q=85", href: "/shop?category=accessories" },
];

export default function EditorialCollections() {
  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Collections
          </h2>
          <Link href="/shop" className="text-[11px] tracking-[0.2em] uppercase text-white/30 hover:text-[#F5C518] transition-colors">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {collections.map((c) => (
            <Link key={c.title} href={c.href} className="group relative aspect-[3/4] overflow-hidden bg-[#111]">
              <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105 opacity-70 group-hover:opacity-90" sizes="(max-width:640px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-[18px] font-bold uppercase tracking-wide" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                <p className="text-[#F5C518] text-[10px] tracking-[0.3em] uppercase font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Shop Now →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
