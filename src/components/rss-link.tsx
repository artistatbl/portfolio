'use client'

import { Rss } from 'lucide-react'
import { useMobile } from '@/hooks/use-mobile'

export function RSSLink() {
  const isMobile = useMobile()

  return (
    <a
      href="/rss.xml"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors duration-200 text-muted-foreground hover:text-foreground border border-border ${
        isMobile ? 'text-sm' : 'text-base'
      }`}
      aria-label="Subscribe to RSS feed"
    >
      <Rss size={isMobile ? 16 : 18} />
      <span className="font-medium">Subscribe to RSS</span>
    </a>
  )
}