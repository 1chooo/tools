"use client"

import { Input } from "@/components/ui/input"
import {
  FileTextIcon,
  PencilLine,
  Network,
  Ruler,
  Github,
  ChartSpline,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import React from "react"
import Hero from "@/components/hero";
import Link from "next/link";

type CardProps = {
  tools: Tool[]
  title: string
}

type Tool = {
  label: string
  link: string
  keywords: string[]
  color: string
  icon: LucideIcon
}

const TOOLS = [
  {
    label: "Editor",
    links: [
      {
        label: "Markdown Previewer",
        link: "/markdown-previewer",
        keywords: ["Word", "Counter", "Calculation", "Text"],
        color: "#fa5252",
        icon: FileTextIcon,
      },
      {
        label: "Paranoid Text Spacing",
        link: "/paranoid-text-spacing",
        keywords: ["Word", "Counter", "Calculation", "Text"],
        color: "#40c057",
        icon: Ruler,
      },
    ],
  },
  {
    label: "Calculator",
    links: [
      {
        label: "Compound Interest Calculator",
        link: "/compound-interest-calculator",
        keywords: ["Interest", "Calculator", "Compound"],
        color: "#fd7e14",
        icon: ChartSpline,
      },
      {
        label: "CIDR Calculator",
        link: "/cidr-calculator",
        keywords: ["CIDR", "Calculator", "IP", "Network"],
        color: "#15aabf",
        icon: Network,
      },
    ],
  },
  {
    label: "Generator",
    links: [
      {
        label: "E-mail Signature",
        link: "/email-signature",
        keywords: ["Generator", "Password", "Random"],
        color: "#f783ac",
        icon: PencilLine,
      },
      {
        label: "GitHub Profile README",
        link: "/#get-started",
        keywords: ["Generator", "GitHub", "Profile"],
        color: "#be4bdb",
        icon: Github,
      },
    ],
  },
  {
    label: "Math Visualizer",
    links: [
      {
        label: "Math Visualizer",
        link: "/#get-started",
        keywords: ["Math"],
        color: "#4c6ef5",
        icon: Network,
      },
    ],
  },
]

function Card({ tools, title }: Readonly<CardProps>) {
  return (
    <div className="w-full rounded-lg border p-4">
      <div>{title}</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {tools.map((tool) => (
          <Item key={tool.label} {...tool} />
        ))}
      </div>
    </div>
  )
}

function Item({ color, icon, label, link }: Readonly<Tool>) {
  const Icon = icon

  return (
    <Link
      href={link}
      className="flex flex-col items-center justify-center rounded-lg bg-accent p-4 text-center transition-colors duration-300 hover:bg-accent-highlight"
    >
      <Icon color={color} size={32} />
      <div className="mt-1.5">{label}</div>
    </Link>
  )
}

export default function HomePage() {
  const [value, setValue] = React.useState("")

  const filter = (tool: Tool): boolean =>
    tool.label.toLowerCase().includes(value.toLowerCase()) ||
    tool.keywords.some((keyword) =>
      keyword.toLowerCase().includes(value.toLowerCase())
    )

  return (
    <div>
      <Hero />
      <div className="flex flex-col items-start">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Search"
          className="w-full"
        />
        <div
          id="get-started"
          className="my-12 flex w-full scroll-mt-20 flex-col gap-6"
        >
          {value
            ? TOOLS.filter((t) => t.links.some((tool) => filter(tool))).map(
              (t) => {
                const { label, links } = t
                const filtered = links.filter((tool) => filter(tool))

                return <Card key={label} tools={filtered} title={label} />
              }
            )
            : TOOLS.map((tool) => {
              const { label, links } = tool

              return <Card key={label} tools={links} title={label} />
            })}
        </div>
      </div>
    </div>
  );
};
