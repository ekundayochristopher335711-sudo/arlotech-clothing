"use client";

import Image from "next/image";
import Link from "next/link";

export default function CampaignBanner() {
  return (
    <section className="py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=85"
              alt="Campaign"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="bg-[#1A1714] flex items-center px-8 sm:px-14 py-14 lg:py-0">
            <div>
              <p className="text-accent-light text-[11px] tracking-[0.4em] uppercase font-semibold mb-5">
                Summer 2026
              </p>
              <h2
                className="text-white text-[clamp(1.8rem,4vw,3rem)] leading-[1.1] font-light mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Between the Lines
              </h2>
              <p className="text-white/40 text-[15px] leading-relaxed mb-8 max-w-sm">
                Our latest campaign celebrates the space between who you are and who you&apos;re becoming.
                Shot on location in Lagos.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 text-white text-[12px] tracking-[0.2em] uppercase font-medium group"
              >
                View Campaign
                <span className="w-8 h-[1px] bg-white/30 group-hover:w-14 transition-all duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
