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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { items, toggleCart } = useCartStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <header
        className="sticky top-0 z-50 bg-background isolate border-b border-transparent transition-all duration-300"
        style={{ borderColor: scrolled ? "rgba(0,0,0,0.06)" : "transparent", boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.03)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-[60px] lg:h-[64px]">
            {/* Left: mobile menu + desktop nav */}
            <div className="flex items-center gap-6 flex-1">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden p-1 cursor-pointer" aria-label="Menu">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 7h16M4 12h12" strokeLinecap="round"/>
                </svg>
              </button>
              <nav className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    className={`text-[12px] tracking-[0.12em] uppercase transition-colors ${
                      pathname === link.href ? "text-foreground font-semibold" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="text-[18px] sm:text-[20px] tracking-[0.3em] uppercase font-extralight select-none whitespace-nowrap">
                <span className="font-bold">ARLO</span>TECH
              </span>
            </Link>

            {/* Right: icons */}
            <div className="flex items-center gap-0.5 flex-1 justify-end">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-foreground/60 hover:text-foreground transition-colors cursor-pointer" aria-label="Search">
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                </svg>
              </button>
              <Link href="/account" className="hidden sm:flex p-2 text-foreground/60 hover:text-foreground transition-colors" aria-label="Account">
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4"/><path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link href="/account/wishlist" className="hidden sm:flex p-2 text-foreground/60 hover:text-foreground transition-colors relative" aria-label="Wishlist">
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {wishlistItems.length > 0 && <span className="absolute top-1 right-0 w-[14px] h-[14px] bg-foreground text-white text-[8px] font-bold flex items-center justify-center rounded-full">{wishlistItems.length}</span>}
              </Link>
              <button onClick={toggleCart} className="p-2 text-foreground/60 hover:text-foreground transition-colors relative cursor-pointer" aria-label="Cart">
                <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {itemCount > 0 && <span className="absolute top-1 right-0 w-[14px] h-[14px] bg-foreground text-white text-[8px] font-bold flex items-center justify-center rounded-full">{itemCount}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        {searchOpen && (
          <div className="border-t border-border/50">
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder:text-muted-light" autoFocus />
              <button type="button" onClick={() => setSearchOpen(false)} className="p-1 text-muted hover:text-foreground cursor-pointer">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-background flex flex-col">
            <div className="flex items-center justify-between px-5 h-[60px] border-b border-border/50">
              <span className="text-[16px] tracking-[0.25em] uppercase font-extralight"><span className="font-bold">ARLO</span>TECH</span>
              <button onClick={() => setMobileOpen(false)} className="p-1 cursor-pointer" aria-label="Close">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
              </button>
            </div>
            <nav className="flex-1 py-6 overflow-y-auto">
              <Link href="/" className="block px-6 py-3.5 text-[13px] tracking-[0.1em] uppercase text-foreground font-medium">Home</Link>
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block px-6 py-3.5 text-[13px] tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors">{link.label}</Link>
              ))}
              <div className="my-4 mx-6 border-t border-border/50" />
              <Link href="/auth/login" className="block px-6 py-3.5 text-[13px] tracking-[0.1em] uppercase text-muted">Sign In</Link>
              <Link href="/auth/register" className="block px-6 py-3.5 text-[13px] tracking-[0.1em] uppercase text-muted">Create Account</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
