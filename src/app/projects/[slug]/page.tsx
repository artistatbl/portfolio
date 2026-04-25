import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/projects/project-detail";
import { getProjectEntries, getProjectEntry } from "@/lib/projects";

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
      title: "Project not found | Jean Daly",
    };
  }

  return {
    title: `${project.title} | Jean Daly`,
    description: project.summary || project.description,
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
