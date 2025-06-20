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

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog?slug=${slug}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog?action=slugs`)
    if (!response.ok) {
      throw new Error('Failed to fetch slugs')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  return getAllPosts().then(posts => 
    posts.filter(post => post.tags.includes(tag))
  )
}

export function getAllTags(): Promise<string[]> {
  return getAllPosts().then(posts => {
    const tags = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  })
}