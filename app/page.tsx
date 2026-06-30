import { getContent } from '@/lib/content'
import LeftPanel from '@/components/LeftPanel'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'

export const revalidate = 60

export default async function Home() {
  const content = await getContent()

  return (
    <>
      <LeftPanel />
      <div className="md:ml-[280px]">
        <main>
          <Hero content={content.hero} />
          <About content={content.about} />
          <Projects projects={content.projects} />
          <Contact content={content.contact} />
        </main>
      </div>
    </>
  )
}
