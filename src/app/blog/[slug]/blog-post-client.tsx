'use client'

import { Sidebar } from '../../components/sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { formatDate, type BlogPost } from '@/lib/blog'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
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
          {/* Back to blog link */}
          <Link 
            href="/blog" 
            className={`inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
          >
            <ArrowLeft className={`mr-2 ${
              isMobile ? 'h-4 w-4' : 'h-5 w-5'
            }`} />
            Back to Blog
          </Link>
          
          {/* Post header */}
          <header className={isMobile ? 'mb-8' : 'mb-12'}>
            <h1 className={`font-bold text-foreground ${
              isMobile ? 'text-2xl mb-4' : 'text-4xl mb-6'
            }`}>{post.title}</h1>
            
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <time className={`text-muted-foreground ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}>
                  {formatDate(post.date)}
                </time>
                {post.author && (
                  <span className={`text-muted-foreground ${
                    isMobile ? 'text-sm' : 'text-base'
                  }`}>
                    by {post.author}
                  </span>
                )}
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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
            </div>
          </header>
          
          {/* Post content */}
          <article 
            className={`prose prose-neutral dark:prose-invert max-w-none ${
              isMobile ? 'prose-sm' : 'prose-lg'
            }`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </main>
    </div>
  )
}