import { Suspense } from "react"
import Hero from "@/components/hero"
import ToolsSection from "@/components/tools-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4">
        <Hero />
        <Suspense fallback={null}>
          <ToolsSection />
        </Suspense>
      </div>
    </main>
  )
}
