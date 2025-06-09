"use client"

import { useEffect, useState } from "react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Trophy, ExternalLink } from "lucide-react"
import Image from "next/image"

interface PastEvent {
  id: string
  title: string
  date: string
  summary: string
  image: string
  participants?: number
  winners?: string[]
  resources?: string[]
  gallery?: string[]
}

export function PastEventsSection() {
  const [pastEvents, setPastEvents] = useState<PastEvent[]>([])

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockPastEvents: PastEvent[] = [
      {
        id: "1",
        title: "Annual Hackathon 2023",
        date: "2023-11-15",
        summary: "A 48-hour coding marathon where teams built innovative solutions to real-world problems.",
        image: "/placeholder.svg?height=300&width=400",
        participants: 120,
        winners: [
          "Team Alpha - AI Healthcare Assistant",
          "Team Beta - Smart City Dashboard",
          "Team Gamma - EcoTrack App",
        ],
        resources: ["Presentation Guidelines", "Judging Criteria", "Winner Presentations"],
      },
      {
        id: "2",
        title: "Tech Talk: Future of AI",
        date: "2023-10-20",
        summary:
          "Industry experts shared insights on the latest developments in artificial intelligence and machine learning.",
        image: "/placeholder.svg?height=300&width=400",
        participants: 85,
        resources: ["Speaker Slides", "Q&A Session Recording"],
      },
      {
        id: "3",
        title: "Web Development Bootcamp",
        date: "2023-09-10",
        summary: "A comprehensive 3-day workshop covering modern web development technologies and best practices.",
        image: "/placeholder.svg?height=300&width=400",
        participants: 60,
        resources: ["Course Materials", "Project Templates", "Certificate Guidelines"],
      },
    ]
    setPastEvents(mockPastEvents)
  }, [])

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Past Events</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our successful events and the impact we've made in the tech community
          </p>
        </div>

        <div className="space-y-8">
          {pastEvents.map((event, index) => (
            <Card
              key={event.id}
              className={`overflow-hidden border-border/50 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} lg:flex`}
            >
              <div className="lg:w-1/2">
                <div className="relative h-64 lg:h-full">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
              </div>
              <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <CardTitle className="text-2xl mb-4">{event.title}</CardTitle>
                <CardDescription className="text-base mb-6">{event.summary}</CardDescription>

                <div className="space-y-4">
                  {event.participants && (
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span>{event.participants} participants</span>
                    </div>
                  )}

                  {event.winners && (
                    <div>
                      <div className="flex items-center text-sm font-medium mb-2">
                        <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                        Winners:
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                        {event.winners.map((winner, idx) => (
                          <li key={idx}>• {winner}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {event.resources && (
                    <div>
                      <div className="flex items-center text-sm font-medium mb-2">
                        <ExternalLink className="h-4 w-4 mr-2 text-primary" />
                        Resources:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.resources.map((resource, idx) => (
                          <Button key={idx} variant="outline" size="sm">
                            {resource}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button className="mt-6 w-fit" variant="outline">
                  View Gallery
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
