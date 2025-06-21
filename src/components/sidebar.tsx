'use client'

import Link from 'next/link'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { Twitter, Github, User, BookOpen, FolderOpen, Bookmark } from 'lucide-react'



export function Sidebar() {
  const isMobile = useMobile()
  const isTablet = useTablet()

  // Don't render anything during SSR to prevent hydration mismatch
  if (isMobile === null || isTablet === null) {
    return null
  }

  if (isMobile) {
    return (
      <aside className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
        <nav className="bg-background/70 backdrop-blur-md border border-border rounded-2xl shadow-lg hover:bg-background/95 transition-all duration-200">
          <ul className="flex justify-around items-center py-2">
            <li>
              <Link 
                href="/" 
                className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 min-w-[48px] min-h-[48px] justify-center"
                aria-label="About"
              >
                <User size={20} />
                <span className="text-xs font-medium">About</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 min-w-[48px] min-h-[48px] justify-center"
                aria-label="Blog"
              >
                <BookOpen size={20} />
                <span className="text-xs font-medium">Blog</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 min-w-[48px] min-h-[48px] justify-center"
                aria-label="Projects"
              >
                <FolderOpen size={20} />
                <span className="text-xs font-medium">Projects</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/bookmarks" 
                className="flex flex-col items-center gap-1 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 min-w-[48px] min-h-[48px] justify-center"
                aria-label="Bookmarks"
              >
                <Bookmark size={20} />
                <span className="text-xs font-medium">Bookmarks</span>
              </Link>
            </li>
          </ul>
          <div className="border-t border-border">
            <ul className="flex justify-center items-center py-1 gap-4">
              <li>
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </li>

            </ul>
          </div>
        </nav>
      </aside>
    )
  }

  return (
    <aside className={`fixed top-20 w-auto ${
      isTablet ? 'right-4' : 'right-1/4'
    }`}>
      <nav>
        <ul className="space-y-4 flex flex-col items-end">
          <li className="flex justify-end">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right">
              About
            </Link>
          </li>
          <li className="flex justify-end">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right">
              Blog
            </Link>
          </li>
          <li className="flex justify-end">
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right">
              Projects
            </Link>
          </li>
          <li className="flex justify-end">
            <Link href="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right">
              Bookmarks
            </Link>
          </li>
          <li className="flex justify-end items-center gap-2">
            <span className="text-muted-foreground hover:text-foreground transition-colors text-sm">Twitter</span>
            <a 
              href="https://twitter.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
            </a>
          </li>
          <li className="flex justify-end items-center gap-2">
            <span className="text-muted-foreground hover:text-foreground transition-colors text-sm">GitHub</span>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={20} />
            </a>
          </li>

        </ul>
      </nav>
    </aside>
  )
}