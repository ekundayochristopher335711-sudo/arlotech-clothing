"use client";

import Link from "next/link";
import { useState } from "react";

const links = {
  shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Menswear", href: "/shop?category=menswear" },
    { label: "Womenswear", href: "/shop?category=womenswear" },
    { label: "Accessories", href: "/shop?category=accessories" },
    { label: "View All", href: "/shop" },
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "FAQ", href: "/faq" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setDone(true); setEmail(""); setTimeout(() => setDone(false), 3000); }
  };

  return (
    <footer className="border-t border-[#eee]">
      {/* Newsletter */}
      <div className="border-b border-[#eee]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-14 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h3 className="text-[13px] tracking-[0.15em] uppercase font-medium mb-1">Stay in the loop</h3>
            <p className="text-[13px] text-[#999]">New drops, stories, and exclusive access. No spam.</p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-md">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required
              className="flex-1 px-0 py-3 bg-transparent border-b border-[#ddd] text-[13px] placeholder:text-[#bbb] focus:outline-none focus:border-black transition-colors" />
            <button type="submit" className="ml-4 text-[11px] tracking-[0.2em] uppercase font-medium text-black hover:text-[#666] transition-colors cursor-pointer whitespace-nowrap">
              {done ? "Done" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="text-[15px] tracking-[0.3em] uppercase" style={{ fontWeight: 300 }}>
                <span style={{ fontWeight: 700 }}>ARLO</span>TECH
              </span>
            </Link>
            <p className="text-[13px] leading-relaxed text-[#999] max-w-[220px]">
              Born in Lagos. Worn everywhere.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5">Shop</h4>
            <ul className="space-y-3">
              {links.shop.map((l) => <li key={l.href}><Link href={l.href} className="text-[13px] text-[#888] hover:text-black transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5">Info</h4>
            <ul className="space-y-3">
              {links.info.map((l) => <li key={l.href}><Link href={l.href} className="text-[13px] text-[#888] hover:text-black transition-colors">{l.label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-5">Follow</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-[13px] text-[#888] hover:text-black transition-colors">Instagram</a></li>
              <li><a href="#" className="text-[13px] text-[#888] hover:text-black transition-colors">Twitter / X</a></li>
              <li><a href="#" className="text-[13px] text-[#888] hover:text-black transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#eee]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#bbb]">&copy; {new Date().getFullYear()} Arlotech Clothing</p>
          <div className="flex gap-5 text-[11px] text-[#bbb]">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
