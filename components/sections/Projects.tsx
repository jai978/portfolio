import type { Project } from '@/types/content'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      className="py-24 px-10 md:px-16 border-t border-[var(--border)]"
      aria-label="Work"
    >
      <div className="flex items-center gap-4 mb-14">
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--accent)] uppercase">02</span>
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--text-secondary)] uppercase">Work</span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      {/* Grid: first card full-width, rest fill 2-col rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-[var(--border)]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  featured,
}: {
  project: Project
  featured: boolean
}) {
  return (
    <article
      className={`group relative border-r border-b border-[var(--border)] p-8 transition-colors duration-200 hover:bg-[var(--surface)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Top row: status badge + external link */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {project.status === 'live' && (
            <span className="font-display text-[9px] tracking-[0.2em] text-[var(--accent)] border border-[var(--accent-dim)] px-2 py-0.5 uppercase">
              Live
            </span>
          )}
          {project.status === 'wip' && (
            <span className="font-display text-[9px] tracking-[0.2em] text-[var(--text-secondary)] border border-[var(--border)] px-2 py-0.5 uppercase">
              In progress
            </span>
          )}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200"
            aria-label={`Visit ${project.name}`}
          >
            ↗
          </a>
        )}
      </div>

      {/* Name */}
      <h2 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text-primary)] uppercase mb-3 transition-colors duration-200 group-hover:text-[var(--accent)]">
        {project.name}
      </h2>

      {/* Problem — voice-forward */}
      <p className="font-body text-sm text-[var(--accent)] italic mb-5 leading-relaxed">
        {project.problem}
      </p>

      {/* Approach */}
      <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed mb-8">
        {project.approach}
      </p>

      {/* Stack */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-display text-[9px] tracking-[0.2em] text-[var(--text-secondary)] uppercase"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  )
}
