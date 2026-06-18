"use client";

import Image from "next/image";
import Link from "next/link";

export default function CampaignBanner() {
  return (
    <section className="py-4 sm:py-8">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="relative h-[400px] sm:h-[500px] overflow-hidden bg-black">
          <Image src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1400&q=85" alt="Campaign" fill className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-4">Summer 2026 Collection</p>
              <h2 className="text-white text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.95] tracking-tight mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Fashion<br/>Without Limits
              </h2>
              <Link href="/shop" className="btn-accent">Explore Collection</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
