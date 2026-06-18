import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Careers</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Build with us.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          We are seeking creative thinkers, collaborators, and innovators who want to help shape the future of premium fashion.
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Culture</h2>
          <p className="text-sm text-muted-light leading-7">
            Inclusive, ambitious, and deeply rooted in craftsmanship and thoughtful design.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Opportunities</h2>
          <p className="text-sm text-muted-light leading-7">
            Roles are available across design, production, marketing, and customer experience.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Connect</h2>
          <p className="text-sm text-muted-light leading-7">
            Send your resume and portfolio to careers@arlotechclothing.com.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/contact" className="btn-accent inline-flex items-center justify-center px-8 py-4">
          Contact the Team
        </Link>
      </div>
    </main>
  );
}
