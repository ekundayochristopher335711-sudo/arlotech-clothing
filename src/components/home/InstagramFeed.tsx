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
    <section>
      <div className="text-center py-14">
        <p className="text-[11px] tracking-[0.3em] uppercase text-[#999] mb-1">@arlotechclothing</p>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6">
        {images.map((src, i) => (
          <a key={i} href="#" className="group relative aspect-square overflow-hidden">
            <Image src={src} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 33vw, 16vw" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
          </a>
        ))}
      </div>
    </section>
  );
}
