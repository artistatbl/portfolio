import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import type { ProjectEntry } from "@/lib/projects";

interface ProjectDetailProps {
  project: ProjectEntry;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const notes = project.highlights;
  const stack = project.stack;
  const linkItems = [
    project.deployUrl ? { href: project.deployUrl, label: "Live site" } : null,
    project.repoUrl ? { href: project.repoUrl, label: "GitHub repo" } : null,
  ].flatMap((link) => (link ? [link] : []));
  const quickFacts = [
    project.description ? { label: "Type", value: project.description } : null,
    project.platform ? { label: "Platform", value: project.platform } : null,
    project.status ? { label: "Status", value: project.status } : null,
    project.year ? { label: "Year", value: project.year } : null,
  ].flatMap((fact) => (fact ? [fact] : []));
  const primaryImageHref = project.deployUrl ?? project.repoUrl ?? project.siteUrl;

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[62rem]">
        <div className="space-y-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.25fr)] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Project
                </p>
                <div className="space-y-3">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h1 className="text-[2rem] font-semibold tracking-[-0.055em] text-foreground sm:text-[2.7rem]">
                      {project.title}
                    </h1>
                    {project.year ? (
                      <span className="text-[0.9rem] text-muted-foreground">
                        {project.year}
                      </span>
                    ) : null}
                  </div>
                  <p className="max-w-[27rem] text-[0.98rem] leading-8 text-[var(--intro)]">
                    {project.summary || project.description || "Project details coming soon."}
                  </p>
                </div>
              </div>

              {linkItems.length ? (
                <div className="flex flex-wrap gap-4">
                  {linkItems.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-[0.8rem] text-foreground underline decoration-[color-mix(in_srgb,var(--foreground)_16%,transparent)] underline-offset-[0.24em] transition-colors hover:text-muted-foreground"
                    >
                      {link.label}
                      <ArrowUpRight size={12} />
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="space-y-8">
                {quickFacts.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Quick Facts
                    </p>
                    <div className="space-y-3">
                      {quickFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="grid grid-cols-[5.3rem_minmax(0,1fr)] gap-3 text-[0.82rem] leading-6"
                        >
                          <span className="uppercase tracking-[0.1em] text-muted-foreground">
                            {fact.label}
                          </span>
                          <span className="text-foreground">{fact.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {stack.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stack.map((stackItem) => (
                        <span
                          key={stackItem}
                          className="text-[0.76rem] text-muted-foreground"
                        >
                          {stackItem}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-8 pt-1">
              {project.imageSrc ? (
                <a
                  href={primaryImageHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block cursor-pointer"
                >
                  <div className="overflow-hidden rounded-[1.25rem] bg-[color-mix(in_srgb,var(--muted)_28%,transparent)] transition-opacity duration-300 group-hover:opacity-95">
                    <Image
                      src={project.imageSrc}
                      alt={project.imageAlt ?? `${project.title} preview`}
                      width={1600}
                      height={1000}
                      className="h-auto w-full rounded-[1.25rem] object-cover"
                    />
                  </div>
                </a>
              ) : null}

              {notes.length ? (
                <div className="grid gap-x-6 gap-y-5 sm:grid-cols-3">
                  {notes.slice(0, 3).map((point, index) => (
                    <div key={point} className="space-y-2">
                      <span className="block text-[0.68rem] font-semibold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[0.82rem] leading-6 text-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          <section className="grid gap-10 border-t border-[color-mix(in_srgb,var(--border)_60%,transparent)] pt-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
            <div className="space-y-5">
              <article
                className="prose prose-neutral max-w-none text-[var(--intro)] prose-headings:text-foreground prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-h2:mt-0 prose-h2:text-[1.02rem] prose-h3:text-[0.95rem] prose-p:text-[0.92rem] prose-p:leading-[1.9] prose-p:tracking-[-0.02em] prose-li:text-[0.9rem] prose-li:leading-[1.8] prose-li:tracking-[-0.02em] prose-strong:text-foreground prose-a:cursor-pointer prose-a:text-foreground prose-a:underline prose-a:decoration-[color-mix(in_srgb,var(--foreground)_20%,transparent)] prose-a:underline-offset-[0.16em] prose-code:rounded-[0.45rem] prose-code:border prose-code:border-border prose-code:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] prose-code:px-[0.35rem] prose-code:py-[0.1rem] prose-code:font-mono prose-code:text-[0.84em] prose-code:before:content-none prose-code:after:content-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground dark:prose-invert dark:prose-headings:text-foreground dark:prose-strong:text-foreground dark:prose-a:text-foreground dark:prose-code:text-foreground"
                dangerouslySetInnerHTML={{ __html: project.html }}
              />
            </div>

            <aside className="space-y-3 lg:pt-1">
              {notes.length > 3 ? (
                <div className="space-y-3">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Highlights
                  </p>
                  <div className="space-y-3">
                    {notes.slice(3).map((point, index) => (
                      <div
                        key={point}
                        className="grid grid-cols-[1.4rem_minmax(0,1fr)] gap-3"
                      >
                        <span className="pt-0.5 text-[0.68rem] font-semibold text-muted-foreground">
                          {String(index + 4).padStart(2, "0")}
                        </span>
                        <p className="text-[0.82rem] leading-6 text-foreground">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </section>
        </div>
      </div>
    </main>
  );
}
