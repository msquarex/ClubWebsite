"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, ImageIcon, ExternalLink, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Magazine {
  id: string
  title: string
  issue: string
  date: string
  thumbnail?: string
  description: string
  downloadLink?: string
}

interface GalleryItem {
  id: string
  title: string
  coverImage: string
  photoCount: number
  date: string
  eventId?: string
}

export default function PublicationsPage() {
  const [magazines, setMagazines] = useState<Magazine[]>([])
  const [galleries, setGalleries] = useState<GalleryItem[]>([])

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockMagazines: Magazine[] = [
      {
        id: "1",
        title: "Tech Weekly",
        issue: "#15",
        date: "2024-01-15",
        thumbnail: "/placeholder.svg?height=300&width=200",
        description: "Latest trends in AI and machine learning, featuring interviews with industry experts.",
        downloadLink: "https://nexusclub.edu/magazines/tech-weekly-15.pdf",
      },
      {
        id: "2",
        title: "Innovation Digest",
        issue: "#12",
        date: "2024-01-08",
        thumbnail: "/placeholder.svg?height=300&width=200",
        description: "Exploring breakthrough technologies and startup success stories.",
        downloadLink: "https://nexusclub.edu/magazines/innovation-digest-12.pdf",
      },
      {
        id: "3",
        title: "Code Chronicles",
        issue: "#8",
        date: "2024-01-01",
        thumbnail: "/placeholder.svg?height=300&width=200",
        description: "Programming tutorials, best practices, and developer insights.",
        downloadLink: "https://nexusclub.edu/magazines/code-chronicles-8.pdf",
      },
      {
        id: "4",
        title: "Tech Weekly",
        issue: "#14",
        date: "2023-12-15",
        thumbnail: "/placeholder.svg?height=300&width=200",
        description: "Year-end review of technology trends and predictions for 2024.",
      },
      {
        id: "5",
        title: "Innovation Digest",
        issue: "#11",
        date: "2023-12-08",
        thumbnail: "/placeholder.svg?height=300&width=200",
        description: "Cybersecurity focus: protecting digital assets in the modern age.",
      },
      {
        id: "6",
        title: "Code Chronicles",
        issue: "#7",
        date: "2023-12-01",
        thumbnail: "/placeholder.svg?height=300&width=200",
        description: "Web development frameworks comparison and performance analysis.",
      },
    ]

    const mockGalleries: GalleryItem[] = [
      {
        id: "1",
        title: "Annual Hackathon 2023",
        coverImage: "/placeholder.svg?height=200&width=300",
        photoCount: 45,
        date: "2023-11-15",
        eventId: "1",
      },
      {
        id: "2",
        title: "Tech Talk Series",
        coverImage: "/placeholder.svg?height=200&width=300",
        photoCount: 28,
        date: "2023-10-20",
        eventId: "2",
      },
      {
        id: "3",
        title: "Workshop Sessions",
        coverImage: "/placeholder.svg?height=200&width=300",
        photoCount: 32,
        date: "2023-09-10",
        eventId: "3",
      },
      {
        id: "4",
        title: "Club Social Events",
        coverImage: "/placeholder.svg?height=200&width=300",
        photoCount: 67,
        date: "2023-08-15",
      },
      {
        id: "5",
        title: "Industry Visits",
        coverImage: "/placeholder.svg?height=200&width=300",
        photoCount: 23,
        date: "2023-07-20",
      },
      {
        id: "6",
        title: "Team Building Activities",
        coverImage: "/placeholder.svg?height=200&width=300",
        photoCount: 41,
        date: "2023-06-10",
      },
    ]

    setMagazines(mockMagazines)
    setGalleries(mockGalleries)
  }, [])

  return (
    <div className="pt-16 min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="backdrop-panel border-primary/30">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold gradient-text">Publications & Gallery</h1>
            <p className="text-gray-300 mt-2">Explore our magazines, publications, and photo galleries</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="magazines" className="w-full">
          <TabsList className="grid w-full grid-cols-2 backdrop-panel border-primary/20">
            <TabsTrigger value="magazines" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Magazines & Publications
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Photo Gallery
            </TabsTrigger>
          </TabsList>

          {/* Magazines Tab */}
          <TabsContent value="magazines" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {magazines.map((magazine) => (
                <Card key={magazine.id} className="backdrop-panel border-primary/20 glow-hover cursor-pointer">
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    {magazine.thumbnail ? (
                      <Image
                        src={magazine.thumbnail || "/placeholder.svg"}
                        alt={magazine.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-primary" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="outline" className="border-green-500 text-green-400 bg-black/50">
                        {magazine.issue}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{magazine.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(magazine.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{magazine.description}</p>
                    {magazine.downloadLink && (
                      <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90">
                        <a href={magazine.downloadLink} target="_blank" rel="noopener noreferrer">
                          Download PDF
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <Link
                  key={gallery.id}
                  href={gallery.eventId ? `/gallery/${gallery.eventId}` : `/gallery/${gallery.id}`}
                >
                  <Card className="backdrop-panel border-primary/20 glow-hover cursor-pointer transition-all duration-300">
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={gallery.coverImage || "/placeholder.svg"}
                        alt={gallery.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <Badge variant="outline" className="border-primary text-primary bg-black/50 mb-2">
                          {gallery.photoCount} photos
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 hover:text-primary transition-colors">
                        {gallery.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(gallery.date).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
