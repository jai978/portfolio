interface HeroContent {
  positioning: string
  sub: string
}

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-10 md:px-16 py-24"
      aria-label="Introduction"
    >
      <div className="max-w-2xl">
        <p className="font-display text-[10px] tracking-[0.35em] text-[var(--warm)] uppercase mb-10">
          Portfolio — 2026
        </p>

        <h1 className="font-body text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.08] text-[var(--text-primary)] mb-8">
          {content.positioning}
        </h1>

        <p className="font-body text-xl leading-relaxed text-[var(--text-secondary)] mb-14 max-w-md">
          {content.sub}
        </p>

        <a
          href="#about"
          className="inline-flex items-center gap-3 font-display text-[11px] tracking-[0.2em] uppercase text-[var(--text-primary)] border-b border-[var(--border)] pb-1 transition-colors duration-200 hover:text-[var(--warm)] hover:border-[var(--warm)]"
        >
          See the work
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}
