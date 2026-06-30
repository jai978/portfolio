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
      {/* Desktop — fixed left panel, solid accent blue */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-screen w-[280px] flex-col justify-between p-10 z-20"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div>
          <a
            href="#"
            className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Back to top"
          >
            <p className="font-display text-[56px] leading-[0.88] tracking-tight text-white uppercase select-none">
              Jai
              <br />
              Sohal
            </p>
          </a>

          <div className="mt-10 mb-10 h-px bg-white/20" />

          <nav aria-label="Page sections">
            <ul className="space-y-px">
              {NAV_ITEMS.map(({ id, label, num }) => {
                const isActive = activeSection === id
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`flex items-center gap-4 py-2.5 font-display text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      <span
                        className={`text-[9px] tabular-nums transition-colors duration-200 ${
                          isActive ? 'text-white/70' : 'text-white/25'
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
          <p className="font-display text-[9px] tracking-[0.25em] text-white/40 uppercase">
            Auckland, NZ
          </p>
          <p className="font-display text-[9px] tracking-[0.25em] text-white/20 uppercase">
            2026
          </p>
        </div>
      </aside>

      {/* Mobile — sticky top bar, same accent blue */}
      <header
        className="md:hidden sticky top-0 z-20"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <a href="#" className="font-display text-xl tracking-tight text-white uppercase">
            Jai Sohal
          </a>
          <nav aria-label="Page sections">
            <ul className="flex items-center gap-5">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`font-display text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                      activeSection === id ? 'text-white' : 'text-white/50 hover:text-white/80'
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
