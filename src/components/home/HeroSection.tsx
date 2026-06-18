"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90",
    title: "Summer 26",
    heading: "Wear Your\nStory",
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=90",
    title: "New Season",
    heading: "The New\nDrop",
  },
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=90",
    title: "Campaign",
    heading: "Made in\nLagos",
  },
];

export default function HeroSection() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % slides.length), []);

  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, [next]);

  return (
    <section className="relative h-[100svh] min-h-[600px] bg-black overflow-hidden">
      {slides.map((s, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-[1500ms] ${idx === i ? "opacity-100" : "opacity-0"}`}>
          <Image src={s.image} alt="" fill className="object-cover" priority={idx === 0} sizes="100vw" quality={90}
            style={{ transform: idx === i ? "scale(1.05)" : "scale(1)", transition: "transform 7s ease-out" }} />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Content — bottom left, massive type */}
      <div className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 sm:px-10 pb-14 sm:pb-20">
        <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase mb-4">{slides[i].title}</p>
        <h1 className="text-white text-[clamp(3.2rem,12vw,8rem)] leading-[0.88] font-light whitespace-pre-line tracking-[-0.02em]" style={{ fontFamily: "var(--font-display)" }}>
          {slides[i].heading}
        </h1>
        <div className="mt-8 sm:mt-10">
          <Link href="/shop" className="text-white text-[11px] tracking-[0.25em] uppercase inline-flex items-center gap-4 group">
            Shop Now
            <span className="block w-12 h-px bg-white/30 group-hover:w-20 transition-all duration-700" />
          </Link>
        </div>
      </div>

      {/* Minimal slide indicator — bottom right */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-10 flex items-center gap-3 text-white/30 text-[10px] tracking-[0.3em]">
        {slides.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)}
            className={`cursor-pointer transition-all duration-500 ${idx === i ? "text-white" : "hover:text-white/50"}`}
          >
            {String(idx + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
