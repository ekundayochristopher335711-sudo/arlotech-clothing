export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Get in touch with the Arlotech team.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          We’re here to help with orders, styling advice, and general inquiries. Reach out below and we’ll respond within one business day.
        </p>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <section className="glass-card rounded-3xl p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Customer Support</h2>
            <p className="text-sm text-muted-light leading-7">
              Email: support@arlotechclothing.com
            </p>
            <p className="text-sm text-muted-light leading-7">
              Phone: +234 800 123 4567
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Showroom</h2>
            <p className="text-sm text-muted-light leading-7">
              Lagos, Nigeria
            </p>
            <p className="text-sm text-muted-light leading-7">
              Shipping worldwide from our Lagos headquarters.
            </p>
          </div>
        </section>

        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Stay in touch</h2>
          <p className="text-sm text-muted-light leading-7">
            Follow us for launch updates, styling guides, and exclusive releases.
          </p>
          <div className="mt-6 space-y-4 text-sm text-muted-light">
            <p>Instagram: @arlotechclothing</p>
            <p>Twitter: @arlotechstyle</p>
            <p>TikTok: @arlotechclothing</p>
          </div>
        </section>
      </div>
    </main>
  );
}
