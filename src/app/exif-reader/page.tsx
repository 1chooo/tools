"use client"

import type React from "react"
import { useCallback, useState } from "react"
import ExifReader from "exifreader"
import { Upload, ImageIcon, X, Camera, MapPin, FileImage, Palette, Info, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ExifData = {
  [key: string]: {
    id?: number
    value: unknown
    description: string
  }
}

type ExifGroup = {
  name: string
  tags: { key: string; value: string; description: string }[]
}

const groupIcons: Record<string, React.ReactNode> = {
  EXIF: <Camera className="h-4 w-4" />,
  GPS: <MapPin className="h-4 w-4" />,
  File: <FileImage className="h-4 w-4" />,
  ICC: <Palette className="h-4 w-4" />,
  General: <Info className="h-4 w-4" />,
  IPTC: <Settings className="h-4 w-4" />,
  XMP: <Settings className="h-4 w-4" />,
  Thumbnail: <ImageIcon className="h-4 w-4" />,
}

const groupColors: Record<string, string> = {
  EXIF: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
  GPS: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
  File: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
  ICC: "from-pink-500/10 to-pink-600/5 border-pink-500/20",
  General: "from-slate-500/10 to-slate-600/5 border-slate-500/20",
  IPTC: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20",
  XMP: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
  Thumbnail: "from-orange-500/10 to-orange-600/5 border-orange-500/20",
}

const iconBgColors: Record<string, string> = {
  EXIF: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  GPS: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  File: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  ICC: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  General: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  IPTC: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  XMP: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Thumbnail: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
}

function ExifBentoCard({ group }: { group: ExifGroup }) {
  const displayTags = group.tags.slice(0, 6)
  const hasMore = group.tags.length > 6

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-gradient-to-br p-4 transition-all hover:shadow-lg",
        groupColors[group.name] || groupColors.General,
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className={cn("rounded-lg p-1.5", iconBgColors[group.name] || iconBgColors.General)}>
          {groupIcons[group.name] || <Info className="h-4 w-4" />}
        </div>
        <h3 className="font-semibold text-foreground">{group.name}</h3>
        <span className="ml-auto rounded-full bg-background/80 px-2 py-0.5 text-xs text-muted-foreground">
          {group.tags.length}
        </span>
      </div>
      <div className="space-y-1.5">
        {displayTags.map((tag, index) => (
          <div key={`${tag.key}-${index}`} className="flex items-start gap-2 text-sm">
            <span className="shrink-0 font-medium text-muted-foreground">{tag.key}:</span>
            <span className="truncate text-foreground" title={tag.description}>
              {tag.description}
            </span>
          </div>
        ))}
        {hasMore && <p className="pt-1 text-xs text-muted-foreground">+{group.tags.length - 6} more...</p>}
      </div>
    </div>
  )
}

function ExifReaderPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [exifData, setExifData] = useState<ExifGroup[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const processFile = useCallback(async (file: File) => {
    setError(null)
    setExifData([])

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
    setFileName(file.name)

    try {
      const tags = await ExifReader.load(file, { expanded: true })
      const groups: ExifGroup[] = []

      const groupNames: { key: keyof typeof tags; label: string }[] = [
        { key: "exif", label: "EXIF" },
        { key: "iptc", label: "IPTC" },
        { key: "xmp", label: "XMP" },
        { key: "icc", label: "ICC" },
        { key: "gps", label: "GPS" },
        { key: "Thumbnail", label: "Thumbnail" },
        { key: "file", label: "File" },
      ]

      for (const { key, label } of groupNames) {
        const groupData = tags[key] as ExifData | undefined
        if (groupData && typeof groupData === "object") {
          const tagList = Object.entries(groupData)
            .filter(([, val]) => val && typeof val === "object" && "description" in val)
            .map(([tagKey, val]) => ({
              key: tagKey,
              value: String(val.value ?? ""),
              description: String(val.description ?? ""),
            }))
            .filter((tag) => tag.description && tag.description !== "[object Object]")

          if (tagList.length > 0) {
            groups.push({ name: label, tags: tagList })
          }
        }
      }

      const rootTags: { key: string; value: string; description: string }[] = []
      for (const [key, val] of Object.entries(tags)) {
        if (!groupNames.some((g) => g.key === key) && val && typeof val === "object" && "description" in val) {
          const typedVal = val as { value?: unknown; description?: string }
          if (typedVal.description && typedVal.description !== "[object Object]") {
            rootTags.push({
              key,
              value: String(typedVal.value ?? ""),
              description: String(typedVal.description ?? ""),
            })
          }
        }
      }

      if (rootTags.length > 0) {
        groups.unshift({ name: "General", tags: rootTags })
      }

      if (groups.length === 0) {
        setError("No EXIF data found in this image.")
      } else {
        setExifData(groups)
      }
    } catch (err) {
      console.error("Error reading EXIF:", err)
      setError("Failed to read EXIF data from this image.")
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile],
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleClear = () => {
    setImagePreview(null)
    setExifData([])
    setError(null)
    setFileName(null)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">EXIF Reader</h1>
          <p className="mt-2 text-muted-foreground">Upload an image to extract and view its EXIF metadata</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
          {/* Left side - Upload area */}
          <div className="flex flex-col">
            <div
              className={cn(
                "relative flex min-h-[400px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 p-6 transition-all",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-muted-foreground/50",
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {imagePreview ? (
                <div className="relative flex h-full w-full flex-col items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -right-2 -top-2 z-10 h-8 w-8 rounded-full bg-background shadow-md"
                    onClick={handleClear}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="max-h-[350px] rounded-lg object-contain"
                  />
                  {fileName && <p className="mt-3 text-sm text-muted-foreground">{fileName}</p>}
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center gap-4">
                  <div className="rounded-full bg-muted p-4">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Drop an image here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Supports JPEG, PNG, HEIC, AVIF, WebP, TIFF, GIF</p>
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              )}
            </div>
          </div>

          {/* Right side - Bento EXIF display */}
          <div className="flex flex-col">
            {error ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-xl border bg-muted/30">
                <p className="text-center text-muted-foreground">{error}</p>
              </div>
            ) : exifData.length > 0 ? (
              <div className="grid auto-rows-fr gap-4 sm:grid-cols-2">
                {exifData.map((group) => (
                  <ExifBentoCard key={group.name} group={group} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-xl border bg-muted/30 text-muted-foreground">
                <ImageIcon className="h-12 w-12" />
                <p className="text-center">Upload an image to see its EXIF data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExifReaderPage
