"use client";

import Image from "next/image";

export default function AboutBrand() {
  return (
    <section className="py-20 sm:py-28 border-t border-[#1A1A1A]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
            <Image
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1000&q=85"
              alt="About Arlotech"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-5">Who We Are</p>
            <h2
              className="text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Born in Lagos.<br/>Built for the Streets.
            </h2>
            <div className="space-y-4 text-white/40 text-[14px] leading-relaxed">
              <p>
                Arlotech Clothing started with a simple belief — that Nigerian streetwear can stand toe-to-toe with any brand in the world. No compromise on quality, no following trends. We create for people who move different.
              </p>
              <p>
                Our designs are influenced by Afrobeats, Hip Hop, and the raw energy of Lagos street culture. Every piece is crafted with premium materials and bold graphics that tell a story.
              </p>
              <p>
                From a small room in Lagos to shipping worldwide — we&apos;re just getting started. The goal is simple: Wear Arlotech Everywhere.
              </p>
            </div>

            <div className="mt-8 flex gap-10">
              <div>
                <p className="text-[#F5C518] text-[28px] font-black" style={{ fontFamily: "var(--font-display)" }}>50+</p>
                <p className="text-white/25 text-[11px] tracking-[0.15em] uppercase mt-1">Unique Designs</p>
              </div>
              <div>
                <p className="text-[#F5C518] text-[28px] font-black" style={{ fontFamily: "var(--font-display)" }}>10k+</p>
                <p className="text-white/25 text-[11px] tracking-[0.15em] uppercase mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="text-[#F5C518] text-[28px] font-black" style={{ fontFamily: "var(--font-display)" }}>20+</p>
                <p className="text-white/25 text-[11px] tracking-[0.15em] uppercase mt-1">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
