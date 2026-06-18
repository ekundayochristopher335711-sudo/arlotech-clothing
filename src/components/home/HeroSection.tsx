"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=85",
    tag: "New Season",
    heading: "Wear Your\nConfidence",
    text: "Bold, intentional pieces designed for the modern individual. Made in Lagos, worn worldwide.",
    cta: { label: "Shop Collection", href: "/shop" },
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=85",
    tag: "New Arrivals",
    heading: "Fresh\nDrops",
    text: "Statement pieces that move with you — from boardrooms to rooftop nights. Just landed.",
    cta: { label: "Shop New In", href: "/shop?filter=new" },
  },
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=85",
    tag: "Best Sellers",
    heading: "Community\nFavourites",
    text: "The pieces our people keep coming back for. See what everyone is wearing.",
    cta: { label: "View Bestsellers", href: "/shop?filter=bestseller" },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);

  useEffect(() => { setReady(true); }, []);
  useEffect(() => { const t = setInterval(next, 5500); return () => clearInterval(t); }, [next]);

  const s = slides[current];

  return (
    <section className="relative h-[90vh] min-h-[520px] max-h-[820px] bg-[#1A1714] overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[1200ms] ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={slide.image} alt="" fill className="object-cover" priority={i === 0} sizes="100vw" quality={85} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className={`max-w-lg transition-all duration-700 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-accent-light font-semibold mb-4">
            {s.tag}
          </p>
          <h1 className="text-[clamp(2.4rem,7vw,4.2rem)] leading-[1.05] text-white font-light whitespace-pre-line mb-5" style={{ fontFamily: "var(--font-display)" }}>
            {s.heading}
          </h1>
          <p className="text-white/50 text-[15px] sm:text-base leading-relaxed mb-8 max-w-sm">
            {s.text}
          </p>
          <div className="flex items-center gap-5">
            <Link href={s.cta.href} className="btn-accent">{s.cta.label}</Link>
            <Link href="/shop" className="text-white/40 text-[12px] tracking-[0.2em] uppercase hover:text-white/70 transition-colors">
              View All
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer ${i === current ? "w-8 bg-white" : "w-4 bg-white/25"}`} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
