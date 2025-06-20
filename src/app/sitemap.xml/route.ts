import { NextRequest, NextResponse } from 'next/server'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

interface BlogPostMeta {
  slug: string
  date: string
}

async function getAllPostSlugs(): Promise<BlogPostMeta[]> {
  try {
    const fileNames = await readdir(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = await readFile(fullPath, 'utf8')
          const matterResult = matter(fileContents)

          return {
            slug,
            date: matterResult.data.date
          }
        })
    )

    return allPostsData
  } catch (error) {
    console.error('Error reading blog posts for sitemap:', error)
    return []
  }
}

function generateSitemap(posts: BlogPostMeta[], baseUrl: string): string {
  const staticPages = [
    {
      url: baseUrl,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      url: `${baseUrl}/projects`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/bookmarks`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    }
  ]

  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'monthly',
    priority: '0.6'
  }))

  const allPages = [...staticPages, ...blogPages]

  const sitemapEntries = allPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapEntries}
</urlset>`
}

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllPostSlugs()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (request.headers.get('host') ? `https://${request.headers.get('host')}` : 'http://localhost:3000')
    
    const sitemapXml = generateSitemap(posts, baseUrl)
    
    return new NextResponse(sitemapXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new NextResponse('Error generating sitemap', { status: 500 })
  }
}