'use client'

import { PageLayout } from '../../components/page-layout'
import { useMobile } from '@/hooks/use-mobile'
import { formatDate, type BlogPostMeta } from '@/lib/blog'
import Link from 'next/link'

interface BlogClientProps {
  posts: BlogPostMeta[]
}

export function BlogClient({ posts }: BlogClientProps) {
  const isMobile = useMobile()

  return (
    <PageLayout>
      <div>
          <h1 className={`font-bold text-foreground mb-8 ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>Blog</h1>
          <p className={`text-muted-foreground ${
            isMobile ? 'mb-8 text-sm' : 'mb-12'
          }`}>Thoughts on development, design, and technology</p>
          
          <div className={isMobile ? 'space-y-8' : 'space-y-10'}>
            {posts.map((post) => (
              <article key={post.slug} className={`group border border-border/50 rounded-lg p-6 hover:border-border transition-all duration-200 hover:shadow-md bg-card/50 backdrop-blur-sm ${
                isMobile ? 'mb-6' : 'mb-8'
              }`}>
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className={`font-bold text-foreground group-hover:text-primary transition-colors mb-3 ${
                    isMobile ? 'text-lg' : 'text-xl'
                  }`}>{post.title}</h2>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <time className={`text-muted-foreground font-medium ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}>{formatDate(post.date)}</time>
                    {post.author && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span className={`text-muted-foreground ${
                          isMobile ? 'text-xs' : 'text-sm'
                        }`}>
                          {post.author}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className={`text-muted-foreground leading-relaxed mb-4 ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}>{post.excerpt}</p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`bg-muted/80 text-muted-foreground px-3 py-1 rounded-full border border-border/50 group-hover:bg-muted transition-colors ${
                            isMobile ? 'text-xs' : 'text-sm'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center mt-4 text-primary group-hover:text-primary/80 transition-colors">
                    <span className={isMobile ? 'text-sm' : 'text-base'}>Read more</span>
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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
    </PageLayout>
  )
}