import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata('bookmarks')

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}