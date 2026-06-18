"use client";

import Link from "next/link";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="relative h-[320px] sm:h-[400px] overflow-hidden bg-[#111]">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=80"
          alt="Sale collection"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-accent-light font-semibold mb-3">Limited Time</p>
            <h2 className="text-3xl sm:text-4xl text-white font-light mb-4 leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              Up to 30% Off<br />Selected Styles
            </h2>
            <p className="text-white/45 text-sm mb-6 max-w-xs mx-auto">
              End-of-season markdowns on some of our most coveted pieces.
            </p>
            <Link href="/shop?sale=true" className="btn-accent">Shop the Sale</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
