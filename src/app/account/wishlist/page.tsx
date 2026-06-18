"use client";

import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { useWishlistStore } from "@/store/wishlist";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#D1CAC0" strokeWidth="1.2" className="mx-auto mb-6"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <h1 className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-display)" }}>Your Wishlist is Empty</h1>
        <p className="text-muted text-sm mb-8">Save your favourite pieces to revisit them later.</p>
        <Link href="/shop" className="btn-primary inline-block">Browse Collection</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)" }}>Wishlist</h1>
          <p className="text-sm text-muted mt-1">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
        </div>
        <button onClick={clearWishlist} className="flex items-center gap-2 text-sm text-muted hover:text-danger transition-colors cursor-pointer">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8">
        {items.map((product) => <ProductCard key={product.id} product={product as Product} />)}
      </div>
    </div>
  );
}
