"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-16 rounded-full bg-muted animate-pulse" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-16 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDark ? "bg-slate-800" : "bg-amber-100",
      )}
    >
      {/* Track icons */}
      <Sun
        className="absolute left-1.5 h-4 w-4 text-amber-500 transition-opacity duration-300"
        style={{ opacity: isDark ? 0.3 : 0 }}
      />
      <Moon
        className="absolute right-1.5 h-4 w-4 text-slate-400 transition-opacity duration-300"
        style={{ opacity: isDark ? 0 : 0.3 }}
      />

      {/* Thumb */}
      <span
        className={cn(
          "pointer-events-none flex h-7 w-7 items-center justify-center rounded-full shadow-lg ring-0 transition-all duration-300 ease-out",
          isDark ? "translate-x-7 bg-slate-900" : "translate-x-0.5 bg-white",
        )}
      >
        <Sun
          className={cn(
            "absolute h-4 w-4 text-amber-500 transition-all duration-300",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
          )}
        />
        <Moon
          className={cn(
            "absolute h-4 w-4 text-blue-300 transition-all duration-300",
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </span>
    </button>
  )
}

export default ThemeToggle
