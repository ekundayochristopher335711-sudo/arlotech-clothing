export default function ShippingPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Shipping & Returns</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Global shipping made seamless.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          All orders are shipped from Lagos with fully tracked delivery. We offer free returns within 30 days on qualifying orders.
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Delivery</h2>
          <p className="text-sm text-muted-light leading-7">
            Standard shipping arrives in 7-12 business days, with express options for select regions.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Returns</h2>
          <p className="text-sm text-muted-light leading-7">
            Enjoy free returns within 30 days on eligible purchases. Our team handles exchanges and refunds quickly.
          </p>
        </section>
      </div>
    </main>
  );
}
