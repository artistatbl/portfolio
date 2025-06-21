'use client'

import { PageLayout } from '../components/page-layout'
import { proudOf, believe } from '@/lib/personal-data'

export default function Home() {
  return (
    <PageLayout>
      <div>
          <h1 className="font-extrabold mb-6 tracking-tight text-3xl md:text-5xl lg:text-6xl">Jean Daly</h1>
          <p className="text-muted-foreground mb-8 text-sm md:mb-16 md:text-base">I teach developers how to build the future</p>
          
          <section className="mb-8 md:mb-16">
            <h2 className="font-semibold text-foreground mb-6 text-lg md:text-2xl">things i'm proud of</h2>
            <ul className="space-y-2">
              {proudOf.map((item, index) => (
                <li key={index} className="text-muted-foreground leading-relaxed text-xs lg:text-sm md:text-sm lg:md:text-base">
                  • {item}
                </li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className="font-semibold text-foreground mb-6 text-lg md:text-2xl">things i believe</h2>
            <ul className="space-y-2">
              {believe.map((item, index) => (
                <li key={index} className="text-muted-foreground leading-relaxed text-xs lg:text-sm md:text-sm lg:md:text-base">
                  • {item}
                </li>
              ))}
            </ul>
          </section>
      </div>
    </PageLayout>
  )
}
