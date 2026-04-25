import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/projects/project-detail";
import { getProjectEntries, getProjectEntry } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjectEntries();

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectEntry(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const title = `${project.title} project`;
  const description = project.summary || project.description || siteConfig.description;
  const url = `/projects/${project.slug}`;
  const image = project.imageSrc || siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${project.title} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: image,
          alt: project.imageAlt || `${project.title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${siteConfig.name}`,
      description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectEntry(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
