interface AboutContent {
  body: string
}

export default function About({ content }: { content: AboutContent }) {
  return (
    <section
      id="about"
      className="min-h-[70vh] flex flex-col justify-center px-10 md:px-16 py-24 border-t border-[var(--border)]"
      aria-label="About"
    >
      <div className="flex items-center gap-4 mb-14">
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--warm)] uppercase">01</span>
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--text-secondary)] uppercase">About</span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      <div className="max-w-xl">
        <p className="font-body text-xl leading-[1.8] text-[var(--text-primary)]">
          {content.body}
        </p>
      </div>
    </section>
  )
}
