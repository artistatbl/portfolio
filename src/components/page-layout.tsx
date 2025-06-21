'use client'

import { Sidebar } from './sidebar'

import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {


  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <Sidebar />
      
      <main className="flex-1 py-8 px-4 pb-48 md:py-20 md:px-8 md:pb-20 max-w-xl mx-auto ">
        {children}
      </main>
    </div>
  )
}