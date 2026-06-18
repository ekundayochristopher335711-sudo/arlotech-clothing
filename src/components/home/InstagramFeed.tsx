"use client";

import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
];

export default function InstagramFeed() {
  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-2">@arlotechclothing</p>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-light" style={{ fontFamily: "var(--font-display)" }}>
            Follow the Journey
          </h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
          {images.map((src, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden bg-surface">
              <Image src={src} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:640px) 33vw, 16vw" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
