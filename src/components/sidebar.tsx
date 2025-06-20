'use client'

import Link from 'next/link'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { User, PenTool, Code, Bookmark, Twitter, Github, Video } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function Sidebar() {
  const isMobile = useMobile()
  const isTablet = useTablet()

  if (isMobile) {
    return (
      <aside className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <nav className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-4 py-2">
          <ul className="flex space-x-6">
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    <User size={16} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>About</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    <PenTool size={16} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Blog</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Code size={16} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Projects</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Bookmark size={16} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bookmarks</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://twitter.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter size={16} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow on Twitter</p>
                </TooltipContent>
              </Tooltip>
            </li>
            <li>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={16} />
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Code</p>
                </TooltipContent>
              </Tooltip>
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
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  <User size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>About</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  <PenTool size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Blog</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Code size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Projects</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Bookmark size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bookmarks</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow on Twitter</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Code</p>
              </TooltipContent>
            </Tooltip>
          </li>
          <li>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Video size={20} />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Videos</p>
              </TooltipContent>
            </Tooltip>
          </li>
        </ul>
      </nav>
    </aside>
  )
}