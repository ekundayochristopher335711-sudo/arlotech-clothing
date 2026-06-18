"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { calculateDiscount } from "@/lib/utils";
import type { Product, ProductVariant } from "@/types";

interface Props {
  product: Product;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: Props) {
  const [variant, setVariant] = useState<ProductVariant | null>(product.variants?.[0] || null);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const { addItem, openCart } = useCartStore();
  const { format } = useCurrencyStore();

  const price = variant?.price ? Number(variant.price) : Number(product.price);
  const hasDiscount = product.comparePrice && Number(product.comparePrice) > price;
  const discount = hasDiscount ? calculateDiscount(price, Number(product.comparePrice)) : 0;

  const sizes = Array.from(new Set(product.variants?.map((v) => v.size).filter(Boolean)));
  const colors = Array.from(
    new Map(product.variants?.filter((v) => v.color).map((v) => [v.color, { color: v.color!, hex: v.colorHex! }])).values()
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleAdd = () => { addItem(product, variant, qty); onClose(); openCart(); };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-surface" aria-label="Close">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-surface">
            {product.images[imgIdx] ? (
              <Image src={product.images[imgIdx].url} alt={product.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            ) : <div className="w-full h-full bg-surface-dark" />}
            {discount > 0 && <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-[3px]">-{discount}%</span>}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`w-1.5 h-1.5 rounded-full cursor-pointer ${i === imgIdx ? "bg-foreground" : "bg-foreground/25"}`} />
                ))}
              </div>
            )}
          </div>

          <div className="p-6 sm:p-7">
            {product.category && <p className="text-[11px] text-muted tracking-wide uppercase mb-1">{product.category.name}</p>}
            <h2 className="text-xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className={`text-lg font-semibold ${hasDiscount ? "text-accent" : ""}`}>{format(price)}</span>
              {hasDiscount && <span className="text-sm text-muted line-through">{format(Number(product.comparePrice))}</span>}
            </div>
            <p className="text-[13px] text-muted leading-relaxed mb-5 line-clamp-3">{product.description}</p>

            {colors.length > 0 && (
              <div className="mb-4">
                <p className="text-[11px] tracking-wide uppercase font-semibold mb-2">Color: <span className="font-normal text-muted">{variant?.color}</span></p>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button key={c.color} onClick={() => { const v = product.variants?.find((v2) => v2.color === c.color && (variant?.size ? v2.size === variant.size : true)); if (v) setVariant(v); }}
                      className={`w-7 h-7 rounded-full border-2 cursor-pointer ${variant?.color === c.color ? "border-foreground" : "border-border"}`} style={{ backgroundColor: c.hex }} title={c.color} />
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] tracking-wide uppercase font-semibold mb-2">Size: <span className="font-normal text-muted">{variant?.size}</span></p>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((size) => {
                    const v = product.variants?.find((v2) => v2.size === size && (variant?.color ? v2.color === variant.color : true));
                    const inStock = v && v.stock > 0;
                    return (
                      <button key={size} onClick={() => v && setVariant(v)} disabled={!inStock}
                        className={`h-9 min-w-[36px] px-2.5 text-[12px] border cursor-pointer transition-colors ${
                          variant?.size === size ? "border-foreground bg-foreground text-white" : inStock ? "border-border hover:border-foreground" : "border-border text-muted-light line-through opacity-40 cursor-not-allowed"
                        }`}>{size}</button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-2 mb-4">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-10 flex items-center justify-center text-sm cursor-pointer">−</button>
                <span className="w-8 h-10 flex items-center justify-center text-[12px] font-medium border-x border-border">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-9 h-10 flex items-center justify-center text-sm cursor-pointer">+</button>
              </div>
              <button onClick={handleAdd} className="flex-1 btn-primary cursor-pointer">Add to Bag — {format(price * qty)}</button>
            </div>

            <Link href={`/product/${product.slug}`} onClick={onClose} className="text-[11px] tracking-widest uppercase text-muted hover:text-foreground transition-colors">
              View Full Details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
