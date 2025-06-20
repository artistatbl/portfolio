'use client'

import { Sidebar } from '../components/sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { formatDate, type BlogPostMeta } from '@/lib/blog'
import Link from 'next/link'

interface BlogClientProps {
  posts: BlogPostMeta[]
}

export function BlogClient({ posts }: BlogClientProps) {
  const isMobile = useMobile()
  const isTablet = useTablet()

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
          <p className={`text-muted-foreground ${
            isMobile ? 'mb-8 text-sm' : 'mb-12'
          }`}>Thoughts on development, design, and technology</p>
          
          <div className={isMobile ? 'space-y-6' : 'space-y-8'}>
            {posts.map((post) => (
              <article key={post.slug} className={isMobile ? 'mb-6' : 'mb-8'}>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <h2 className={`font-semibold text-foreground group-hover:text-muted-foreground transition-colors ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>{post.title}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <time className={`text-muted-foreground ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>{formatDate(post.date)}</time>
                  </div>
                  <p className={`text-muted-foreground mt-2 ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}>{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`bg-muted text-muted-foreground px-2 py-1 rounded-md ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-muted-foreground ${
                isMobile ? 'text-sm' : 'text-base'
              }`}>No blog posts found. Check back soon!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}