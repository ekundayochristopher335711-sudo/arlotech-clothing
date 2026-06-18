"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useCurrencyStore } from "@/store/currency";
import { calculateDiscount } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import { sampleProducts, sampleCategories } from "@/lib/sample-data";
import type { Product, ProductVariant } from "@/types";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const raw = sampleProducts.find((p) => p.slug === slug);
  if (!raw) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-light mb-4" style={{ fontFamily: "var(--font-display)" }}>Product Not Found</h1>
        <Link href="/shop" className="btn-outline">Back to Shop</Link>
      </div>
    );
  }
  const product = { ...raw, category: sampleCategories.find((c) => c.id === raw.categoryId), createdAt: "", updatedAt: "" } as unknown as Product;
  return <Detail product={product} />;
}

function Detail({ product }: { product: Product }) {
  const [variant, setVariant] = useState<ProductVariant | null>(product.variants?.[0] || null);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [tab, setTab] = useState<"desc" | "care" | "reviews">("desc");
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { format } = useCurrencyStore();

  const wishlisted = isInWishlist(product.id);
  const price = variant?.price ? Number(variant.price) : Number(product.price);
  const hasDiscount = product.comparePrice && Number(product.comparePrice) > price;
  const discount = hasDiscount ? calculateDiscount(price, Number(product.comparePrice)) : 0;
  const sizes = Array.from(new Set(product.variants?.map((v) => v.size).filter(Boolean)));
  const colors = Array.from(new Map(product.variants?.filter((v) => v.color).map((v) => [v.color, { color: v.color!, hex: v.colorHex! }])).values());
  const avgRating = product.reviews?.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;
  const totalStock = product.variants?.reduce((s, v) => s + v.stock, 0) || 0;

  const related = sampleProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4).map((p) => ({
    ...p, category: sampleCategories.find((c) => c.id === p.categoryId), createdAt: "", updatedAt: ""
  })) as unknown as Product[];

  const handleAdd = () => { addItem(product, variant, qty); openCart(); };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoomPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-[12px] text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          {product.category && <><span>/</span><Link href={`/shop?category=${product.category.slug}`} className="hover:text-foreground transition-colors">{product.category.name}</Link></>}
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Gallery */}
          <div className="space-y-3">
            <div
              className="relative aspect-[4/5] bg-surface overflow-hidden cursor-crosshair"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              {product.images[imgIdx] ? (
                <Image
                  src={product.images[imgIdx].url}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-300 ${zoom ? "scale-[1.8]" : ""}`}
                  style={zoom ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              ) : <div className="w-full h-full bg-surface-dark" />}
              {discount > 0 && <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-[3px]">-{discount}%</span>}
              {product.isNew && <span className="absolute top-3 right-3 bg-foreground text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-[3px]">New</span>}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={img.id} onClick={() => setImgIdx(i)} className={`relative w-16 h-20 sm:w-20 sm:h-24 bg-surface overflow-hidden cursor-pointer transition-all ${i === imgIdx ? "ring-2 ring-foreground" : "ring-1 ring-border opacity-70 hover:opacity-100"}`}>
                    <Image src={img.url} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {product.category && <p className="text-[11px] text-muted tracking-widest uppercase mb-2">{product.category.name}</p>}
            <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-light mb-3" style={{ fontFamily: "var(--font-display)" }}>{product.name}</h1>

            {avgRating > 0 && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(avgRating) ? "#8B7355" : "none"} stroke={i < Math.round(avgRating) ? "#8B7355" : "#ccc"} strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-[12px] text-muted">{avgRating.toFixed(1)} ({product.reviews?.length})</span>
              </div>
            )}

            <div className="flex items-baseline gap-2.5 mb-5">
              <span className={`text-xl font-semibold ${hasDiscount ? "text-accent" : ""}`}>{format(price)}</span>
              {hasDiscount && <span className="text-sm text-muted line-through">{format(Number(product.comparePrice))}</span>}
            </div>

            <p className="text-[13px] text-muted leading-relaxed mb-6">{product.description}</p>

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-5">
                <p className="text-[11px] tracking-widest uppercase font-semibold mb-2">Color — <span className="font-normal text-muted">{variant?.color}</span></p>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button key={c.color} onClick={() => { const v = product.variants?.find((v2) => v2.color === c.color && (variant?.size ? v2.size === variant.size : true)); if (v) setVariant(v); }}
                      className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-all ${variant?.color === c.color ? "border-foreground scale-110" : "border-border"}`} style={{ backgroundColor: c.hex }} title={c.color} />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <p className="text-[11px] tracking-widest uppercase font-semibold">Size — <span className="font-normal text-muted">{variant?.size}</span></p>
                  <button className="text-[11px] text-muted underline cursor-pointer">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sizes.map((size) => {
                    const v = product.variants?.find((v2) => v2.size === size && (variant?.color ? v2.color === variant.color : true));
                    const ok = v && v.stock > 0;
                    return (
                      <button key={size} onClick={() => v && setVariant(v)} disabled={!ok}
                        className={`h-10 min-w-[42px] px-3 text-[12px] border cursor-pointer transition-colors ${variant?.size === size ? "border-foreground bg-foreground text-white" : ok ? "border-border hover:border-foreground" : "border-border text-muted-light line-through opacity-40 cursor-not-allowed"}`}>{size}</button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock */}
            {totalStock > 0 ? (
              <p className="text-[12px] mb-5">{totalStock <= 5 ? <span className="text-warning font-medium">Only {totalStock} left</span> : <span className="text-success">In Stock</span>}</p>
            ) : <p className="text-[12px] text-danger mb-5">Out of Stock</p>}

            {/* Actions */}
            <div className="flex gap-2 mb-5">
              <div className="flex items-center border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-11 h-12 flex items-center justify-center text-sm cursor-pointer hover:bg-surface">−</button>
                <span className="w-9 h-12 flex items-center justify-center text-[12px] font-medium border-x border-border">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-11 h-12 flex items-center justify-center text-sm cursor-pointer hover:bg-surface">+</button>
              </div>
              <button onClick={handleAdd} disabled={totalStock === 0} className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">Add to Bag — {format(price * qty)}</button>
              <button onClick={() => toggleItem(product)} className={`w-12 h-12 border flex items-center justify-center cursor-pointer transition-colors ${wishlisted ? "border-danger text-danger" : "border-border hover:border-foreground"}`} aria-label="Wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 py-5 border-y border-border text-center">
              {[
                { label: "Free Shipping", sub: "Orders $150+" },
                { label: "Easy Returns", sub: "30 days" },
                { label: "Secure Pay", sub: "SSL encrypted" },
              ].map((t) => (
                <div key={t.label}>
                  <p className="text-[11px] font-medium">{t.label}</p>
                  <p className="text-[10px] text-muted">{t.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t border-border pt-8">
          <div className="flex gap-6 border-b border-border mb-6">
            {([["desc", "Description"], ["care", "Details & Care"], ["reviews", `Reviews (${product.reviews?.length || 0})`]] as const).map(([key, label]) => (
              <button key={key} onClick={() => setTab(key)} className={`pb-3 text-[12px] tracking-widest uppercase cursor-pointer relative transition-colors ${tab === key ? "text-foreground font-semibold" : "text-muted hover:text-foreground"}`}>
                {label}
                {tab === key && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />}
              </button>
            ))}
          </div>
          <div className="max-w-2xl text-[13px] text-muted leading-relaxed">
            {tab === "desc" && <p>{product.description}</p>}
            {tab === "care" && (
              <div className="space-y-4">
                <div><h4 className="font-medium text-foreground mb-1">Materials</h4><p>Premium materials sourced from the finest suppliers worldwide.</p></div>
                <div><h4 className="font-medium text-foreground mb-1">Care</h4><ul className="list-disc pl-5 space-y-1"><li>Dry clean recommended</li><li>Store in a cool, dry place</li><li>Avoid prolonged sun exposure</li></ul></div>
              </div>
            )}
            {tab === "reviews" && (
              product.reviews && product.reviews.length > 0 ? (
                <div className="space-y-5">
                  {product.reviews.map((r) => (
                    <div key={r.id} className="pb-5 border-b border-border last:border-0">
                      <div className="flex gap-0.5 mb-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < r.rating ? "#8B7355" : "none"} stroke={i < r.rating ? "#8B7355" : "#ccc"} strokeWidth="1.5">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                          </svg>
                        ))}
                        {r.verified && <span className="ml-2 text-[10px] text-success tracking-wider uppercase">Verified</span>}
                      </div>
                      {r.title && <h4 className="text-sm font-medium text-foreground mb-0.5">{r.title}</h4>}
                      {r.comment && <p>{r.comment}</p>}
                      <p className="text-[11px] text-muted-light mt-1.5">— {r.user?.name || "Anonymous"}</p>
                    </div>
                  ))}
                </div>
              ) : <p>No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>You May Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
