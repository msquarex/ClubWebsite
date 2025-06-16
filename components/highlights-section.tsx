"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"

interface Highlight {
  id: string
  title: string
  description: string
  type: "Event" | "Magazine" | "Update"
  date: string
  thumbnail?: string
  link?: string
}

export function HighlightsSection() {
  const [highlights, setHighlights] = useState<Highlight[]>([])

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockHighlights: Highlight[] = [
      {
        id: "1",
        title: "Web Development Workshop",
        description: "Learn modern web development with React and Next.js in this hands-on workshop.",
        type: "Event",
        date: "2024-01-15",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "2",
        title: "Tech Weekly - Issue #12",
        description: "Latest trends in AI and machine learning, featuring interviews with industry experts.",
        type: "Magazine",
        date: "2024-01-10",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: "3",
        title: "New Partnership Announcement",
        description: "Nexus Club partners with leading tech companies for internship opportunities.",
        type: "Update",
        date: "2024-01-08",
      },
      {
        id: "4",
        title: "Hackathon 2024 Results",
        description: "Congratulations to all participants and winners of our annual hackathon event.",
        type: "Event",
        date: "2024-01-05",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ]
    setHighlights(mockHighlights)
  }, [])

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Event":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "Magazine":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Update":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <section id="highlights" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nexus Highlights</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest events, publications, and club announcements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight) => (
            <Card
              key={highlight.id}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border"
            >
              {highlight.thumbnail && (
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={highlight.thumbnail || "/placeholder.svg"}
                    alt={highlight.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={getTypeColor(highlight.type)}>
                    {highlight.type}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(highlight.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{highlight.description}</CardDescription>
                <Button variant="ghost" className="p-0 h-auto font-medium group/btn">
                  View More
                  <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
