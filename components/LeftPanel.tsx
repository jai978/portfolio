'use client'

import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { id: 'about', label: 'about', num: '01' },
  { id: 'work', label: 'work', num: '02' },
  { id: 'contact', label: 'contact', num: '03' },
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
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-[240px] flex-col justify-between px-8 py-10 bg-[var(--surface)] border-r border-[var(--border)] z-20">
        <div>
          <a href="#" aria-label="Back to top" className="block mb-1">
            <span className="font-display font-semibold text-[17px] tracking-tight text-[var(--text-primary)]">
              Jai Sohal
            </span>
          </a>
          <p className="font-mono text-[10px] text-[var(--text-secondary)] tracking-wide">
            Builder · Auckland, NZ
          </p>

          <div className="mt-8 mb-8 h-px bg-[var(--border)]" />

          <nav aria-label="Page sections">
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ id, label, num }) => {
                const isActive = activeSection === id
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`flex items-center gap-3 py-1.5 font-mono text-[11px] tracking-wide transition-colors duration-150 ${
                        isActive
                          ? 'text-[var(--text-primary)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1 h-1 rounded-full bg-[var(--signal)] flex-shrink-0" aria-hidden="true" />
                      )}
                      {!isActive && <span className="w-1 h-1 flex-shrink-0" aria-hidden="true" />}
                      <span className="opacity-40 text-[9px]">{num}</span>
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div>
          <div className="h-px bg-[var(--border)] mb-5" />
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)] flex-shrink-0" aria-hidden="true" />
            <p className="font-mono text-[10px] text-[var(--text-secondary)] leading-relaxed">
              currently building
            </p>
          </div>
          <p className="font-mono text-[10px] text-[var(--text-primary)] mt-0.5 pl-3.5">
            this portfolio
          </p>
        </div>
      </aside>

      {/* Mobile — sticky top bar */}
      <header className="md:hidden sticky top-0 z-20 bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="font-display font-semibold text-[15px] text-[var(--text-primary)]">
            Jai Sohal
          </span>
          <nav aria-label="Page sections">
            <ul className="flex items-center gap-5">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`font-mono text-[10px] tracking-wide transition-colors duration-150 ${
                      activeSection === id
                        ? 'text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)]'
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
