import Link from "next/link";

export default function PressPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Press</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Media resources and brand inquiries.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          For press inquiries, collaborations, and editorial requests, reach out to our communications team.
        </p>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Press Kit</h2>
          <p className="text-sm text-muted-light leading-7">
            Download our latest brand images, logos, and product photography.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Story</h2>
          <p className="text-sm text-muted-light leading-7">
            Learn more about the vision, craft, and inspirations behind Arlotech Clothing.
          </p>
        </section>
        <section className="glass-card rounded-3xl p-8">
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <p className="text-sm text-muted-light leading-7">
            Email press@arlotechclothing.com for media access, interview requests, and coverage opportunities.
          </p>
        </section>
      </div>

      <div className="mt-16 text-center">
        <Link href="/about" className="btn-accent inline-flex items-center justify-center px-8 py-4">
          Learn More About Us
        </Link>
      </div>
    </main>
  );
}
