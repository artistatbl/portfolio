"use client"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { TwitterIcon } from "@/components/icons"

export function MadeByButton() {
  const isMobile = useMobile()

  // Don't render during SSR or on mobile devices
  if (isMobile === null || isMobile) {
    return null
  }

  const handleClick = () => {
    window.open('https://twitter.com/yvesdalyy', '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-40 px-3 py-2 h-auto rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent transition-all duration-200 text-xs text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-2"
      title="Made by Jean Daly - Follow on Twitter"
      onClick={handleClick}
data-s-event="Social Link Click"
      data-s-event-props="platform=twitter;source=made_by_button"
    >
      <span>made by Jean</span>
      <TwitterIcon size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
    </Button>
  )
}