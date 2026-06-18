"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useCurrencyStore } from "@/store/currency";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { format } = useCurrencyStore();

  const img1 = product.images?.[0];
  const img2 = product.images?.[1];
  const hasDiscount = product.comparePrice && Number(product.comparePrice) > Number(product.price);
  const wishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addItem(product, product.variants?.[0] ?? null);
    openCart();
  };

  return (
    <div className="group product-card" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] bg-[#111] overflow-hidden mb-3">
        {img1 ? (
          <Image src={hovered && img2 ? img2.url : img1.url} alt={product.name} fill className="object-cover product-img" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
        ) : (
          <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center text-white/20 text-xs">No image</div>
        )}

        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#F5C518] text-black text-[9px] font-bold tracking-[0.15em] uppercase px-2.5 py-1">New</span>
        )}

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
          className={`absolute top-3 right-3 w-7 h-7 flex items-center justify-center transition-opacity cursor-pointer ${hovered || wishlisted ? "opacity-100" : "opacity-0"}`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "#F5C518" : "none"} stroke={wishlisted ? "#F5C518" : "#fff"} strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>

        <div className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          <button onClick={handleAdd} className="w-full bg-[#F5C518] text-black text-[10px] font-bold tracking-[0.2em] uppercase py-3 hover:bg-white transition-colors cursor-pointer">
            Add to Bag
          </button>
        </div>
      </Link>

      <Link href={`/product/${product.slug}`} className="block">
        <h3 className="text-[13px] text-white/80 font-medium leading-snug mb-0.5">{product.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] text-white font-bold">{format(Number(product.price))}</span>
          {hasDiscount && (
            <span className="text-[12px] text-white/30 line-through">{format(Number(product.comparePrice))}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
