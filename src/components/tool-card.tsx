import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"

type ToolCardProps = {
  label: string
  link: string
  color: string
  icon: LucideIcon
  description?: string
}

export function ToolCard({ color, icon: Icon, label, link, description }: Readonly<ToolCardProps>) {
  return (
    <Link
      href={link}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon style={{ color }} className="h-6 w-6" />
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
      </div>
      <h3 className="font-semibold text-foreground">{label}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>}
    </Link>
  )
}

type ToolCategoryProps = {
  title: string
  tools: ToolCardProps[]
}

export function ToolCategory({ title, tools }: Readonly<ToolCategoryProps>) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <div className="h-px flex-1 bg-border" />
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {tools.length}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.label} {...tool} />
        ))}
      </div>
    </div>
  )
}
