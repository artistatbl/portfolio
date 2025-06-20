'use client'

import { Sidebar } from '../components/sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'

export default function Blog() {
  const isMobile = useMobile()
  const isTablet = useTablet()
  const posts = [
    {
      title: "Building Modern Web Applications",
      date: "2024-01-15",
      excerpt: "A deep dive into modern web development practices and tools."
    },
    {
      title: "The Future of Frontend Development",
      date: "2024-01-10",
      excerpt: "Exploring upcoming trends and technologies in frontend development."
    },
    {
      title: "Design Systems and Component Libraries",
      date: "2024-01-05",
      excerpt: "How to build scalable design systems for your applications."
    }
  ]

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <Sidebar />
      
      <main className={`mx-auto ${
        isMobile ? 'py-8 px-4 pb-20 max-w-2xl' : isTablet ? 'py-20 px-8 max-w-xl mr-32' : 'py-20 px-8 max-w-2xl'
      }`}>
        <div>
          <h1 className={`font-bold text-foreground mb-8 ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>Blog</h1>
          
          <div className={isMobile ? 'space-y-4' : 'space-y-6'}>
            {posts.map((post, index) => (
              <article key={index} className={isMobile ? 'mb-4' : 'mb-6'}>
                <h2 className={`font-semibold text-foreground hover:text-muted-foreground transition-colors cursor-pointer ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}>{post.title}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-muted-foreground ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>{post.date}</span>
                  <span className={`text-muted-foreground ${
                    isMobile ? 'text-xs' : 'text-sm'
                  }`}>— {post.excerpt}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}