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
        className="fixed top-4 right-4 z-50 h-9 w-9 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const toggleTheme = () => {
    // Create overlay element for transition effect
    const overlay = document.createElement('div')
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      clip-path: circle(0% at top right);
      transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    `
    
    document.body.appendChild(overlay)
    
    // Trigger the corner expansion animation
    requestAnimationFrame(() => {
      overlay.style.clipPath = 'circle(150% at top right)'
    })
    
    // Change theme halfway through animation
    setTimeout(() => {
      if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }, 400)
    
    // Remove overlay after animation
    setTimeout(() => {
      document.body.removeChild(overlay)
    }, 800)
  }

  const getIcon = () => {
    if (theme === 'dark') {
      return (
        <Moon className="h-4 w-4 transition-all duration-500 ease-in-out transform rotate-0 scale-100" />
      )
    } else {
      return (
        <Sun className="h-4 w-4 transition-all duration-500 ease-in-out transform rotate-180 scale-100" />
      )
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 h-9 w-9 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent hover:scale-110 transition-all duration-300 ease-in-out active:scale-95"
      title={`Current theme: ${theme}. Click to toggle between light and dark.`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}