'use client'

import { PageLayout } from '../../../components/page-layout'
import { formatDate, type BlogPostMeta } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect } from 'react'
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
}

export function BlogPostClient({ meta, children }: BlogPostClientProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
      
      // Add copy buttons to code blocks
      const codeBlocks = document.querySelectorAll('pre[class*="language-"]')
      
      codeBlocks.forEach((block) => {
        // Skip if already has a copy button
        if (block.parentElement?.classList.contains('code-block-wrapper')) {
          return
        }
        
        // Create wrapper
        const wrapper = document.createElement('div')
        wrapper.className = 'code-block-wrapper'
        
        // Create copy button
        const copyButton = document.createElement('button')
        copyButton.className = 'copy-button'
        copyButton.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
          Copy
        `
        
        // Add click handler
        copyButton.addEventListener('click', async () => {
          const code = block.querySelector('code')?.textContent || ''
          
          try {
            await navigator.clipboard.writeText(code)
            copyButton.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              Copied!
            `
            copyButton.classList.add('copied')
            
            setTimeout(() => {
              copyButton.innerHTML = `
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                   <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                   <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                 </svg>
                 Copy
               `
              copyButton.classList.remove('copied')
            }, 2000)
          } catch (err) {
            console.error('Failed to copy code:', err)
          }
        })
        
        // Wrap the code block and add copy button
        block.parentNode?.insertBefore(wrapper, block)
        wrapper.appendChild(block)
        wrapper.appendChild(copyButton)
      })
    }
  }, [children])

  return (
    <PageLayout>
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Back to blog link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-2px] mb-4 sm:mb-6 md:mb-8 text-sm sm:text-base"
        >
          <ArrowLeft className="mr-2 transition-transform duration-200 h-4 w-4 sm:h-5 sm:w-5" />
          Back to Blog
        </Link>
        
        {/* Post header */}
        <header className="border-b border-border/50 pb-4 sm:pb-6 md:pb-8 mb-4 sm:mb-6 md:mb-8 lg:mb-12">
          <h1 className="font-bold text-foreground leading-tight text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 md:mb-6">{meta.title}</h1>
          
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2 md:gap-4">
              <time className="text-muted-foreground font-medium text-xs sm:text-sm md:text-base">
                {formatDate(meta.date)}
              </time>
              {meta.author && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground/50 hidden sm:inline">•</span>
                  <span className="text-muted-foreground text-xs sm:text-sm md:text-base">
                    by {meta.author}
                  </span>
                </div>
              )}
              {meta.readingTime && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground/50 hidden sm:inline">•</span>
                  <span className="text-muted-foreground text-xs sm:text-sm md:text-base">
                    {meta.readingTime} min read
                  </span>
                </div>
              )}
            </div>
            
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                {meta.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs sm:text-sm px-1.5 py-0.5 sm:px-2 sm:py-1"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </header>
        
        {/* Post content */}
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-sm sm:prose-base md:prose-lg lg:prose-xl prose-headings:scroll-mt-20 prose-img:rounded-lg prose-img:shadow-lg prose-pre:bg-muted prose-pre:border prose-pre:border-border overflow-hidden break-words">
          {children}
        </article>
        
        {/* Post footer */}
        <footer className="border-t border-border/50 pt-4 sm:pt-6 md:pt-8 mt-6 sm:mt-8 md:mt-12 text-xs sm:text-sm md:text-base">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Back to all posts
            </Link>
            
            <div className="text-muted-foreground text-xs sm:text-sm">
              Published {formatDate(meta.date)}
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  )
}