"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  { title: "Menswear", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=85", href: "/shop?category=menswear" },
  { title: "Womenswear", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85", href: "/shop?category=womenswear" },
  { title: "Accessories", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=85", href: "/shop?category=accessories" },
];

export default function EditorialCollections() {
  return (
    <section className="px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#eee]">
          {collections.map((c) => (
            <Link key={c.title} href={c.href} className="group relative bg-white">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="(max-width:1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-700" />
              </div>
              <div className="py-5 px-1 text-center">
                <h3 className="text-[12px] tracking-[0.2em] uppercase font-medium">{c.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
