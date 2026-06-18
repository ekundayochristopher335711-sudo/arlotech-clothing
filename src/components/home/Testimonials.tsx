"use client";

import { useState } from "react";
import { testimonials } from "@/lib/sample-data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-20 sm:py-28 bg-[#1A1714]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-[11px] tracking-[0.4em] uppercase text-accent-light font-semibold mb-10">
          Community
        </p>

        <blockquote
          className="text-[clamp(1.1rem,2.5vw,1.5rem)] leading-relaxed text-white/70 font-light mb-8"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &ldquo;{t.comment}&rdquo;
        </blockquote>

        <div className="mb-10">
          <p className="text-white text-sm font-medium">{t.name}</p>
          <p className="text-white/30 text-[12px]">{t.location}</p>
        </div>

        <div className="flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-[2px] rounded-full transition-all duration-500 cursor-pointer ${
                i === active ? "w-8 bg-accent-light" : "w-3 bg-white/15"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
