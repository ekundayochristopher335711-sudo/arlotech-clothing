"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) { setDone(true); setEmail(""); setTimeout(() => setDone(false), 3000); }
  };

  return (
    <footer>
      {/* Newsletter — full width dark strip */}
      <div className="bg-black">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <div className="max-w-lg mx-auto text-center">
            <h3
              className="text-white text-[clamp(1.3rem,3vw,1.8rem)] font-light mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Stay in the loop
            </h3>
            <p className="text-white/30 text-[13px] mb-8">
              New drops, behind-the-scenes, and exclusive access. Once a week, no spam.
            </p>
            <form onSubmit={subscribe} className="flex border-b border-white/20">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent py-3 text-white text-[13px] placeholder:text-white/25 focus:outline-none"
              />
              <button
                type="submit"
                className="text-white/50 hover:text-white text-[11px] tracking-[0.2em] uppercase transition-colors cursor-pointer pl-4"
              >
                {done ? "Done ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer links */}
      <div className="border-t border-[#eee]">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-14 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-[15px] tracking-[0.3em] uppercase" style={{ fontWeight: 300 }}>
                  <span style={{ fontWeight: 700 }}>ARLO</span>TECH
                </span>
              </Link>
              <p className="text-[13px] text-[#999] leading-relaxed">
                Born in Lagos.<br />Worn everywhere.
              </p>
            </div>

            {/* Shop */}
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-4">Shop</h4>
              <ul className="space-y-2.5">
                <li><Link href="/shop?filter=new" className="text-[13px] text-[#888] hover:text-black transition-colors">New Arrivals</Link></li>
                <li><Link href="/shop?category=menswear" className="text-[13px] text-[#888] hover:text-black transition-colors">Menswear</Link></li>
                <li><Link href="/shop?category=womenswear" className="text-[13px] text-[#888] hover:text-black transition-colors">Womenswear</Link></li>
                <li><Link href="/shop?category=accessories" className="text-[13px] text-[#888] hover:text-black transition-colors">Accessories</Link></li>
                <li><Link href="/shop" className="text-[13px] text-[#888] hover:text-black transition-colors">View All</Link></li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-4">Help</h4>
              <ul className="space-y-2.5">
                <li><Link href="/contact" className="text-[13px] text-[#888] hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping" className="text-[13px] text-[#888] hover:text-black transition-colors">Shipping & Returns</Link></li>
                <li><Link href="/size-guide" className="text-[13px] text-[#888] hover:text-black transition-colors">Size Guide</Link></li>
                <li><Link href="/faq" className="text-[13px] text-[#888] hover:text-black transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Follow */}
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase font-medium mb-4">Follow</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-[13px] text-[#888] hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="text-[13px] text-[#888] hover:text-black transition-colors">Twitter / X</a></li>
                <li><a href="#" className="text-[13px] text-[#888] hover:text-black transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#eee]">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#ccc]">&copy; {new Date().getFullYear()} Arlotech Clothing. All rights reserved.</p>
          <div className="flex gap-5 text-[11px] text-[#ccc]">
            <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
