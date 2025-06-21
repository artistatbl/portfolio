import type { Metadata } from "next"
import { Providers } from "../components/providers"
import { ThemeToggle } from "../components/theme-toggle"
import { generateMetadata } from "@/lib/seo"

import "./globals.css"
 
export const metadata: Metadata = generateMetadata('home')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="alternate" 
          type="application/rss+xml" 
          title="Jean Daly - Blog RSS Feed" 
          href="/rss.xml" 
        />
      </head>
      <body className="antialiased">
        <main className="bg-background">
          <Providers>
            {children}
            <ThemeToggle />
          </Providers>
        </main>
      </body>
    </html>
  )
}
