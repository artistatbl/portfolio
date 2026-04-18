import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono } from "next/font/google";

import { ThemeScript, ThemeToggle } from "@/components/ui/theme";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Jean Daly",
  description: "Software developer portfolio with a clean editorial layout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          defer
          src="https://assets.onedollarstats.com/stonks.js"
          data-debug="jeandaly.dev"
        ></script>
      </head>
      <body className={`${dmSans.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
