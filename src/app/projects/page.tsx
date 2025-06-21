"use client";

import { PageLayout } from "../../components/page-layout";
import { projects } from "../../lib/projects-data";
import { useState } from "react";

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <PageLayout>
      <div className="relative">
        <h1 className="font-bold text-foreground mb-8 text-2xl md:text-4xl">
          Projects
        </h1>
        <p className="text-muted-foreground mb-8 text-sm md:mb-12 md:text-base">
          Things I've built and worked on
        </p>

        <div className="space-y-6 md:space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative mb-6 md:mb-8 group"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative z-10">
                <h2 className="font-semibold text-foreground hover:text-muted-foreground transition-colors cursor-pointer text-lg md:text-xl">
                  {project.title}
                </h2>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">
                  {project.description}
                </p>
                <p className="text-muted-foreground mt-1 text-xs md:text-sm">
                  Built with: {project.tech}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors underline text-xs md:text-sm"
                  >
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:text-muted-foreground transition-colors underline text-xs md:text-sm"
                  >
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Preview Image on Hover */}
              {project.preview && hoveredProject === index && (
                <div className="absolute right-0 top-0 z-20 hidden md:block pointer-events-none">
                  <div className="relative">
                    {/* Backdrop blur overlay */}
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl -m-2" />

                    {/* Main preview container */}
                    <div className="relative bg-background/95 border border-border/50 rounded-xl shadow-2xl p-3 animate-in fade-in-0 zoom-in-95 duration-300 ease-out backdrop-blur-md">
                      {/* Preview image */}
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={project.preview}
                          alt={`${project.title} preview`}
                          className="w-72 h-52 object-cover transition-transform duration-300 hover:scale-105"
                          loading="lazy"
                        />
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>

                      {/* Decorative corner accent */}
                      <div className="absolute top-2 right-2 w-2 h-2 bg-primary/20 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
