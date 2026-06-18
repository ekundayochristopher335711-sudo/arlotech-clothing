"use client";

import { useState } from "react";
import { testimonials } from "@/lib/sample-data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-20 sm:py-28 bg-[#111] border-y border-[#1A1A1A]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-10">The Community</p>
        <blockquote className="text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.6] text-white/50 font-medium" style={{ fontFamily: "var(--font-display)" }}>
          &ldquo;{t.comment}&rdquo;
        </blockquote>
        <div className="mt-8 mb-10">
          <p className="text-white text-[13px] font-bold uppercase tracking-wide">{t.name}</p>
          <p className="text-white/25 text-[12px] mt-0.5">{t.location}</p>
        </div>
        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${i === active ? "w-6 bg-[#F5C518]" : "w-2 bg-white/10"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
