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
    // Create container for rain drops
    const container = document.createElement('div')
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      overflow: hidden;
      pointer-events: none;
    `
    document.body.appendChild(container)
    
    // Set the background color based on the target theme (opposite of current)
    const targetTheme = theme === 'dark' ? 'light' : 'dark'
    const bgColor = targetTheme === 'dark' ? 'oklch(0.2747 0.0139 57.6523)' : 'oklch(0.9582 0.0152 90.2357)'
    
    // Create rain drops
    const dropCount = 100
    const drops = []
    
    for (let i = 0; i < dropCount; i++) {
      const drop = document.createElement('div')
      const size = Math.random() * 5 + 3
      const xPos = Math.random() * 100
      const delay = Math.random() * 0.5
      const duration = Math.random() * 0.5 + 0.5
      
      drop.style.cssText = `
        position: absolute;
        top: -20px;
        left: ${xPos}%;
        width: ${size}px;
        height: ${size * 3}px;
        background: ${bgColor};
        border-radius: 50%;
        opacity: 0.8;
        transform: translateY(-100px);
        animation: rain ${duration}s linear ${delay}s forwards;
      `
      
      container.appendChild(drop)
      drops.push(drop)
    }
    
    // Add animation style
    const style = document.createElement('style')
    style.textContent = `
      @keyframes rain {
        0% {
          transform: translateY(-100px);
        }
        100% {
          transform: translateY(calc(100vh + 100px));
        }
      }
    `
    document.head.appendChild(style)
    
    // Change theme after a short delay
    setTimeout(() => {
      if (theme === 'dark') {
        setTheme('light')
      } else {
        setTheme('dark')
      }
    }, 300)
    
    // Remove elements after animation completes
    setTimeout(() => {
      document.body.removeChild(container)
      document.head.removeChild(style)
    }, 1500)
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
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 h-9 w-9 rounded-lg bg-background/80 backdrop-blur-sm border border-border/40 hover:bg-accent hover:scale-110 transition-all duration-300 ease-in-out active:scale-95"
      title={`Current theme: ${theme}. Click to toggle between light and dark.`}
data-s-event="Theme Toggle"
      data-s-event-props={`theme=${theme === 'dark' ? 'light' : 'dark'}`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}