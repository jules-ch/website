import { Header } from "@/components/header"
import { Item, SectionList } from "@/components/section-list"
import { BlogSection } from "@/components/blog-section"
import { LinksSection } from "@/components/links-section"

const workItems: Item[] = [
  {
    title: "deepki",
    role: "senior software engineer",
    period: "dec 2024 - present",
    description: "tackling CO2 in the real estate sector | crunching data on my spare time",
    href: "https://deepki.com",
  },
  {
    title: "ombrea",
    role: "lead dev",
    period: "sept 2021 - dec 2023",
    description: "built a simulation tool for agripv systems to model agronomic impact and energy yield with 30+ years datasets",
    href: "https://ombrea.fr",
  },
  {
    title: "safran aircraft engines",
    role: "software engineer",
    period: "sept 2016 - aug 2021",
    description:
      "helped building a multi-disciplinary computing app to leverage best preliminary designs",
    href: "https://www.safran-group.com/companies/safran-aircraft-engines",
  },

]

const projectItems = [
  {
    title: "outdoor mobile app",
    description:
      "a live tracking mobile app for your outdoor adventures.",
    role: "creator",
    href: "",
  },
  {
    title: "pint",
    description: "pint is a python package to define, operate and manipulate physical quantities",
    href: "https://github.com/hgrecco/pint",
  },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <SectionList title="work" items={workItems} />
      <BlogSection />
      <SectionList
        title="projects"
        items={projectItems}
        viewAllHref="/projects"
        viewAllText="all projects"
      />
      <LinksSection />
    </>
  )
}
