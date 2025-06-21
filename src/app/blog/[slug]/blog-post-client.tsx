'use client'

import { Sidebar } from '../../../components/sidebar'
import { formatDate, type BlogPostMeta } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { useMobile } from '@/hooks/use-mobile'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-sql'

interface BlogPostClientProps {
  meta: BlogPostMeta
  children: ReactNode
  relatedPosts?: BlogPostMeta[]
}

export function BlogPostClient({ meta, children, relatedPosts = [] }: BlogPostClientProps) {
  const isMobile = useMobile()
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()

      const codeBlocks = document.querySelectorAll('pre[class*="language-"]')

      codeBlocks.forEach((block) => {
        if (block.parentElement?.classList.contains('code-block-wrapper')) {
          return
        }

        const wrapper = document.createElement('div')
        wrapper.className = 'code-block-wrapper'

        const copyButton = document.createElement('button')
        copyButton.className = 'copy-button'
        copyButton.innerHTML = `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          <span class="hidden xs:inline">Copy</span>
        `

        copyButton.addEventListener('click', async () => {
          const code = block.querySelector('code')?.textContent || ''

          try {
            await navigator.clipboard.writeText(code)
            copyButton.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <span class="hidden xs:inline">Copied!</span>
            `
            copyButton.classList.add('copied')

            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                  <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                </svg>
                <span class="hidden xs:inline">Copy</span>
              `
              copyButton.classList.remove('copied')
            }, 2000)
          } catch (err) {
            console.error('Failed to copy code:', err)
          }
        })

        block.parentNode?.insertBefore(wrapper, block)
        wrapper.appendChild(block)
        wrapper.appendChild(copyButton)
      })
    }
  }, [children])

  return (
    <div className="min-h-screen flex">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <Sidebar />
      
      <main className={`flex-1 w-full ${
        isMobile ? 'pb-48' : 'md:mr-32 lg:mr-40'
      }`}>
        <div className={`w-full mx-auto py-8 md:py-20 ${
          isMobile 
            ? 'px-3 max-w-full' 
            : 'max-w-xl px-3 sm:px-4 md:px-6 lg:px-8'
        }`}>
        {/* Back to blog link */}
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-2px] mb-6 text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden xs:inline">Back to Blog</span>
          <span className="xs:hidden">Back</span>
        </Link>

        {/* Post header */}
        <header className="border-b border-border/50 pb-6 mb-8">
          <h1 className="font-bold text-foreground leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
            {meta.title}
          </h1>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <time className="font-medium">{formatDate(meta.date)}</time>
              {meta.author && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <span>by {meta.author}</span>
                </>
              )}
              {meta.readingTime && (
                <>
                  <span className="text-muted-foreground/50">•</span>
                  <span>{meta.readingTime} min read</span>
                </>
              )}
            </div>

            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs px-2 py-0.5"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Post content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg prose-headings:scroll-mt-20 prose-img:rounded-lg prose-img:shadow-lg prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:overflow-x-auto">
          {children}
        </article>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border/50 pt-8 mt-8">
            <h2 className="text-xl font-semibold mb-6 text-foreground">
              Related Posts
            </h2>
            <div className="grid gap-4 sm:gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-4 rounded-lg border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm bg-card/50"
                >
                  <div className="space-y-2">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <time>{formatDate(post.date)}</time>
                      {post.readingTime && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readingTime} min</span>
                          </div>
                        </>
                      )}
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs px-1.5 py-0.5 h-auto"
                          >
                            #{tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Post footer */}
        <footer className="border-t border-border/50 pt-6 mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors text-sm w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden xs:inline">Back to all posts</span>
              <span className="xs:hidden">All posts</span>
            </Link>

            <div className="text-muted-foreground text-xs">
              Published {formatDate(meta.date)}
            </div>
          </div>
        </footer>
        </div>
      </main>
    </div>
  )
}