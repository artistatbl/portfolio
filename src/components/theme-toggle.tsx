"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'light') {
      return <Sun className="h-4 w-4" />
    } else if (theme === 'dark') {
      return <Moon className="h-4 w-4" />
    } else {
      return <Sun className="h-4 w-4 opacity-50" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent transition-all duration-200"
      title={`Current theme: ${theme}. Click to cycle through themes.`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}