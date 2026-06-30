import { supabase } from './supabase'
import type { SiteContent } from '@/types/content'

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    positioning: 'Building software for problems worth solving.',
    currentlyBuilding: 'this portfolio',
  },
  about: {
    body: "I'm 17, based in Auckland, and finishing A-Levels in Maths, Economics, Business and Physics. Most of what I actually care about happens outside those classes — building software for real problems, running JPS Solutions (web design for tradespeople), and working out what kind of company I want to build. I'm heading to the University of Auckland in 2027 for a BCom. I'm not waiting until then to start.",
  },
  projects: [
    {
      id: 'jps-solutions',
      name: 'JPS Solutions',
      year: '2023 →',
      problem: 'Tradespeople in NZ lack professional web presence without paying agency prices or dealing with agency timelines.',
      approach: 'A web design business serving local tradespeople — custom sites built fast, with ongoing maintenance. Still running.',
      stack: ['Next.js', 'Supabase', 'Vercel'],
      link: 'https://jpssolutions.co.nz',
      status: 'live',
    },
    {
      id: 'telegram-obsidian',
      name: 'Telegram → Obsidian Pipeline',
      year: '2025',
      problem: 'Capturing ideas on mobile into a structured knowledge base creates too much friction.',
      approach: 'A Telegram bot routes messages through a Cloudflare Worker and appends them directly to an Obsidian vault via the GitHub API. Zero friction, automatic filing.',
      stack: ['Cloudflare Workers', 'Telegram API', 'GitHub API'],
      link: '',
      status: 'shipped',
    },
    {
      id: 'deepwork-os',
      name: 'DeepWork OS',
      year: '2024',
      problem: "Existing productivity tools are either too complex or don't fit how I actually work.",
      approach: 'A personal productivity dashboard built around focused work sessions, task management, and reflection. Designed for single-user clarity, not team-feature bloat.',
      stack: ['Next.js', 'Supabase', 'TypeScript'],
      link: '',
      status: 'shipped',
    },
    {
      id: 'note-taking-app',
      name: 'Note-Taking App',
      year: '2024',
      problem: 'I wanted to understand how full-stack apps actually work — no AI scaffolding, no shortcuts.',
      approach: 'Built from scratch without generative tools: auth, database schema, client state, API design. The point was the process, not the product.',
      stack: ['Next.js', 'Supabase', 'TypeScript'],
      link: '',
      status: 'shipped',
    },
    {
      id: 'subscription-tracker',
      name: 'Subscription Tracker',
      year: '2023',
      problem: 'No clean way to see total recurring spend across services in one place.',
      approach: 'A minimal dashboard tracking active subscriptions, monthly totals, and renewal dates. Built in an afternoon, used daily.',
      stack: ['React', 'Supabase', 'TypeScript'],
      link: '',
      status: 'shipped',
    },
  ],
  contact: {
    email: 'jai@jpssolutions.co.nz',
    links: [],
  },
}

export async function getContent(): Promise<SiteContent> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single()

    if (error || !data) return DEFAULT_CONTENT
    return data.content as SiteContent
  } catch {
    return DEFAULT_CONTENT
  }
}
