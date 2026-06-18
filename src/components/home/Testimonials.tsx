"use client";

import { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/lib/sample-data";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  return (
    <section className="section-pad bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent font-semibold mb-2">Testimonials</p>
          <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-light" style={{ fontFamily: "var(--font-display)" }}>
            What Our Clients Say
          </h2>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-5">
            {Array.from({ length: t.rating }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#8B7355" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          <blockquote className="text-[16px] sm:text-lg leading-relaxed text-foreground/80 mb-7 italic">
            &ldquo;{t.comment}&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-[12px] text-muted">{t.location}</p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === active ? "bg-accent w-5" : "bg-border-dark hover:bg-muted-light"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
