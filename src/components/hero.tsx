import Link from "next/link"
import { ArrowRight, Github, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Free & Open Source</span>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Lin Hugo</span>{" "}
          Tools
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          A collection of free, fast, and beautiful developer tools. Built with modern web technologies, inspired by the
          community.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="#get-started">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <Link href="https://github.com/1chooo/tools" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
        </div>


      </div>
    </section>
  )
}
