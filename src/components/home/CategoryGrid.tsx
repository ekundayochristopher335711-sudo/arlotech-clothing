"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Menswear",
    slug: "menswear",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80",
    span: "col-span-2 row-span-2",
  },
  {
    name: "Womenswear",
    slug: "womenswear",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    span: "",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    span: "",
  },
  {
    name: "Footwear",
    slug: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    span: "",
  },
  {
    name: "Outerwear",
    slug: "outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80",
    span: "",
  },
];

export default function CategoryGrid() {
  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-2">Collections</p>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-light" style={{ fontFamily: "var(--font-display)" }}>
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[260px]">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className={`group relative overflow-hidden ${cat.span}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={cat.span ? "(max-width:1024px) 100vw, 50vw" : "(max-width:1024px) 50vw, 25vw"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="text-white text-base sm:text-lg font-medium">{cat.name}</h3>
                <span className="text-white/60 text-[11px] tracking-widest uppercase group-hover:text-white/90 transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
