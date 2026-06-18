"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&q=90",
    heading: "WEAR YOUR\nSTORY",
  },
  {
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1920&q=90",
    heading: "NEW\nSEASON",
  },
  {
    image: "https://images.unsplash.com/photo-1506634572416-48cdfe530110?w=1920&q=90",
    heading: "MADE IN\nLAGOS",
  },
];

export default function HeroSection() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % slides.length), []);
  useEffect(() => { const t = setInterval(next, 5500); return () => clearInterval(t); }, [next]);

  return (
    <section className="relative h-[100svh] min-h-[600px] bg-black overflow-hidden">
      {slides.map((s, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-[1500ms] ${idx === i ? "opacity-100" : "opacity-0"}`}>
          <Image src={s.image} alt="" fill className="object-cover" priority={idx === 0} sizes="100vw" quality={90}
            style={{ transform: idx === i ? "scale(1.06)" : "scale(1)", transition: "transform 7s ease-out" }} />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h1
          className="text-white text-[clamp(3rem,14vw,9rem)] leading-[0.9] font-black uppercase whitespace-pre-line tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {slides[i].heading}
        </h1>
        <div className="mt-8 flex gap-4">
          <Link href="/shop" className="btn-accent">Shop Now</Link>
          <Link href="/shop?filter=new" className="btn-outline">New Drops</Link>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
            className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${idx === i ? "w-8 bg-[#F5C518]" : "w-3 bg-white/20"}`}
            aria-label={`Slide ${idx + 1}`} />
        ))}
      </div>
    </section>
  );
}
