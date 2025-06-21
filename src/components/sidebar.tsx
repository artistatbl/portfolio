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
      <aside className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="bg-background border border-border rounded-lg shadow-sm px-4 py-2">
          <ul className="flex items-center gap-6">
            <li>
              <Link 
                href="/" 
                className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="About"
              >
                <User size={20} />
                <span className="text-xs">About</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/blog" 
                className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Blog"
              >
                <BookOpen size={20} />
                <span className="text-xs">Blog</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Projects"
              >
                <FolderOpen size={20} />
                <span className="text-xs">Projects</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/bookmarks" 
                className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Bookmarks"
              >
                <Bookmark size={20} />
                <span className="text-xs">Bookmarks</span>
              </Link>
            </li>
          </ul>
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