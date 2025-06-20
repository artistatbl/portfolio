import { NextResponse } from 'next/server'
import { readdir, readFile, access } from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

// Calculate reading time based on word count (average 200 words per minute)
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return readingTime
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  content: string
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  readingTime: number
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
          const readingTime = calculateReadingTime(matterResult.content)

          return {
            slug,
            title: matterResult.data.title,
            date: matterResult.data.date,
            excerpt: matterResult.data.excerpt,
            author: matterResult.data.author,
            tags: matterResult.data.tags || [],
            readingTime,
          } as BlogPostMeta
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

async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    try {
      await access(fullPath)
    } catch {
      return null
    }

    const fileContents = await readFile(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const readingTime = calculateReadingTime(matterResult.content)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt,
      author: matterResult.data.author,
      tags: matterResult.data.tags || [],
      content: contentHtml,
      readingTime,
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')
  const action = searchParams.get('action')

  try {
    if (action === 'slugs') {
      const posts = await getAllPosts()
      const slugs = posts.map(post => post.slug)
      return NextResponse.json(slugs)
    }
    
    if (slug) {
      const post = await getPostBySlug(slug)
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }
      return NextResponse.json(post)
    }
    
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}