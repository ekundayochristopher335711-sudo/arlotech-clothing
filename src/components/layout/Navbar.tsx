"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop?filter=new", label: "New Arrivals" },
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=menswear", label: "Menswear" },
  { href: "/shop?category=womenswear", label: "Womenswear" },
  { href: "/shop?category=accessories", label: "Accessories" },
  { href: "/shop?category=footwear", label: "Footwear" },
];

const desktopLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=menswear", label: "Men" },
  { href: "/shop?category=womenswear", label: "Women" },
  { href: "/shop?category=accessories", label: "Accessories" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items, toggleCart } = useCartStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) { window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`; setSearchOpen(false); setSearchQuery(""); }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-[#1A1A1A]">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[56px]">
            <div className="flex items-center gap-7 flex-1">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden cursor-pointer" aria-label="Menu">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="1.5"><path d="M4 7h16M4 12h12" strokeLinecap="round"/></svg>
              </button>
              <nav className="hidden lg:flex items-center gap-6">
                {desktopLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    className={`text-[11px] tracking-[0.14em] uppercase font-medium transition-colors ${pathname === link.href ? "text-[#F5C518]" : "text-white/50 hover:text-white"}`}
                  >{link.label}</Link>
                ))}
              </nav>
            </div>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-[18px] sm:text-[20px] tracking-[0.25em] uppercase font-black select-none text-white">
                ARLO<span className="text-[#F5C518]">TECH</span>
              </span>
            </Link>

            <div className="flex items-center gap-1 flex-1 justify-end">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-white/40 hover:text-white transition-colors cursor-pointer" aria-label="Search">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
              </button>
              <Link href="/account" className="hidden sm:flex p-2 text-white/40 hover:text-white transition-colors" aria-label="Account">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round"/></svg>
              </Link>
              <button onClick={toggleCart} className="p-2 text-white/40 hover:text-white transition-colors relative cursor-pointer" aria-label="Cart">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {itemCount > 0 && <span className="absolute top-0.5 right-0 w-[13px] h-[13px] bg-[#F5C518] text-black text-[7px] font-bold flex items-center justify-center rounded-full">{itemCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-[#1A1A1A]">
            <form onSubmit={handleSearch} className="max-w-[1400px] mx-auto px-5 sm:px-8 py-3 flex items-center gap-3">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent border-none text-[13px] text-white focus:outline-none placeholder:text-white/25" autoFocus />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-white/30 hover:text-white cursor-pointer text-[11px] tracking-widest uppercase">Close</button>
            </form>
          </div>
        )}
      </header>

      {/* Full-screen mobile nav — Berluti style */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden bg-[#0A0A0A] flex flex-col">
          {/* Close button top-right */}
          <div className="flex items-center justify-end px-6 h-[56px] shrink-0">
            <button onClick={() => setMobileOpen(false)} className="cursor-pointer text-white/50 hover:text-white" aria-label="Close">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Main nav links — large serif text */}
          <nav className="flex-1 px-8 pt-4 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 text-[26px] sm:text-[32px] text-white font-light tracking-tight hover:text-[#F5C518] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom secondary links */}
          <div className="px-8 pb-10 pt-6 border-t border-[#1A1A1A] space-y-3 shrink-0">
            <Link href="/auth/login" className="block text-[15px] text-white/40 hover:text-white transition-colors">Sign in / Register</Link>
            <Link href="/account/wishlist" className="block text-[15px] text-white/40 hover:text-white transition-colors">Wish List</Link>
            <Link href="/contact" className="block text-[15px] text-white/40 hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
}
