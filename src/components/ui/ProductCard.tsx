"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useCurrencyStore } from "@/store/currency";
import { calculateDiscount } from "@/lib/utils";
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
  const discount = hasDiscount ? calculateDiscount(Number(product.price), Number(product.comparePrice)) : 0;
  const wishlisted = isInWishlist(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, product.variants?.[0] ?? null);
    openCart();
  };

  return (
    <div
      className="group product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] bg-surface overflow-hidden mb-3 rounded-xl">
        {img1 ? (
          <Image
            src={hovered && img2 ? img2.url : img1.url}
            alt={product.name}
            fill
            className="object-cover product-img"
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-surface-dark flex items-center justify-center text-muted-light text-xs">No image</div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-foreground text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-[3px]">New</span>
          )}
          {discount > 0 && (
            <span className="bg-accent text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-[3px]">-{discount}%</span>
          )}
        </div>

        {/* Wishlist heart */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem(product); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/60 backdrop-blur-xl flex items-center justify-center transition-all hover:bg-white/90 cursor-pointer shadow-sm"
          aria-label="Wishlist"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={wishlisted ? "#C53030" : "none"} stroke={wishlisted ? "#C53030" : "#555"} strokeWidth="1.8">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Hover actions */}
        <div className={`absolute bottom-0 left-0 right-0 p-2.5 transition-all duration-300 ${hovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}>
          <div className="flex gap-1.5">
            <button
              onClick={handleAdd}
              className="flex-1 bg-foreground/80 backdrop-blur-xl text-white text-[11px] font-semibold tracking-wider uppercase py-2.5 rounded-lg hover:bg-foreground transition-colors cursor-pointer"
            >
              Add to Bag
            </button>
            {onQuickView && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(product); }}
                className="w-10 bg-white/60 backdrop-blur-xl rounded-lg flex items-center justify-center hover:bg-white/90 transition-colors cursor-pointer"
                aria-label="Quick view"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#333" strokeWidth="1.8">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </Link>

      {/* Details */}
      <Link href={`/product/${product.slug}`} className="block">
        {product.category && (
          <p className="text-[11px] text-muted tracking-wide uppercase mb-0.5">{product.category.name}</p>
        )}
        <h3 className="text-[13px] sm:text-sm font-medium leading-snug mb-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-[13px] sm:text-sm font-semibold ${hasDiscount ? "text-accent" : ""}`}>
            {format(Number(product.price))}
          </span>
          {hasDiscount && (
            <span className="text-[12px] text-muted line-through">{format(Number(product.comparePrice))}</span>
          )}
        </div>
        {/* Color dots */}
        {product.variants && (() => {
          const uniqueColors = Array.from(new Set(product.variants.map((v) => v.colorHex).filter(Boolean)));
          return uniqueColors.length > 1 ? (
            <div className="flex gap-1 mt-1.5">
              {uniqueColors.slice(0, 4).map((hex, i) => (
                <span key={i} className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: hex! }} />
              ))}
              {uniqueColors.length > 4 && <span className="text-[10px] text-muted self-center ml-0.5">+{uniqueColors.length - 4}</span>}
            </div>
          ) : null;
        })()}
      </Link>
    </div>
  );
}
