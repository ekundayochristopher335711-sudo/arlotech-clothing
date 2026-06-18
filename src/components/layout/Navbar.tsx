"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

const navLinks = [
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
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-[56px] lg:h-[62px]">
            {/* Left */}
            <div className="flex items-center gap-7 flex-1">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden cursor-pointer" aria-label="Menu">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth="1.5"><path d="M4 7h16M4 12h12" strokeLinecap="round"/></svg>
              </button>
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    className={`text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 ${
                      pathname === link.href ? "text-black font-medium" : "text-[#888] hover:text-black"
                    }`}
                  >{link.label}</Link>
                ))}
              </nav>
            </div>

            {/* Center logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-[17px] sm:text-[19px] tracking-[0.35em] uppercase select-none" style={{ fontWeight: 300 }}>
                <span style={{ fontWeight: 700 }}>ARLO</span>TECH
              </span>
            </Link>

            {/* Right */}
            <div className="flex items-center gap-1 flex-1 justify-end">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-black/50 hover:text-black transition-colors cursor-pointer" aria-label="Search">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
              </button>
              <Link href="/account" className="hidden sm:flex p-2 text-black/50 hover:text-black transition-colors" aria-label="Account">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round"/></svg>
              </Link>
              <button onClick={toggleCart} className="p-2 text-black/50 hover:text-black transition-colors relative cursor-pointer" aria-label="Cart">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {itemCount > 0 && <span className="absolute top-0.5 right-0 w-[13px] h-[13px] bg-black text-white text-[7px] font-bold flex items-center justify-center rounded-full">{itemCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        {searchOpen && (
          <div className="border-t border-[#eee]">
            <form onSubmit={handleSearch} className="max-w-[1400px] mx-auto px-5 sm:px-8 py-3 flex items-center gap-3">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" className="flex-1 bg-transparent border-none text-[13px] focus:outline-none placeholder:text-[#bbb]" autoFocus />
              <button type="button" onClick={() => setSearchOpen(false)} className="text-[#aaa] hover:text-black cursor-pointer text-[11px] tracking-widest uppercase">Close</button>
            </form>
          </div>
        )}

        {/* Bottom border — 1px line */}
        <div className="h-px bg-[#eee]" />
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[300px] bg-white flex flex-col">
            <div className="flex items-center justify-between px-6 h-[56px]">
              <span className="text-[15px] tracking-[0.3em] uppercase" style={{ fontWeight: 300 }}>
                <span style={{ fontWeight: 700 }}>ARLO</span>TECH
              </span>
              <button onClick={() => setMobileOpen(false)} className="cursor-pointer" aria-label="Close">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#000" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="h-px bg-[#eee]" />
            <nav className="flex-1 py-8 px-6">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block py-3 text-[13px] tracking-[0.12em] uppercase text-[#666] hover:text-black transition-colors">{link.label}</Link>
              ))}
              <div className="h-px bg-[#eee] my-6" />
              <Link href="/account" className="block py-3 text-[13px] tracking-[0.12em] uppercase text-[#666]">Account</Link>
              <Link href="/account/wishlist" className="block py-3 text-[13px] tracking-[0.12em] uppercase text-[#666]">Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
