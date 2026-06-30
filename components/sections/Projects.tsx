'use client'

import { useEffect, useRef } from 'react'
import type { Project } from '@/types/content'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      className="py-24 px-10 md:px-14 border-t border-[var(--border)]"
      aria-label="Work"
    >
      <div className="flex items-center gap-3 mb-14">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--signal)] uppercase">02</span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
          Work / Build Log
        </span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      {/* Timeline rail */}
      <div className="relative border-l border-[var(--border)] ml-[5px]">
        {projects.map((project, i) => (
          <TimelineEntry
            key={project.id}
            project={project}
            isLast={i === projects.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

function TimelineEntry({
  project,
  isLast,
}: {
  project: Project
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isLive = project.status === 'live'
  const isWip = project.status === 'wip'

  const statusLabel = isLive ? 'LIVE' : isWip ? 'IN PROGRESS' : 'SHIPPED'

  return (
    <div
      ref={ref}
      className={`timeline-entry relative pl-8 ${isLast ? 'pb-0' : 'pb-14'}`}
    >
      {/* Node on the rail */}
      <div
        className={`absolute left-0 top-[6px] w-[9px] h-[9px] rounded-full -translate-x-[5px] ring-2 ring-[var(--bg)] ${
          isLive
            ? 'bg-[var(--signal)]'
            : 'bg-[var(--text-primary)]'
        }`}
        aria-hidden="true"
      />

      {/* Year */}
      <p className="font-mono text-[10px] text-[var(--text-secondary)] tracking-widest uppercase mb-4">
        {project.year}
      </p>

      {/* Status + Name row */}
      <div className="flex flex-wrap items-baseline gap-3 mb-3">
        <span
          className={`font-mono text-[9px] tracking-[0.15em] uppercase px-1.5 py-0.5 ${
            isLive
              ? 'text-[var(--signal)] bg-[var(--signal-bg)] border border-[rgba(255,183,3,0.25)]'
              : 'text-[var(--text-secondary)] bg-[rgba(92,107,115,0.07)] border border-[var(--border)]'
          }`}
        >
          {statusLabel}
        </span>
        <h2 className="font-display font-semibold text-[18px] tracking-tight text-[var(--text-primary)]">
          {project.name}
        </h2>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            aria-label={`Visit ${project.name}`}
          >
            ↗
          </a>
        )}
      </div>

      {/* Problem */}
      <p className="font-body text-[13px] italic text-[var(--text-secondary)] leading-relaxed mb-3 max-w-lg">
        {project.problem}
      </p>

      {/* Approach */}
      <p className="font-body text-[14px] text-[var(--text-primary)] leading-relaxed mb-5 max-w-lg">
        {project.approach}
      </p>

      {/* Stack — mono data tags */}
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] text-[var(--text-secondary)] tracking-wide"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Separator */}
      {!isLast && (
        <div className="mt-12 border-t border-dashed border-[var(--border)]" aria-hidden="true" />
      )}
    </div>
  )
}
