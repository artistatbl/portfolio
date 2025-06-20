'use client'

import { Sidebar } from './sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'
import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const isMobile = useMobile()
  const isTablet = useTablet()

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <Sidebar />
      
      <main className={`flex-1  ${
isMobile ? 'py-8 px-4 pb-20 max-w-xl mx-auto' : isTablet ? 'py-20 px-8 max-w-xl mx-auto ' : 'py-20 px-8 max-w-xl mx-auto '
      }`}>
        {children}
      </main>
    </div>
  )
}