'use client'

import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'work', label: 'Work', num: '02' },
  { id: 'contact', label: 'Contact', num: '03' },
]

export default function LeftPanel() {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Desktop — fixed left panel */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[280px] flex-col justify-between p-10 border-r border-[var(--border)] z-20 bg-[var(--bg)]">
        <div>
          <a
            href="#"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            aria-label="Back to top"
          >
            <p className="font-display text-[56px] leading-[0.88] tracking-tight text-[var(--text-primary)] uppercase select-none">
              Jai
              <br />
              Sohal
            </p>
          </a>

          <div className="mt-10 mb-10 h-px bg-[var(--border)]" />

          <nav aria-label="Page sections">
            <ul className="space-y-px">
              {NAV_ITEMS.map(({ id, label, num }) => {
                const isActive = activeSection === id
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`flex items-center gap-4 py-2.5 font-display text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span
                        className={`text-[9px] tabular-nums transition-colors duration-200 ${
                          isActive ? 'text-[var(--accent)]' : 'text-[var(--border)]'
                        }`}
                      >
                        {num}
                      </span>
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div className="space-y-1">
          <p className="font-display text-[9px] tracking-[0.25em] text-[var(--text-secondary)] uppercase">
            Auckland, NZ
          </p>
          <p className="font-display text-[9px] tracking-[0.25em] text-[var(--border)] uppercase">
            2026
          </p>
        </div>
      </aside>

      {/* Mobile — sticky top bar */}
      <header className="md:hidden sticky top-0 z-20 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-xl tracking-tight text-[var(--text-primary)] uppercase">
            Jai Sohal
          </a>
          <nav aria-label="Page sections">
            <ul className="flex items-center gap-5">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`font-display text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                      activeSection === id
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}
