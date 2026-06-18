"use client";

import HeroSection from "@/components/home/HeroSection";
import BrandEthos from "@/components/home/BrandEthos";
import EditorialCollections from "@/components/home/EditorialCollections";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CampaignBanner from "@/components/home/CampaignBanner";
import Testimonials from "@/components/home/Testimonials";
import InstagramFeed from "@/components/home/InstagramFeed";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandEthos />
      <EditorialCollections />
      <FeaturedProducts
        title="New Drops"
        subtitle="Just Landed"
        filter="new"
        limit={4}
        viewAllHref="/shop"
      />
      <CampaignBanner />
      <FeaturedProducts
        title="The Edit"
        subtitle="Curated for You"
        filter="featured"
        limit={4}
        viewAllHref="/shop"
      />
      <Testimonials />
      <InstagramFeed />
    </>
  );
}
