"use client";

export default function BrandEthos() {
  return (
    <section className="py-20 sm:py-28 border-b border-[#1A1A1A]">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-[#F5C518] text-[11px] tracking-[0.5em] uppercase font-bold mb-6">The Brand</p>
        <h2
          className="text-[clamp(1.5rem,4vw,2.8rem)] leading-[1.2] font-bold uppercase tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We don&apos;t follow trends.{" "}
          <span className="text-white/30">We set them from the streets of Lagos.</span>
        </h2>
        <p className="text-white/35 text-[14px] leading-relaxed max-w-md mx-auto mt-6">
          Bold designs. Premium quality. Influenced by Afrobeats, street culture, and the unstoppable energy of the city. Made for people who move different.
        </p>
      </div>
    </section>
  );
}
