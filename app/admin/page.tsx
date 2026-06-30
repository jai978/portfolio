'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent, Project } from '@/types/content'

type Message = { type: 'success' | 'error'; text: string }

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<Message | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => setContent(data))
      .catch(() => setMessage({ type: 'error', text: 'Failed to load content.' }))
  }, [])

  const handleSave = useCallback(async () => {
    if (!content) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (!res.ok) throw new Error()
      setMessage({ type: 'success', text: 'Saved. Changes are live.' })
    } catch {
      setMessage({ type: 'error', text: 'Save failed. Try again.' })
    } finally {
      setSaving(false)
    }
  }, [content])

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  function updateProject(index: number, field: keyof Project, value: string | string[]) {
    if (!content) return
    const projects = [...content.projects]
    projects[index] = { ...projects[index], [field]: value }
    setContent({ ...content, projects })
  }

  function addProject() {
    if (!content) return
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: '',
      problem: '',
      approach: '',
      stack: [],
      link: '',
      status: 'shipped',
    }
    setContent({ ...content, projects: [...content.projects, newProject] })
  }

  function removeProject(index: number) {
    if (!content) return
    const projects = content.projects.filter((_, i) => i !== index)
    setContent({ ...content, projects })
  }

  function addContactLink() {
    if (!content) return
    setContent({
      ...content,
      contact: {
        ...content.contact,
        links: [...content.contact.links, { label: '', url: '' }],
      },
    })
  }

  function updateContactLink(index: number, field: 'label' | 'url', value: string) {
    if (!content) return
    const links = [...content.contact.links]
    links[index] = { ...links[index], [field]: value }
    setContent({ ...content, contact: { ...content.contact, links } })
  }

  function removeContactLink(index: number) {
    if (!content) return
    const links = content.contact.links.filter((_, i) => i !== index)
    setContent({ ...content, contact: { ...content.contact, links } })
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <p className="font-display text-xs tracking-[0.2em] text-[var(--text-secondary)] uppercase">
          Loading…
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-[var(--surface)] border-b border-[var(--border)] flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-6">
          <h1 className="font-display text-xs tracking-[0.3em] text-[var(--text-secondary)] uppercase">
            Admin
          </h1>
          {message && (
            <p
              className={`font-body text-sm ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="font-display text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase hover:text-[var(--text-primary)] transition-colors"
          >
            View site ↗
          </a>
          <button
            onClick={handleLogout}
            className="font-display text-[10px] tracking-[0.2em] text-[var(--text-secondary)] uppercase hover:text-[var(--text-primary)] transition-colors"
          >
            Logout
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-display text-[10px] tracking-[0.25em] uppercase bg-[var(--accent)] text-white px-5 py-2.5 transition-colors hover:bg-[var(--accent-dim)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-12 space-y-16">
        {/* Hero */}
        <section>
          <SectionLabel>Hero</SectionLabel>
          <div className="space-y-4">
            <Field label="Positioning line">
              <input
                type="text"
                value={content.hero.positioning}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, positioning: e.target.value } })
                }
              />
            </Field>
            <Field label="Sub-line">
              <input
                type="text"
                value={content.hero.sub}
                onChange={(e) =>
                  setContent({ ...content, hero: { ...content.hero, sub: e.target.value } })
                }
              />
            </Field>
          </div>
        </section>

        {/* About */}
        <section>
          <SectionLabel>About</SectionLabel>
          <Field label="Body">
            <textarea
              rows={6}
              value={content.about.body}
              onChange={(e) =>
                setContent({ ...content, about: { body: e.target.value } })
              }
            />
          </Field>
        </section>

        {/* Projects */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <SectionLabel>Work</SectionLabel>
            <button
              onClick={addProject}
              className="font-display text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
            >
              + Add project
            </button>
          </div>

          <div className="space-y-8">
            {content.projects.map((project, i) => (
              <div key={project.id} className="border border-[var(--border)] p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-display text-[9px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
                    Project {i + 1}
                  </p>
                  <button
                    onClick={() => removeProject(i)}
                    className="font-display text-[9px] tracking-[0.2em] text-red-400 uppercase hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </div>
                <Field label="Name">
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(i, 'name', e.target.value)}
                  />
                </Field>
                <Field label="Problem (one line, italic on site)">
                  <input
                    type="text"
                    value={project.problem}
                    onChange={(e) => updateProject(i, 'problem', e.target.value)}
                  />
                </Field>
                <Field label="Approach">
                  <textarea
                    rows={3}
                    value={project.approach}
                    onChange={(e) => updateProject(i, 'approach', e.target.value)}
                  />
                </Field>
                <Field label="Stack (comma-separated)">
                  <input
                    type="text"
                    value={project.stack.join(', ')}
                    onChange={(e) =>
                      updateProject(
                        i,
                        'stack',
                        e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                      )
                    }
                  />
                </Field>
                <Field label="Link (leave blank if none)">
                  <input
                    type="url"
                    value={project.link}
                    onChange={(e) => updateProject(i, 'link', e.target.value)}
                  />
                </Field>
                <Field label="Status">
                  <select
                    value={project.status}
                    onChange={(e) =>
                      updateProject(i, 'status', e.target.value as Project['status'])
                    }
                    className="w-full bg-[var(--surface)] border border-[var(--border)] px-3 py-2.5 text-[var(--text-primary)] font-body text-sm focus:outline-none focus:border-[var(--accent)]"
                  >
                    <option value="shipped">Shipped</option>
                    <option value="live">Live</option>
                    <option value="wip">In progress</option>
                  </select>
                </Field>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <SectionLabel>Contact</SectionLabel>
          <div className="space-y-4">
            <Field label="Email">
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, email: e.target.value },
                  })
                }
              />
            </Field>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-display text-[9px] tracking-[0.2em] text-[var(--text-secondary)] uppercase">
                  Links
                </label>
                <button
                  onClick={addContactLink}
                  className="font-display text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
                >
                  + Add link
                </button>
              </div>
              <div className="space-y-3">
                {content.contact.links.map((link, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <input
                      type="text"
                      placeholder="Label (e.g. GitHub)"
                      value={link.label}
                      onChange={(e) => updateContactLink(i, 'label', e.target.value)}
                      className="flex-1 bg-[var(--surface)] border border-[var(--border)] px-3 py-2.5 text-[var(--text-primary)] font-body text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                    <input
                      type="url"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateContactLink(i, 'url', e.target.value)}
                      className="flex-[2] bg-[var(--surface)] border border-[var(--border)] px-3 py-2.5 text-[var(--text-primary)] font-body text-sm focus:outline-none focus:border-[var(--accent)]"
                    />
                    <button
                      onClick={() => removeContactLink(i)}
                      className="font-display text-[9px] tracking-[0.2em] text-red-400 uppercase hover:text-red-300 transition-colors py-2.5"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[9px] tracking-[0.3em] text-[var(--text-secondary)] uppercase mb-6">
      {children}
    </h2>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-display text-[9px] tracking-[0.2em] text-[var(--text-secondary)] uppercase mb-2">
        {label}
      </label>
      <div className="[&_input]:w-full [&_input]:bg-[var(--surface)] [&_input]:border [&_input]:border-[var(--border)] [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-[var(--text-primary)] [&_input]:font-body [&_input]:text-sm [&_input]:focus:outline-none [&_input]:focus:border-[var(--accent)] [&_textarea]:w-full [&_textarea]:bg-[var(--surface)] [&_textarea]:border [&_textarea]:border-[var(--border)] [&_textarea]:px-3 [&_textarea]:py-2.5 [&_textarea]:text-[var(--text-primary)] [&_textarea]:font-body [&_textarea]:text-sm [&_textarea]:focus:outline-none [&_textarea]:focus:border-[var(--accent)] [&_textarea]:resize-y">
        {children}
      </div>
    </div>
  )
}
