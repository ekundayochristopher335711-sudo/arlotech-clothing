import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Our Story</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Born in Lagos. Designed for the world.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          Arlotech Clothing is a premium fashion house rooted in craftsmanship, cultural pride, and modern elegance.
          We blend traditional tailoring with contemporary silhouettes to create collections that feel both refined and distinctive.
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Made With Purpose</h2>
          <p className="text-sm text-muted-light leading-7">
            Every piece is curated with thoughtful materials, precision detailing, and elevated finishes that last.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Global Spirit</h2>
          <p className="text-sm text-muted-light leading-7">
            We celebrate bold expression and confidence for a new generation of style leaders.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Locally Inspired</h2>
          <p className="text-sm text-muted-light leading-7">
            Our collections draw from African heritage and contemporary design to create unique, aspirational wardrobe staples.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/shop" className="btn-accent inline-flex items-center justify-center px-8 py-4">
          Shop the Collection
        </Link>
      </div>
    </main>
  );
}
