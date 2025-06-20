'use client'

import { Sidebar } from '../../../components/sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { formatDate, type BlogPost } from '@/lib/blog'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
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
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const isMobile = useMobile()
  const isTablet = useTablet()

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
  }, [post.content])

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
            className={`inline-flex items-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-[-2px] mb-8 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}
          >
            <ArrowLeft className={`mr-2 transition-transform duration-200 ${
              isMobile ? 'h-4 w-4' : 'h-5 w-5'
            }`} />
            Back to Blog
          </Link>
          
          {/* Post header */}
          <header className={`border-b border-border/50 pb-8 ${
            isMobile ? 'mb-8' : 'mb-12'
          }`}>
            <h1 className={`font-bold text-foreground leading-tight ${
              isMobile ? 'text-2xl mb-4' : 'text-4xl mb-6'
            }`}>{post.title}</h1>
            
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-4">
                <time className={`text-muted-foreground font-medium ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}>
                  {formatDate(post.date)}
                </time>
                {post.author && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span className={`text-muted-foreground ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      by {post.author}
                    </span>
                  </>
                )}
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`bg-muted/80 text-muted-foreground px-3 py-1 rounded-full border border-border/50 hover:bg-muted transition-colors ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      #{tag}
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
            suppressHydrationWarning={true}
          />
          
          {/* Post footer */}
          <footer className={`border-t border-border/50 pt-8 mt-12 ${
            isMobile ? 'text-sm' : 'text-base'
          }`}>
            <div className="flex items-center justify-between">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className={`mr-2 ${
                  isMobile ? 'h-4 w-4' : 'h-5 w-5'
                }`} />
                Back to all posts
              </Link>
              
              <div className="text-muted-foreground">
                Published {formatDate(post.date)}
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}