"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Menswear",
    subtitle: "Tailored for purpose",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&q=85",
    href: "/shop?category=menswear",
    tall: true,
  },
  {
    title: "Womenswear",
    subtitle: "Defined by you",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=85",
    href: "/shop?category=womenswear",
    tall: false,
  },
  {
    title: "Accessories",
    subtitle: "The finishing touch",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=85",
    href: "/shop?category=accessories",
    tall: false,
  },
  {
    title: "Footwear",
    subtitle: "Ground up",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85",
    href: "/shop?category=footwear",
    tall: true,
  },
];

export default function EditorialCollections() {
  return (
    <section className="pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          {/* Left tall */}
          <Link href={collections[0].href} className="group relative col-span-1 lg:col-span-5 aspect-[3/4] lg:aspect-auto lg:row-span-2 overflow-hidden">
            <Image src={collections[0].image} alt={collections[0].title} fill className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" sizes="(max-width:1024px) 50vw, 42vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-7">
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">{collections[0].subtitle}</p>
              <h3 className="text-white text-lg sm:text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>{collections[0].title}</h3>
            </div>
          </Link>

          {/* Top right */}
          <Link href={collections[1].href} className="group relative col-span-1 lg:col-span-7 aspect-[4/3] lg:aspect-[16/9] overflow-hidden">
            <Image src={collections[1].image} alt={collections[1].title} fill className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" sizes="(max-width:1024px) 50vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-7">
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">{collections[1].subtitle}</p>
              <h3 className="text-white text-lg sm:text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>{collections[1].title}</h3>
            </div>
          </Link>

          {/* Bottom right two */}
          <Link href={collections[2].href} className="group relative col-span-1 lg:col-span-4 aspect-[3/4] lg:aspect-auto overflow-hidden">
            <Image src={collections[2].image} alt={collections[2].title} fill className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" sizes="(max-width:1024px) 50vw, 33vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">{collections[2].subtitle}</p>
              <h3 className="text-white text-base sm:text-lg font-light" style={{ fontFamily: "var(--font-display)" }}>{collections[2].title}</h3>
            </div>
          </Link>

          <Link href={collections[3].href} className="group relative col-span-1 lg:col-span-3 aspect-[3/4] lg:aspect-auto overflow-hidden">
            <Image src={collections[3].image} alt={collections[3].title} fill className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" sizes="(max-width:1024px) 50vw, 25vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6">
              <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">{collections[3].subtitle}</p>
              <h3 className="text-white text-base sm:text-lg font-light" style={{ fontFamily: "var(--font-display)" }}>{collections[3].title}</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
