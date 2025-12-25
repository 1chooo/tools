"use client"

import { useState } from "react"
import { Search, FileText, Ruler, Baseline as ChartSpline, Network, PencilLine, Github, Camera } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ToolCategory } from "@/components/tool-card"
import { Input } from "@/components/ui/input"

type Tool = {
  label: string
  link: string
  keywords: string[]
  color: string
  icon: LucideIcon
  description?: string
}

type ToolGroup = {
  label: string
  links: Tool[]
}

const TOOLS: ToolGroup[] = [
  {
    label: "Editor",
    links: [
      {
        label: "Markdown Previewer",
        link: "/markdown-previewer",
        keywords: ["Word", "Counter", "Calculation", "Text", "Markdown"],
        color: "#ef4444",
        icon: FileText,
        description: "Preview and edit markdown in real-time",
      },
      {
        label: "Paranoid Text Spacing",
        link: "/paranoid-text-spacing",
        keywords: ["Word", "Counter", "Calculation", "Text", "Spacing"],
        color: "#22c55e",
        icon: Ruler,
        description: "Automatically add spaces between CJK and half-width characters",
      },
    ],
  },
  {
    label: "Calculator",
    links: [
      {
        label: "Compound Interest Calculator",
        link: "/compound-interest-calculator",
        keywords: ["Interest", "Calculator", "Compound", "Finance"],
        color: "#f97316",
        icon: ChartSpline,
        description: "Calculate compound interest with detailed breakdown",
      },
      {
        label: "CIDR Calculator",
        link: "/cidr-calculator",
        keywords: ["CIDR", "Calculator", "IP", "Network", "Subnet"],
        color: "#06b6d4",
        icon: Network,
        description: "Calculate CIDR notation and subnet information",
      },
    ],
  },
  {
    label: "Generator",
    links: [
      {
        label: "E-mail Signature",
        link: "/email-signature",
        keywords: ["Generator", "Email", "Signature"],
        color: "#ec4899",
        icon: PencilLine,
        description: "Create professional email signatures",
      },
      {
        label: "GitHub Profile README",
        link: "/#get-started",
        keywords: ["Generator", "GitHub", "Profile", "README"],
        color: "#a855f7",
        icon: Github,
        description: "Generate beautiful GitHub profile READMEs",
      },
    ],
  },
  {
    label: "Image Tools",
    links: [
      {
        label: "EXIF Reader",
        link: "/exif-reader",
        keywords: ["EXIF", "Image", "Metadata", "Photo", "Camera"],
        color: "#3b82f6",
        icon: Camera,
        description: "Extract and view EXIF metadata from images",
      },
    ],
  },
]

export default function ToolsSection() {
  const [searchValue, setSearchValue] = useState("")

  const filterTool = (tool: Tool): boolean =>
    tool.label.toLowerCase().includes(searchValue.toLowerCase()) ||
    tool.keywords.some((keyword) => keyword.toLowerCase().includes(searchValue.toLowerCase()))

  const filteredTools = searchValue
    ? TOOLS.map((group) => ({
        ...group,
        links: group.links.filter(filterTool),
      })).filter((group) => group.links.length > 0)
    : TOOLS

  return (
    <section id="get-started" className="scroll-mt-20 pb-20">
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          placeholder="Search tools..."
          className="h-12 pl-10 text-base"
        />
      </div>

      <div className="space-y-10">
        {filteredTools.length > 0 ? (
          filteredTools.map((group) => (
            <ToolCategory
              key={group.label}
              title={group.label}
              tools={group.links.map((tool) => ({
                label: tool.label,
                link: tool.link,
                color: tool.color,
                icon: tool.icon,
                description: tool.description,
              }))}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-lg font-medium text-muted-foreground">No tools found</p>
            <p className="text-sm text-muted-foreground/70">Try a different search term</p>
          </div>
        )}
      </div>
    </section>
  )
}
