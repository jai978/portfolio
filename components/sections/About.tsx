interface AboutContent {
  body: string
}

export default function About({ content }: { content: AboutContent }) {
  return (
    <section
      id="about"
      className="min-h-[65vh] flex flex-col justify-center px-10 md:px-14 py-24 border-t border-[var(--border)]"
      aria-label="About"
    >
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--signal)] uppercase">01</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">About</span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      <div className="max-w-lg">
        <p className="font-body text-[16px] leading-[1.85] text-[var(--text-primary)]">
          {content.body}
        </p>
      </div>
    </section>
  )
}
