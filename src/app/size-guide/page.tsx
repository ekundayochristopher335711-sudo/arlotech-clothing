export default function SizeGuidePage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Size Guide</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Find the right fit for every look.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          Use our size guide to choose premium garments that drape beautifully and feel comfortable every time.
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Women's sizing</h2>
          <p className="text-sm text-muted-light leading-7">
            Tailored fits and relaxed silhouettes for confident styling.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Men's sizing</h2>
          <p className="text-sm text-muted-light leading-7">
            Designed for precise proportions and effortless layering.
          </p>
        </section>
      </div>
    </main>
  );
}
