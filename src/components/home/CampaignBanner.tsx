"use client";

import Image from "next/image";
import Link from "next/link";

export default function CampaignBanner() {
  return (
    <section className="px-4 sm:px-6 py-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px] overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=85" alt="Campaign" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div className="bg-black flex items-center px-8 sm:px-16 py-16 lg:py-0">
            <div>
              <p className="text-white/30 text-[10px] tracking-[0.5em] uppercase mb-6">Summer 2026 Campaign</p>
              <h2 className="text-white text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
                Between<br/>the Lines
              </h2>
              <p className="text-white/35 text-[14px] leading-relaxed mb-10 max-w-xs">
                Our latest collection celebrates the space between who you are and who you&apos;re becoming. Shot on location in Lagos.
              </p>
              <Link href="/shop" className="text-white text-[11px] tracking-[0.25em] uppercase inline-flex items-center gap-4 group">
                View Campaign
                <span className="block w-10 h-px bg-white/25 group-hover:w-16 transition-all duration-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
