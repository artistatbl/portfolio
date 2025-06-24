'use client'

import { Sidebar } from '../../../components/sidebar'
import { formatDate, type BlogPostMeta } from '@/lib/blog'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
import { useMobile } from '@/hooks/use-mobile'
import { RelatedPosts } from '@/components/related-posts'
import Prism from 'prismjs'
import { Badge } from '@/components/ui/badge'
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <span class="hidden xs:inline">Copied!</span>
            `
            copyButton.classList.add('copied')

            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
        </div>

      {/* Related Posts Section - Full width */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <RelatedPosts posts={relatedPosts} />
      </div>

      {/* Post footer - Back to constrained width */}
      <div className={`w-full mx-auto py-8 ${
        isMobile 
          ? 'px-3 max-w-full' 
          : 'max-w-xl px-3 sm:px-4 md:px-6 lg:px-8'
      }`}>
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