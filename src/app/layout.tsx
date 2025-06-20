import type { Metadata } from "next"
import { Providers } from "../components/providers"
import { generateMetadata } from "@/lib/seo"

import "./globals.css"
 
export const metadata: Metadata = generateMetadata('home')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="bg-background">

        <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
