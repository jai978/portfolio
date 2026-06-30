interface HeroContent {
  positioning: string
  currentlyBuilding: string
}

export default function Hero({ content }: { content: HeroContent }) {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-10 md:px-14 py-24"
      aria-label="Introduction"
    >
      <div className="max-w-lg">
        {/* Name */}
        <h1 className="font-display font-semibold text-[28px] md:text-[34px] tracking-tight text-[var(--text-primary)] mb-3">
          Jai Sohal
        </h1>

        {/* Hairline */}
        <div className="h-px w-full bg-[var(--border)] mb-6" aria-hidden="true" />

        {/* Positioning */}
        <p className="font-body text-[17px] leading-relaxed text-[var(--text-primary)] mb-10">
          {content.positioning}
        </p>

        {/* Currently building — log entry style */}
        <div className="inline-flex items-start gap-3 border border-[var(--border)] bg-[var(--surface)] px-4 py-3 mb-12">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] flex-shrink-0 mt-[5px]"
            aria-hidden="true"
          />
          <div>
            <p className="font-mono text-[10px] text-[var(--text-secondary)] uppercase tracking-widest mb-0.5">
              Currently building
            </p>
            <p className="font-mono text-[11px] text-[var(--text-primary)]">
              {content.currentlyBuilding}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div>
          <a
            href="#work"
            className="font-mono text-[11px] text-[var(--text-secondary)] tracking-wide hover:text-[var(--text-primary)] transition-colors duration-150 border-b border-[var(--border)] pb-px"
          >
            view build log →
          </a>
        </div>
      </div>
    </section>
  )
}
