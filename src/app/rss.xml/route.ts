import { NextRequest, NextResponse } from 'next/server'
import { readdir, readFile } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
}

async function getAllPosts(): Promise<BlogPostMeta[]> {
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
            title: matterResult.data.title,
            date: matterResult.data.date,
            excerpt: matterResult.data.excerpt,
            author: matterResult.data.author,
            tags: matterResult.data.tags || []
          }
        })
    )

    // Sort posts by date (newest first)
    return allPostsData.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

function generateRSSFeed(posts: BlogPostMeta[], baseUrl: string): string {
  const rssItems = posts.map(post => {
    const postUrl = `${baseUrl}/blog/${post.slug}`
    const pubDate = new Date(post.date).toUTCString()
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`
  }).join('')

  const lastBuildDate = new Date().toUTCString()
  const latestPostDate = posts.length > 0 && posts[0]?.date ? new Date(posts[0].date).toUTCString() : lastBuildDate

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jean Daly - Blog</title>
    <description>Personal blog about web development, technology, and programming</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${latestPostDate}</pubDate>
    <ttl>60</ttl>
    <managingEditor>jean@example.com (Jean Daly)</managingEditor>
    <webMaster>jean@example.com (Jean Daly)</webMaster>${rssItems}
  </channel>
</rss>`
}

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllPosts()
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (request.headers.get('host') ? `https://${request.headers.get('host')}` : 'http://localhost:3000')
    
    const rssXml = generateRSSFeed(posts, baseUrl)
    
    return new NextResponse(rssXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}