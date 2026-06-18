"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] bg-black overflow-hidden flex items-center justify-center">
        <Image src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1600&q=85" alt="" fill className="object-cover opacity-30" sizes="100vw" />
        <div className="relative z-10 text-center px-6">
          <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-4">Our Story</p>
          <h1 className="text-white text-[clamp(2.5rem,8vw,5rem)] font-black uppercase leading-[0.9] tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            About<br/>Arlotech
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 sm:py-28 border-b border-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-5">Who We Are</p>
              <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold uppercase leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Born in Lagos.<br/>Built for the Streets.
              </h2>
              <div className="space-y-4 text-white/40 text-[15px] leading-relaxed">
                <p>Arlotech Clothing started with a simple belief — that Nigerian streetwear can stand toe-to-toe with any brand in the world. No compromise on quality, no following trends. We create for people who move different.</p>
                <p>Our designs are influenced by Afrobeats, Hip Hop, and the raw energy of Lagos street culture. Every piece is crafted with premium materials and bold graphics that tell a story.</p>
                <p>From a small room in Lagos to shipping worldwide — we&apos;re just getting started. The goal is simple: <span className="text-[#F5C518] font-semibold">Wear Arlotech Everywhere.</span></p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
              <Image src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1000&q=85" alt="Arlotech Brand" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-24 border-b border-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="text-center mb-14">
            <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-3">What We Stand For</p>
            <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10 sm:gap-14">
            {[
              { title: "Quality First", desc: "Premium fabrics, expert craftsmanship. Every piece is made to last — not just for the season, but for years." },
              { title: "Culture Driven", desc: "Our designs are rooted in Afrobeats, street culture, and the creative energy of Lagos. We wear our identity." },
              { title: "Global Reach", desc: "Made in Lagos, shipped worldwide. Nigerian fashion deserves a global stage — and we're taking it there." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <h3 className="text-[#F5C518] text-[15px] font-bold uppercase tracking-wide mb-3" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                <p className="text-white/30 text-[14px] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 sm:py-20 border-b border-[#1A1A1A]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {[
              { num: "50+", label: "Unique Designs" },
              { num: "10k+", label: "Happy Customers" },
              { num: "20+", label: "Countries Shipped" },
              { num: "2024", label: "Year Founded" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#F5C518] text-[clamp(2rem,5vw,3rem)] font-black" style={{ fontFamily: "var(--font-display)" }}>{s.num}</p>
                <p className="text-white/25 text-[11px] tracking-[0.2em] uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-[clamp(1.6rem,4vw,2.5rem)] font-bold uppercase leading-[1.1] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Ready to Wear Different?
          </h2>
          <p className="text-white/30 text-[14px] mb-8">Explore our latest collection and find pieces that match your energy.</p>
          <Link href="/shop" className="btn-accent">Shop the Collection</Link>
        </div>
      </section>
    </>
  );
}
