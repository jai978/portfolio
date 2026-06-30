import type { Project } from '@/types/content'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="work"
      className="py-24 px-10 md:px-16 border-t border-[var(--border)]"
      aria-label="Work"
    >
      <div className="flex items-center gap-4 mb-14">
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--warm)] uppercase">02</span>
        <span className="font-display text-[9px] tracking-[0.25em] text-[var(--text-secondary)] uppercase">Work</span>
        <div className="h-px flex-1 bg-[var(--border)]" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-[var(--border)]">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} featured={index === 0} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  return (
    <article
      className={`group relative border-r border-b border-[var(--border)] p-8 transition-all duration-200 hover:bg-[var(--surface)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Accent line — appears on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--accent-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Top row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {project.status === 'live' && (
            <span className="font-display text-[9px] tracking-[0.2em] text-[var(--warm)] border border-[var(--warm-dim)] px-2 py-0.5 uppercase">
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
            className="font-display text-sm text-[var(--text-secondary)] hover:text-[var(--warm)] transition-colors duration-200"
            aria-label={`Visit ${project.name}`}
          >
            ↗
          </a>
        )}
      </div>

      {/* Name */}
      <h2 className="font-display text-2xl md:text-3xl tracking-tight text-[var(--text-primary)] uppercase mb-3 transition-colors duration-200 group-hover:text-[var(--accent-light)]">
        {project.name}
      </h2>

      {/* Problem — warm accent */}
      <p className="font-body text-sm text-[var(--warm)] italic mb-5 leading-relaxed">
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
