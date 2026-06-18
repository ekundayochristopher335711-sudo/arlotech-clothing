"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

const navLinks = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=menswear", label: "Men" },
  { href: "/shop?category=womenswear", label: "Women" },
  { href: "/shop?category=accessories", label: "Accessories" },
  { href: "/shop?category=footwear", label: "Footwear" },
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
      <header className="sticky top-0 z-50 bg-background border-b border-border/60 isolate" style={{ boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.05)" : "none", transition: "box-shadow 0.3s" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-[68px]">
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(true)} className="lg:hidden -ml-1 p-2 cursor-pointer" aria-label="Menu">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="lg:mr-12">
              <span className="text-[20px] sm:text-[22px] tracking-[0.25em] uppercase font-extralight select-none">
                <span className="font-semibold">Arlo</span>tech
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`nav-link text-[13px] tracking-wide transition-colors ${
                    pathname === link.href ? "text-foreground font-medium active" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 text-foreground/70 hover:text-foreground transition-colors cursor-pointer" aria-label="Search">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Account */}
              <Link href="/account" className="hidden sm:flex p-2.5 text-foreground/70 hover:text-foreground transition-colors" aria-label="Account">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="8" r="4"/><path d="M4 21c0-3.3 3.6-6 8-6s8 2.7 8 6" strokeLinecap="round"/>
                </svg>
              </Link>

              {/* Wishlist */}
              <Link href="/account/wishlist" className="hidden sm:flex p-2.5 text-foreground/70 hover:text-foreground transition-colors relative" aria-label="Wishlist">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 21C12 21 4 15 4 8.5C4 5.46 6.46 3 9.5 3c1.74 0 3.41.81 4.5 2.09A5.99 5.99 0 0118.5 3C21.54 3 24 5.46 24 8.5c0 6.5-8 12.5-8 12.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(-2, 0)"/>
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-0.5 w-[16px] h-[16px] bg-foreground text-white text-[9px] font-semibold flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button onClick={toggleCart} className="p-2.5 text-foreground/70 hover:text-foreground transition-colors relative cursor-pointer" aria-label="Cart">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute top-1 right-0.5 w-[16px] h-[16px] bg-foreground text-white text-[9px] font-semibold flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search dropdown */}
        {searchOpen && (
          <div className="border-t border-border">
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#999" strokeWidth="2">
                <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent border-none text-sm focus:outline-none placeholder:text-gray-400"
                autoFocus
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="p-1 text-gray-400 hover:text-foreground cursor-pointer">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-[280px] bg-white flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-border">
              <span className="text-[18px] tracking-[0.2em] uppercase font-extralight">
                <span className="font-semibold">Arlo</span>tech
              </span>
              <button onClick={() => setMobileOpen(false)} className="p-1 cursor-pointer" aria-label="Close">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <nav className="flex-1 py-3 overflow-y-auto">
              <Link href="/" className="block px-5 py-3 text-[13px] tracking-wide text-foreground font-medium">Home</Link>
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="block px-5 py-3 text-[13px] tracking-wide text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="my-3 mx-5 border-t border-border" />
              <Link href="/auth/login" className="block px-5 py-3 text-[13px] tracking-wide text-muted-foreground">Sign In</Link>
              <Link href="/auth/register" className="block px-5 py-3 text-[13px] tracking-wide text-muted-foreground">Create Account</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
