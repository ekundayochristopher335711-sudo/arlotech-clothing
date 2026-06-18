"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import QuickView from "@/components/shop/QuickView";
import { sampleProducts, sampleCategories } from "@/lib/sample-data";
import type { Product } from "@/types";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc", label: "A — Z" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "8", "9", "10", "11", "12"];

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center text-muted text-sm">Loading products...</div>}>
      <ShopContent />
    </Suspense>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");
  const searchParam = searchParams.get("search");

  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleSize = (size: string) => setSelectedSizes((p) => p.includes(size) ? p.filter((s) => s !== size) : [...p, size]);

  const products = useMemo(() => {
    let filtered = [...sampleProducts];
    if (searchParam) { const q = searchParam.toLowerCase(); filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)); }
    if (selectedCategory) { const cat = sampleCategories.find((c) => c.slug === selectedCategory); if (cat) filtered = filtered.filter((p) => p.categoryId === cat.id); }
    if (filterParam === "new") filtered = filtered.filter((p) => p.isNew);
    else if (filterParam === "bestseller") filtered = filtered.filter((p) => p.isBestseller);
    else if (filterParam === "featured") filtered = filtered.filter((p) => p.featured);
    if (selectedSizes.length > 0) filtered = filtered.filter((p) => p.variants.some((v) => "size" in v && v.size && selectedSizes.includes(v.size as string)));
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case "price-asc": filtered.sort((a, b) => a.price - b.price); break;
      case "price-desc": filtered.sort((a, b) => b.price - a.price); break;
      case "name-asc": filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return filtered.map((p) => ({ ...p, category: sampleCategories.find((c) => c.id === p.categoryId), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
  }, [searchParam, selectedCategory, filterParam, selectedSizes, priceRange, sortBy]);

  const clearFilters = () => { setSelectedCategory(""); setSelectedSizes([]); setPriceRange([0, 1000]); };
  const hasActive = selectedCategory || selectedSizes.length > 0 || priceRange[0] > 0 || priceRange[1] < 1000;

  const pageTitle = searchParam
    ? `Results for "${searchParam}"`
    : selectedCategory
    ? sampleCategories.find((c) => c.slug === selectedCategory)?.name || "Shop"
    : filterParam === "new" ? "New Arrivals"
    : filterParam === "bestseller" ? "Bestsellers"
    : "Shop All";

  return (
    <>
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center">
          <h1 className="text-[clamp(1.5rem,3.5vw,2.2rem)] font-light mb-1" style={{ fontFamily: "var(--font-display)" }}>{pageTitle}</h1>
          <p className="text-[13px] text-muted">{products.length} {products.length === 1 ? "product" : "products"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-border">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M6 12h12M8 18h8" strokeLinecap="round"/></svg>
            <span className="hidden sm:inline">Filters</span>
            {hasActive && <span className="w-1.5 h-1.5 bg-accent rounded-full" />}
          </button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-[13px] bg-transparent border border-border px-3 py-2 pr-8 cursor-pointer focus:outline-none focus:border-foreground">
            {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`${filtersOpen ? "block" : "hidden"} lg:block w-full lg:w-[220px] flex-shrink-0`}>
            <div className="sticky top-[88px] space-y-7">
              <div>
                <h3 className="text-[11px] tracking-widest uppercase font-semibold mb-3">Categories</h3>
                <div className="space-y-1.5">
                  <button onClick={() => setSelectedCategory("")} className={`block text-[13px] cursor-pointer transition-colors ${!selectedCategory ? "text-accent font-medium" : "text-muted hover:text-foreground"}`}>All</button>
                  {sampleCategories.map((c) => (
                    <button key={c.id} onClick={() => setSelectedCategory(c.slug)} className={`block text-[13px] cursor-pointer transition-colors ${selectedCategory === c.slug ? "text-accent font-medium" : "text-muted hover:text-foreground"}`}>{c.name}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] tracking-widest uppercase font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-1.5">
                  {sizeOptions.map((s) => (
                    <button key={s} onClick={() => toggleSize(s)} className={`w-9 h-9 text-[11px] border flex items-center justify-center cursor-pointer transition-colors ${selectedSizes.includes(s) ? "border-foreground bg-foreground text-white" : "border-border hover:border-foreground"}`}>{s}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-[11px] tracking-widest uppercase font-semibold mb-3">Price</h3>
                <div className="flex items-center gap-2">
                  <input type="number" value={priceRange[0]} onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])} className="w-full px-2.5 py-2 text-[13px] border border-border focus:border-foreground focus:outline-none" placeholder="Min" />
                  <span className="text-muted text-xs">—</span>
                  <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])} className="w-full px-2.5 py-2 text-[13px] border border-border focus:border-foreground focus:outline-none" placeholder="Max" />
                </div>
              </div>
              {hasActive && (
                <button onClick={clearFilters} className="text-[12px] text-muted hover:text-foreground transition-colors cursor-pointer">× Clear filters</button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted mb-1">No products found</p>
                <p className="text-[13px] text-muted-light mb-5">Try adjusting your filters.</p>
                <button onClick={clearFilters} className="btn-outline text-[11px] cursor-pointer">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p as unknown as Product} onQuickView={(prod) => setQuickViewProduct(prod)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {quickViewProduct && <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
    </>
  );
}
