"use client";

import { useState } from "react";
import { testimonials } from "@/lib/sample-data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="py-24 sm:py-32 bg-black">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-white/25 text-[10px] tracking-[0.5em] uppercase mb-12">What People Say</p>

        <blockquote
          className="text-[clamp(1rem,2.5vw,1.4rem)] leading-[1.6] text-white/60 font-light"
          style={{ fontFamily: "var(--font-display)" }}
        >
          &ldquo;{t.comment}&rdquo;
        </blockquote>

        <div className="mt-8 mb-12">
          <p className="text-white text-[13px] font-medium">{t.name}</p>
          <p className="text-white/25 text-[12px] mt-0.5">{t.location}</p>
        </div>

        <div className="flex justify-center gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                i === active ? "bg-white" : "bg-white/15 hover:bg-white/30"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
