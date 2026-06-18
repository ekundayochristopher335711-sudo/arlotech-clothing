import Link from "next/link";

export default function SustainabilityPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Sustainability</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Elevated style with a thoughtful footprint.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          Our commitment is to responsible sourcing, reduced waste, and refined craftsmanship that feels intentional from start to finish.
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Ethical sourcing</h2>
          <p className="text-sm text-muted-light leading-7">
            We choose premium materials and partners who share our values for quality and transparency.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Designed to last</h2>
          <p className="text-sm text-muted-light leading-7">
            Classic silhouettes, precise tailoring, and elevated construction ensure your wardrobe stays curated season after season.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Mindful packaging</h2>
          <p className="text-sm text-muted-light leading-7">
            We minimize unnecessary packaging and choose reusable, recyclable, and premium presentation materials.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/shop" className="btn-accent inline-flex items-center justify-center px-8 py-4">
          Explore Sustainable Pieces
        </Link>
      </div>
    </main>
  );
}
