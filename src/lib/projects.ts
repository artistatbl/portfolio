import path from "node:path";
import { promises as fs } from "node:fs";
import { z } from "zod";

import { readMarkdownDirectory, readMarkdownFile } from "@/lib/markdown-content";

const PROJECT_DIRECTORY = path.join(process.cwd(), "content", "projects");

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  status?: string;
  platform?: string;
  siteUrl?: string;
  deployUrl?: string;
  repoUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  stack: string[];
  highlights: string[];
  html: string;
}

const projectFrontmatterSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  year: z.union([z.string(), z.number()]).optional(),
  status: z.string().optional(),
  platform: z.string().optional(),
  siteUrl: z.string().optional(),
  deployUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  imageSrc: z.string().optional(),
  imageAlt: z.string().optional(),
  stack: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

function normalizeProjectEntry({
  slug,
  frontmatter,
  html,
}: {
  slug: string;
  frontmatter: z.infer<typeof projectFrontmatterSchema>;
  html: string;
}): ProjectEntry & { published: boolean } {
  return {
    slug,
    title: frontmatter.title ?? slug,
    summary: frontmatter.summary ?? "",
    description: frontmatter.description ?? "",
    year: normalizeYear(frontmatter.year),
    status: frontmatter.status,
    platform: frontmatter.platform,
    siteUrl: frontmatter.siteUrl,
    deployUrl: frontmatter.deployUrl,
    repoUrl: frontmatter.repoUrl,
    imageSrc: frontmatter.imageSrc,
    imageAlt: frontmatter.imageAlt,
    stack: frontmatter.stack ?? [],
    highlights: frontmatter.highlights ?? [],
    published: frontmatter.published ?? true,
    html,
  };
}

function normalizeYear(value: string | number | undefined): string {
  if (typeof value === "number") {
    return String(value);
  }

  return value ?? "";
}

export async function getProjectEntries(): Promise<ProjectEntry[]> {
  const entries = (await readMarkdownDirectory(PROJECT_DIRECTORY, projectFrontmatterSchema)).map(
    normalizeProjectEntry
  );

  return entries
    .filter((entry) => entry.published)
    .map(({ published: _published, ...entry }) => entry);
}

export async function getProjectEntry(slug: string): Promise<ProjectEntry | null> {
  const filePath = path.join(PROJECT_DIRECTORY, `${slug}.md`);

  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  const entry = normalizeProjectEntry(
    await readMarkdownFile(PROJECT_DIRECTORY, `${slug}.md`, projectFrontmatterSchema)
  );

  if (!entry.published) {
    return null;
  }

  const { published: _published, ...project } = entry;
  return project;
}
