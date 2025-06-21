export interface Project {
  title: string
  description: string
  tech: string
  url: string
  demo: string
  preview?: string
}

export const projects: Project[] = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio built with Next.js and Tailwind CSS",
    tech: "Next.js, TypeScript, Tailwind CSS",
    url: "https://github.com/yourusername/portfolio",
    demo: "https://yourportfolio.com",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy&auto=format"
  },
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    tech: "React, Node.js, PostgreSQL, Stripe",
    url: "https://github.com/yourusername/ecommerce",
    demo: "https://yourecommerce.com",
    preview: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=entropy&auto=format"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management with real-time updates",
    tech: "Vue.js, Firebase, Vuetify",
    url: "https://github.com/yourusername/taskmanager",
    demo: "https://yourtaskapp.com",
    preview: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=entropy&auto=format"
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather data visualization dashboard",
    tech: "React, D3.js, OpenWeather API",
    url: "https://github.com/yourusername/weather-dashboard",
    demo: "https://yourweatherapp.com",
    preview: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop&crop=entropy&auto=format"
  },
  {
    title: "Social Media Analytics",
    description: "Analytics dashboard for social media performance tracking",
    tech: "Next.js, Chart.js, MongoDB, Express",
    url: "https://github.com/yourusername/social-analytics",
    demo: "https://yoursocialanalytics.com",
    preview: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=entropy&auto=format"
  },
  {
    title: "Recipe Finder App",
    description: "Mobile-first recipe discovery app with meal planning",
    tech: "React Native, Redux, Spoonacular API",
    url: "https://github.com/yourusername/recipe-finder",
    demo: "https://yourrecipeapp.com",
    preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=entropy&auto=format"
  },
  {
    title: "Expense Tracker",
    description: "Personal finance management with budget tracking and insights",
    tech: "Vue.js, Nuxt.js, Supabase, Chart.js",
    url: "https://github.com/yourusername/expense-tracker",
    demo: "https://yourexpensetracker.com",
    preview: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=entropy&auto=format"
  }
]