import type { Metadata } from "next"
import { Providers } from "./components/providers"

import "./globals.css"

export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Full Stack Developer & UI/UX Designer - Portfolio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

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
