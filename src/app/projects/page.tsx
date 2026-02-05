import { ScrambleText } from "@/components/scramble-text"
import { ProjectCard } from "@/components/project-card"
import { Metadata } from "next"

const projects = [
  {
    title: "adventure map app",
    description:
      "a live tracking mobile app for your outdoor adventures",
    role: "creator",
    period: "jun 2024 - present",
    achievements: [
      "grew project to 24k+ github stars",
      "wrote education blog posts with over 100k views",
      "maintained comprehensive, up-to-date documentation",
    ],
    technologies: [
      "python",
      "kotlin",
      "postgresql",
      "influxdb",
      "mqtt",
      "rust",
    ],
    href: "https://create.t3.gg",
  },
  {
    title: "PV agrivoltaic simulator",
    description: "simulation tool to compute impact of shade casted on soil from solar panels on crops",
    role: "creator",
    period: "jul 2024",
    achievements: [
      "built a tool to simulate multiple control strategies on 30+ years on agrivoltaic systems",
      "visualization agronomic impact on crops with spatio-temporal dimensions",
      "compute energy yields over the period",
    ],
    technologies: ["dask", "fastapi", "xarray", "netcdf", "climatic datasets"],
    href: "https://doi.org/10.52825/agripv.v3i.1394",
  },
  {
    title: "pint",
    description: "pint is a python package to define, operate and manipulate physical quantities",
    role: "maintainer",
    period: "mar 2022 - present",
    achievements: [
      "Maintaining widely used OSS library for the community",
    ],
    technologies: ["python"],
    href: "https://github.com/hgrecco/pint",
  },
  {
    title: "wind-stats",
    description: "small library to compute energy yields for wind turbines",
    role: "creator",
    period: "feb 2022",
    achievements: [
      "My first open source library",
    ],
    technologies: ["python"],
    href: "https://github.com/jules-ch/wind-stats",
  },
  {
    title: "fp_",
    description: "a functional programming library for typescript",
    role: "creator",
    period: "feb 2023",
    achievements: [
      "implemented a comprehensive set of functional programming constructs",
      "wrote documentation and examples to help developers understand and use the library",
      "published to deno package registry",
    ],
    technologies: ["typescript"],
    href: "https://github.com/nexxeln/fp",
  },
]

export default function ProjectsPage() {
  return (
    <main className="animate-fade-in-up">
      <h1 className="text-4xl font-bold mb-8 text-white">
        <span className="text-accent mr-2">*</span>
        <ScrambleText text="projects" />
      </h1>

      <p className="text-gray-400 mb-12 leading-relaxed">
        here are some of the projects i&apos;ve worked on. i love building tools
        that make developers&apos; lives easier and exploring new technologies
        along the way.
      </p>

      <div className="space-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Some of the projects I've worked on.",
  openGraph: {
    images: [
      {
        url: "https://www.nexxel.dev/og/home?title=projects",
      },
    ],
  },
}
