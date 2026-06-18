"use client";

import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=400&q=80",
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
  "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=400&q=80",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80",
  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80",
];

export default function InstagramFeed() {
  return (
    <section className="py-16 sm:py-20">
      <div className="text-center mb-10">
        <p className="text-[#F5C518] text-[10px] tracking-[0.4em] uppercase font-bold mb-1">@arlotechclothing</p>
        <h2 className="text-[clamp(1.3rem,3vw,1.8rem)] font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
          Join the Movement
        </h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
        {images.map((src, i) => (
          <a key={i} href="#" className="group relative aspect-square overflow-hidden">
            <Image src={src} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" sizes="(max-width:640px) 33vw, 16vw" />
          </a>
        ))}
      </div>
    </section>
  );
}
