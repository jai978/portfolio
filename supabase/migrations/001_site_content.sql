-- Run this in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS public.site_content (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.site_content (id, content)
VALUES (1, '{
  "hero": {
    "positioning": "Building things that work.",
    "sub": "17, Auckland. I write software for problems worth solving — and run a business in the gaps between A-Levels."
  },
  "about": {
    "body": "I''m 17, based in Auckland, and finishing A-Levels in Maths, Economics, Business and Physics. Most of what I actually care about happens outside those classes — building software for real problems, running JPS Solutions (web design for tradespeople), and working out what kind of company I want to build. I''m heading to the University of Auckland in 2027 for a BCom. I''m not waiting until then to start."
  },
  "projects": [
    {
      "id": "deepwork-os",
      "name": "DeepWork OS",
      "problem": "Existing productivity tools are either too complex or don''t fit how I actually work.",
      "approach": "A personal productivity dashboard built around focused work sessions, task management, and reflection. Designed for single-user clarity, not team-feature bloat.",
      "stack": ["Next.js", "Supabase", "TypeScript"],
      "link": "",
      "status": "shipped"
    },
    {
      "id": "note-taking-app",
      "name": "Note-Taking App",
      "problem": "I wanted to understand how full-stack apps actually work — no AI scaffolding, no shortcuts.",
      "approach": "Built from scratch without generative tools: auth, database schema, client state, API design. The point was the process, not the product.",
      "stack": ["Next.js", "Supabase", "TypeScript"],
      "link": "",
      "status": "shipped"
    },
    {
      "id": "subscription-tracker",
      "name": "Subscription Tracker",
      "problem": "No clean way to see total recurring spend across services in one place.",
      "approach": "A minimal dashboard tracking active subscriptions, monthly totals, and renewal dates. Built in an afternoon, used daily.",
      "stack": ["React", "Supabase", "TypeScript"],
      "link": "",
      "status": "shipped"
    },
    {
      "id": "telegram-obsidian",
      "name": "Telegram → Obsidian Pipeline",
      "problem": "Capturing ideas on mobile into a structured knowledge base creates too much friction.",
      "approach": "A Telegram bot routes messages through a Cloudflare Worker and appends them directly to an Obsidian vault via the GitHub API. Zero friction, automatic filing.",
      "stack": ["Cloudflare Workers", "Telegram API", "GitHub API"],
      "link": "",
      "status": "shipped"
    },
    {
      "id": "jps-solutions",
      "name": "JPS Solutions",
      "problem": "Tradespeople in NZ lack professional web presence without paying agency prices or dealing with agency timelines.",
      "approach": "A web design business serving local tradespeople — custom sites built fast, with ongoing maintenance. Still running.",
      "stack": ["Next.js", "Supabase", "Vercel"],
      "link": "https://jpssolutions.co.nz",
      "status": "live"
    }
  ],
  "contact": {
    "email": "jai@jpssolutions.co.nz",
    "links": []
  }
}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "public_read" ON public.site_content
  FOR SELECT TO anon, authenticated USING (true);

-- Only service role can write (enforced by API route, not RLS)
-- The API route uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS
