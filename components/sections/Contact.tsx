import type { ContactLink } from '@/types/content'

interface ContactContent {
  email: string
  links: ContactLink[]
}

export default function Contact({ content }: { content: ContactContent }) {
  return (
    <section
      id="contact"
      className="min-h-[55vh] flex flex-col justify-center px-10 md:px-14 py-24 border-t border-[var(--border)]"
      aria-label="Contact"
    >
      <div className="flex items-center gap-3 mb-12">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--signal)] uppercase">03</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">Contact</span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      <div className="max-w-sm space-y-6">
        <p className="font-body text-[15px] text-[var(--text-secondary)] leading-relaxed">
          If you want to work together or just talk through an idea —
        </p>

        <a
          href={`mailto:${content.email}`}
          className="block font-mono text-[13px] text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors duration-150"
        >
          {content.email}
        </a>

        {content.links.length > 0 && (
          <ul className="pt-2 space-y-3 border-t border-[var(--border)]">
            {content.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wide text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 uppercase"
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
