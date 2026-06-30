export interface Project {
  id: string
  name: string
  year: string
  problem: string
  approach: string
  stack: string[]
  link: string
  status: 'live' | 'shipped' | 'wip'
}

export interface ContactLink {
  label: string
  url: string
}

export interface SiteContent {
  hero: {
    positioning: string
    currentlyBuilding: string
  }
  about: {
    body: string
  }
  projects: Project[]
  contact: {
    email: string
    links: ContactLink[]
  }
}
