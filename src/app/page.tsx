'use client'

import { Sidebar } from '../components/sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'

export default function Home() {
  const isMobile = useMobile()
  const isTablet = useTablet()
  const proudOf = [
    "being a husband & father",
    "graduated with honors in computer engineering",
    "built vercel devrel during 1 → $200M ARR",
    "helped grow next.js community to 1.3+ million active devs",
    "seed investor in startups like fun, supabase, and linear",
    "can play guitar, piano, and drums (not at the same time)",
    "won a guitar hero lives the video game competition when I was 16",
    "won a state championship in track (high school glory days)",
    "currently have a 95 week inbox zero streak"
  ]

  const believe = [
    "shipped fast beats the best strategy",
    "speed is a superpower",
    "create a bias toward shipping",
    "small teams ship faster",
    "ai-native teams will move 10x faster than those not willing to change",
    "landing > 3 launches (i.e. product adoption > shipping code)",
    "listen, build, ship, tell the customer, then repeat forever",
    "you have no career ceiling",
    "grit > talent",
    "there's no substitute for putting in the hours",
    "get 1% better every day",
    "be ruthlessly truth seeking",
    "the truth can be painful",
    "you can just change your mind if wrong",
    "have strong opinions, loosely held",
    "maximize your exposure hours",
    "\"anarchist\" > data"
  ]

  return (
    <div className="min-h-screen flex justify-center items-start">
      <Sidebar />
      
      <main className={`py-8 px-4 mx-auto ${
        isMobile ? 'pb-20 max-w-2xl' : isTablet ? 'py-20 px-8 max-w-xl mr-32' : 'py-20 px-8 max-w-2xl'
      }`}>
        <div>
          <h1 className={`font-bold text-foreground mb-4 ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>leerob</h1>
          <p className={`text-muted-foreground ${
            isMobile ? 'mb-8 text-sm' : 'mb-16'
          }`}>I teach developers how to build the future</p>
          
          <section className={isMobile ? 'mb-8' : 'mb-16'}>
            <h2 className={`font-semibold text-foreground mb-6 ${
              isMobile ? 'text-lg' : 'text-2xl'
            }`}>things i'm proud of</h2>
            <ul className="space-y-2">
              {proudOf.map((item, index) => (
                <li key={index} className={`text-muted-foreground leading-relaxed ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  • {item}
                </li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className={`font-semibold text-foreground mb-6 ${
              isMobile ? 'text-lg' : 'text-2xl'
            }`}>things i believe</h2>
            <ul className="space-y-2">
              {believe.map((item, index) => (
                <li key={index} className={`text-muted-foreground leading-relaxed ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>
                  • {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}
