'use client'

import { Sidebar } from '../../components/sidebar'
import { useMobile, useTablet } from '@/hooks/use-mobile'

export default function Projects() {
  const isMobile = useMobile()
  const isTablet = useTablet()
  const projects = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio built with Next.js and Tailwind CSS",
      tech: "Next.js, TypeScript, Tailwind CSS",
      url: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: "React, Node.js, PostgreSQL, Stripe",
      url: "https://github.com/yourusername/ecommerce",
      demo: "https://yourecommerce.com"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: "Vue.js, Firebase, Vuetify",
      url: "https://github.com/yourusername/taskmanager",
      demo: "https://yourtaskapp.com"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather data visualization dashboard",
      tech: "React, D3.js, OpenWeather API",
      url: "https://github.com/yourusername/weather-dashboard",
      demo: "https://yourweatherapp.com"
    }
  ]

  return (
    <div className="min-h-screen flex justify-center items-start">
      <div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      
      <Sidebar />
      
      <main className={`mx-auto ${
        isMobile ? 'py-8 px-4 pb-20 max-w-2xl' : isTablet ? 'py-20 px-8 max-w-xl mr-32' : 'py-20 px-8 max-w-2xl'
      }`}>
        <div>
          <h1 className={`font-bold text-foreground mb-8 ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>Projects</h1>
          <p className={`text-muted-foreground ${
            isMobile ? 'mb-8 text-sm' : 'mb-12'
          }`}>Things I've built and worked on</p>
          
          <div className={isMobile ? 'space-y-6' : 'space-y-8'}>
            {projects.map((project, index) => (
              <div key={index} className={isMobile ? 'mb-6' : 'mb-8'}>
                <h2 className={`font-semibold text-foreground hover:text-muted-foreground transition-colors cursor-pointer ${
                  isMobile ? 'text-lg' : 'text-xl'
                }`}>{project.title}</h2>
                <p className={`text-muted-foreground mt-1 ${
                  isMobile ? 'text-sm' : 'text-base'
                }`}>{project.description}</p>
                <p className={`text-muted-foreground mt-1 ${
                  isMobile ? 'text-xs' : 'text-sm'
                }`}>Built with: {project.tech}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-foreground hover:text-muted-foreground transition-colors underline ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    Code
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-foreground hover:text-muted-foreground transition-colors underline ${
                      isMobile ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}