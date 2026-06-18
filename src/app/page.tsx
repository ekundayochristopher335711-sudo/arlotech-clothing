"use client";

import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Testimonials from "@/components/home/Testimonials";
import BrandFeatures from "@/components/home/BrandFeatures";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandFeatures />
      <CategoryGrid />
      <FeaturedProducts
        title="Bestsellers"
        subtitle="Most Loved"
        filter="bestseller"
        limit={4}
        viewAllHref="/shop?filter=bestseller"
      />
      <PromoBanner />
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Just Dropped"
        filter="new"
        limit={4}
        viewAllHref="/shop?filter=new"
      />
      <Testimonials />
      <FeaturedProducts
        title="Editor's Picks"
        subtitle="Curated Selection"
        filter="featured"
        limit={4}
        viewAllHref="/shop?filter=featured"
      />
      <InstagramFeed />
    </>
  );
}
