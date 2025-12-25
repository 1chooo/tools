"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clipboard, Check, User, Briefcase, Phone, Mail, MapPin, Link2, Camera } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

function Container({ children, className }: Readonly<ContainerProps>) {
  return <div className={cn("mx-auto max-w-6xl px-4 py-8", className)}>{children}</div>
}


interface TitleProps {
  title: string
  description?: string
}

function Title({ title, description }: Readonly<TitleProps>) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && <p className="mt-2 text-muted-foreground">{description}</p>}
    </div>
  )
}


interface SignatureData {
  name: string
  jobTitle: string
  secondaryTitle: string
  phone: string
  email: string
  address: string
  headshotUrl: string
  website: string
  linkedin: string
  twitter: string
}

export default function SignatureCustomizer() {
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: "ChunHo (Hugo) Lin",
    jobTitle: "Software Engineer",
    secondaryTitle: "",
    phone: "012-345-6789",
    email: "hugo@example.com",
    address: "Taipei, Taiwan",
    headshotUrl: "/favicon.ico",
    website: "https://1chooo.com",
    linkedin: "https://linkedin.com/in/1chooo",
    twitter: "https://twitter.com/1chooo",
  })
  const [copied, setCopied] = useState(false)
  const [copiedSignature, setCopiedSignature] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSignatureData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateHTML = () => {
    const socialLinks = [
      signatureData.website &&
        `<a href="${signatureData.website}" style="color: #0ea5e9; text-decoration: none;">Website</a>`,
      signatureData.linkedin &&
        `<a href="${signatureData.linkedin}" style="color: #0ea5e9; text-decoration: none;">LinkedIn</a>`,
      signatureData.twitter &&
        `<a href="${signatureData.twitter}" style="color: #0ea5e9; text-decoration: none;">Twitter</a>`,
    ]
      .filter(Boolean)
      .join(" · ")

    return `
<table cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
  <tr>
    <td style="padding-right: 16px; vertical-align: top;">
      ${signatureData.headshotUrl ? `<img src="${signatureData.headshotUrl}" alt="${signatureData.name}" width="80" height="80" style="border-radius: 50%; object-fit: cover;" />` : ""}
    </td>
    <td style="vertical-align: top;">
      <strong style="font-size: 16px; color: #111;">${signatureData.name}</strong><br />
      ${signatureData.jobTitle ? `<span style="color: #666;">${signatureData.jobTitle}</span><br />` : ""}
      ${signatureData.secondaryTitle ? `<span style="color: #666;">${signatureData.secondaryTitle}</span><br />` : ""}
      <br />
      ${signatureData.phone ? `<span style="color: #666;">📞 ${signatureData.phone}</span><br />` : ""}
      ${signatureData.email ? `<span style="color: #666;">✉️ ${signatureData.email}</span><br />` : ""}
      ${signatureData.address ? `<span style="color: #666;">📍 ${signatureData.address}</span><br />` : ""}
      ${socialLinks ? `<br />${socialLinks}` : ""}
    </td>
  </tr>
</table>
    `.trim()
  }

  const copyAsHTML = async () => {
    const html = generateHTML()
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const copySignature = async () => {
    if (!previewRef.current) return

    const html = generateHTML()
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([html], { type: "text/html" }),
          "text/plain": new Blob([previewRef.current.innerText], { type: "text/plain" }),
        }),
      ])
      setCopiedSignature(true)
      setTimeout(() => setCopiedSignature(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <Container>
      <Title title="E-mail Signature Generator" description="Create a professional email signature in seconds" />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Photo Section */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Camera className="h-4 w-4" />
                Your Photo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="headshotUrl">Headshot URL</Label>
                <Input
                  id="headshotUrl"
                  name="headshotUrl"
                  value={signatureData.headshotUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4" />
                Your Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={signatureData.name} onChange={handleInputChange} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={signatureData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryTitle">Secondary Title</Label>
                  <Input
                    id="secondaryTitle"
                    name="secondaryTitle"
                    value={signatureData.secondaryTitle}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Briefcase className="h-4 w-4" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={signatureData.phone}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={signatureData.email}
                    onChange={handleInputChange}
                    placeholder="(optional)"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={signatureData.address}
                  onChange={handleInputChange}
                  placeholder="(optional)"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Links Section */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Link2 className="h-4 w-4" />
                Social Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={signatureData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={signatureData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={signatureData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className="space-y-4">
          <Card className="sticky top-8">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base">Preview</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copySignature} className="gap-2 bg-transparent">
                  {copiedSignature ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-4 w-4" />
                      Copy Signature
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={copyAsHTML} className="gap-2">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Clipboard className="h-4 w-4" />
                      Copy HTML
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div ref={previewRef} className="p-6 rounded-lg border bg-card">
                <div className="flex gap-4">
                  {signatureData.headshotUrl && (
                    <Image
                      src={signatureData.headshotUrl || "/placeholder.svg"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover shrink-0"
                      width={80}
                      height={80}
                    />
                  )}
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold">{signatureData.name}</h2>
                    {signatureData.jobTitle && <p className="text-muted-foreground">{signatureData.jobTitle}</p>}
                    {signatureData.secondaryTitle && (
                      <p className="text-muted-foreground">{signatureData.secondaryTitle}</p>
                    )}

                    <div className="pt-2 space-y-0.5 text-sm text-muted-foreground">
                      {signatureData.phone && (
                        <p className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          {signatureData.phone}
                        </p>
                      )}
                      {signatureData.email && (
                        <p className="flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          {signatureData.email}
                        </p>
                      )}
                      {signatureData.address && (
                        <p className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {signatureData.address}
                        </p>
                      )}
                    </div>

                    {(signatureData.website || signatureData.linkedin || signatureData.twitter) && (
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-sm">
                        {signatureData.website && (
                          <a
                            href={signatureData.website}
                            className="text-sky-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Website
                          </a>
                        )}
                        {signatureData.website && signatureData.linkedin && (
                          <span className="text-muted-foreground">·</span>
                        )}
                        {signatureData.linkedin && (
                          <a
                            href={signatureData.linkedin}
                            className="text-sky-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                          </a>
                        )}
                        {signatureData.linkedin && signatureData.twitter && (
                          <span className="text-muted-foreground">·</span>
                        )}
                        {signatureData.twitter && (
                          <a
                            href={signatureData.twitter}
                            className="text-sky-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Twitter
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground text-center">
                Click &quot;Copy Signature&quot; to paste directly into your email, or &quot;Copy HTML&quot; for raw
                code
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
