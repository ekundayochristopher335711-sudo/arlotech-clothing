"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90",
    heading: "Wear Your\nStory",
    cta: { label: "Shop Collection", href: "/shop" },
  },
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=90",
    heading: "New Season\nNow Live",
    cta: { label: "Explore New In", href: "/shop?filter=new" },
  },
  {
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1920&q=90",
    heading: "Made in\nLagos",
    cta: { label: "Our Story", href: "/shop" },
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);

  useEffect(() => { setReady(true); }, []);
  useEffect(() => { const t = setInterval(next, 6000); return () => clearInterval(t); }, [next]);

  const s = slides[current];

  return (
    <section className="relative h-[100svh] min-h-[600px] bg-[#1A1714] overflow-hidden">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}>
          <Image src={slide.image} alt="" fill className="object-cover scale-[1.03]" priority={i === 0} sizes="100vw" quality={90}
            style={{ transition: "transform 8s ease-out", transform: i === current ? "scale(1.08)" : "scale(1.03)" }} />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-end pb-16 sm:pb-20">
        <div className={`transition-all duration-1000 ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1
            className="text-[clamp(3rem,10vw,6.5rem)] leading-[0.95] text-white font-light whitespace-pre-line mb-8 tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {s.heading}
          </h1>
          <Link
            href={s.cta.href}
            className="inline-flex items-center gap-3 text-white text-[13px] tracking-[0.2em] uppercase font-medium group"
          >
            {s.cta.label}
            <span className="w-10 h-[1px] bg-white/50 group-hover:w-16 transition-all duration-500" />
          </Link>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 right-6 sm:right-8 flex items-center gap-3">
          <span className="text-white/40 text-[11px] font-medium tracking-wider">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[2px] rounded-full transition-all duration-700 cursor-pointer ${
                  i === current ? "w-8 bg-white" : "w-3 bg-white/25"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
