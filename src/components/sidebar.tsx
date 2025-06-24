'use client'

import Link from 'next/link'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { User, BookOpen, FolderOpen, Bookmark } from 'lucide-react'
import { GitHubIcon, TwitterIcon } from '@/components/icons'



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
data-s-event="Navigation Click"
                data-s-event-props="page=about;device=mobile"
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
data-s-event="Navigation Click"
                data-s-event-props="page=blog;device=mobile"
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
data-s-event="Navigation Click"
                data-s-event-props="page=projects;device=mobile"
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
data-s-event="Navigation Click"
                data-s-event-props="page=bookmarks;device=mobile"
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
    <aside className={`fixed top-16 mr-20 w-auto ${
      isTablet ? 'right-4' : 'right-1/4'
    }`}>
      <nav className='text-sm'>
        <ul className="space-y-4 flex flex-col items-end">
          <li className="flex justify-end">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right"
data-s-event="Navigation Click"
              data-s-event-props="page=about;device=desktop"
            >
              about
            </Link>
          </li>
          <li className="flex justify-end">
            <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right"
data-s-event="Navigation Click"
              data-s-event-props="page=blog;device=desktop"
            >
              blog
            </Link>
          </li>
          <li className="flex justify-end">
            <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right"
data-s-event="Navigation Click"
              data-s-event-props="page=projects;device=desktop"
            >
              projects
            </Link>
          </li>
          <li className="flex justify-end">
            <Link href="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors w-20 text-right"
data-s-event="Navigation Click"
              data-s-event-props="page=bookmarks;device=desktop"
            >
              bookmarks
            </Link>
          </li>
          <li className="flex justify-end items-center gap-2">
            <a 
              href="https://twitter.com/yvesdalyy" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
data-s-event="Social Link Click"
              data-s-event-props="platform=twitter;source=sidebar"
            >
              <span className="text-sm">twitter</span>
              <TwitterIcon size={14} />
            </a>
          </li>
          <li className="flex justify-end items-center gap-2">
            <a 
              href="https://github.com/artistatbl" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
data-s-event="Social Link Click"
              data-s-event-props="platform=github;source=sidebar"
            >
              <span className="text-sm">gitHub</span>
              <GitHubIcon size={20} />
            </a>
          </li>

        </ul>
      </nav>
    </aside>
  )
}