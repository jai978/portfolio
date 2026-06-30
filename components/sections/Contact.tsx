import type { ContactLink } from '@/types/content'

interface ContactContent {
  email: string
  links: ContactLink[]
}

export default function Contact({ content }: { content: ContactContent }) {
  return (
    <section
      id="contact"
      className="min-h-[60vh] flex flex-col justify-center px-10 md:px-16 py-24 border-t border-[var(--border)]"
      aria-label="Contact"
    >
      <div className="flex items-center gap-4 mb-14">
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--warm)] uppercase">03</span>
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--text-secondary)] uppercase">Contact</span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      <div className="max-w-sm">
        <p className="font-body text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
          If you want to work together or just talk through an idea —
        </p>

        <a
          href={`mailto:${content.email}`}
          className="block font-display text-xl tracking-tight text-[var(--text-primary)] uppercase mb-10 transition-colors duration-200 hover:text-[var(--warm)]"
        >
          {content.email}
        </a>

        {content.links.length > 0 && (
          <ul className="space-y-4">
            {content.links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-display text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                  <span aria-hidden="true" className="text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
