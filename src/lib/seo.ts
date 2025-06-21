import type { Metadata } from "next"

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://jeandaly.dev"
const defaultOgImage = "/og-image.jpg"

// Base metadata that applies to all pages
const baseMetadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "Jean" }],
  creator: "Jean",
  publisher: "Jean",
}

// Page-specific SEO configurations
export const seoConfig = {
  home: {
    title: "Jean - Full Stack Developer & UI/UX Designer",
    description: "Full Stack Developer & UI/UX Designer specializing in modern web technologies. Building beautiful, performant applications with React, Next.js, and TypeScript.",
    keywords: ["full stack developer", "ui/ux designer", "react", "nextjs", "typescript", "web development"],
  },
  blog: {
    title: "Blog - Jean",
    description: "Thoughts on web development, design, and technology. Sharing insights about React, Next.js, TypeScript, and modern development practices.",
    keywords: ["blog", "web development", "react", "nextjs", "typescript", "programming"],
  },
  projects: {
    title: "Projects - Jean",
    description: "A showcase of my latest projects and work. Full stack applications, UI/UX designs, and open source contributions.",
    keywords: ["projects", "portfolio", "web applications", "full stack", "react projects"],
  },
  bookmarks: {
    title: "Bookmarks - Jean",
    description: "Curated collection of useful tools, resources, and software that I use daily for development and design work.",
    keywords: ["bookmarks", "tools", "resources", "development tools", "design tools"],
  },
} as const

// Generate metadata for a specific page
export function generateMetadata(pageKey: keyof typeof seoConfig, customConfig?: Partial<SEOConfig>): Metadata {
  const config = { ...seoConfig[pageKey], ...customConfig }
  
  return {
    ...baseMetadata,
    title: config.title,
    description: config.description,
    keywords: config.keywords ? [...config.keywords] : undefined,
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.canonical || `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`,
      siteName: "Jean - Portfolio",
      images: [
        {
          url: config.ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [config.ogImage || defaultOgImage],
      creator: "@yvesdalyy", // Replace with your Twitter handle
    },
    alternates: {
      canonical: config.canonical || `${baseUrl}/${pageKey === 'home' ? '' : pageKey}`,
    },
  }
}

// Generate metadata for blog posts
export function generateBlogPostMetadata(post: {
  title: string
  description: string
  slug: string
  publishedAt?: string
  tags?: string[]
}): Metadata {
  const url = `${baseUrl}/blog/${post.slug}`
  
  return {
    ...baseMetadata,
    title: `${post.title} - Jean`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Jean - Portfolio",
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Jean"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [defaultOgImage],
      creator: "@yvesdalyy", // Replace with your Twitter handle
    },
    alternates: {
      canonical: url,
    },
  }
}