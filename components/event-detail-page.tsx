"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, ExternalLink, ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface EventDetail {
  id: string
  title: string
  date: string
  time: string
  location?: string
  description: string
  bannerImage: string
  status: "upcoming" | "past"
  participants?: number
  outcomes?: string[]
  stats?: { label: string; value: string }[]
  gallery?: string[]
  registrationLink?: string
  resultLinks?: string[]
  socialPosts?: { platform: string; url: string }[]
}

interface EventDetailPageProps {
  eventId: string
}

export function EventDetailPage({ eventId }: EventDetailPageProps) {
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  useEffect(() => {
    // Mock data - in real app, fetch from API based on eventId
    const mockEvents: { [key: string]: EventDetail } = {
      "1": {
        id: "1",
        title: "Annual Hackathon 2023",
        date: "2023-11-15",
        time: "09:00 AM",
        location: "Computer Science Building, Main Auditorium",
        description:
          "Our biggest coding event of the year! A 48-hour marathon where teams of passionate developers, designers, and innovators come together to build solutions that matter. This year's theme focuses on sustainable technology and social impact, challenging participants to create applications that can make a real difference in our communities.\n\nParticipants will have access to mentors from leading tech companies, workshops on cutting-edge technologies, and the opportunity to network with industry professionals. The event features multiple tracks including web development, mobile apps, AI/ML, and hardware hacking.\n\nPrizes include cash awards, internship opportunities, and startup incubation support for the most promising projects.",
        bannerImage: "/placeholder.svg?height=400&width=800",
        status: "past",
        participants: 120,
        outcomes: [
          "15 innovative projects developed",
          "3 startups launched from winning teams",
          "Over 50 industry connections made",
          "100% participant satisfaction rate",
        ],
        stats: [
          { label: "Teams", value: "30" },
          { label: "Hours", value: "48" },
          { label: "Mentors", value: "12" },
          { label: "Sponsors", value: "8" },
        ],
        gallery: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        resultLinks: ["Winner Presentations", "Project Showcase", "Mentor Feedback"],
        socialPosts: [
          { platform: "Twitter", url: "https://twitter.com/nexusclub/status/123" },
          { platform: "LinkedIn", url: "https://linkedin.com/posts/nexusclub-hackathon" },
        ],
      },
      "2": {
        id: "2",
        title: "Tech Talk: Future of AI",
        date: "2023-10-20",
        time: "02:00 PM",
        location: "Virtual Event",
        description:
          "Join us for an enlightening session with industry experts as they discuss the latest developments in artificial intelligence and machine learning. This talk will cover emerging trends, ethical considerations, and the future impact of AI on various industries.\n\nOur speakers include researchers from top universities and engineers from leading AI companies. Topics will include natural language processing, computer vision, autonomous systems, and the societal implications of AI advancement.\n\nThis is a great opportunity for students to learn about career paths in AI and ask questions directly to experts in the field.",
        bannerImage: "/placeholder.svg?height=400&width=800",
        status: "past",
        participants: 85,
        outcomes: [
          "Insights into latest AI research",
          "Career guidance for AI enthusiasts",
          "Q&A session with industry experts",
          "Networking opportunities",
        ],
        stats: [
          { label: "Speakers", value: "4" },
          { label: "Duration", value: "2h" },
          { label: "Q&As", value: "25" },
          { label: "Countries", value: "12" },
        ],
        gallery: [
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
          "/placeholder.svg?height=600&width=800",
        ],
        resultLinks: ["Speaker Slides", "Recording", "Resource Links"],
      },
      "4": {
        id: "4",
        title: "Annual Tech Symposium 2024",
        date: "2024-12-25",
        time: "10:00 AM",
        location: "University Convention Center",
        description:
          "Get ready for our most ambitious event yet! The Annual Tech Symposium 2024 will bring together students, industry professionals, and thought leaders for a day of innovation, learning, and networking.\n\nThe symposium will feature keynote speeches from tech industry leaders, panel discussions on emerging technologies, hands-on workshops, and a startup pitch competition. This year's focus areas include artificial intelligence, blockchain technology, sustainable tech solutions, and the future of work.\n\nAttendees will have the opportunity to participate in interactive sessions, visit sponsor booths, and connect with potential employers and collaborators. Don't miss this chance to be part of the tech community's biggest gathering of the year!",
        bannerImage: "/placeholder.svg?height=400&width=800",
        status: "upcoming",
        registrationLink: "https://nexusclub.edu/register/symposium2024",
        stats: [
          { label: "Expected Attendees", value: "500+" },
          { label: "Speakers", value: "15" },
          { label: "Workshops", value: "8" },
          { label: "Sponsors", value: "20+" },
        ],
      },
    }

    setEvent(mockEvents[eventId] || null)
  }, [eventId])

  const openGallery = (index: number) => {
    setSelectedImageIndex(index)
    setIsGalleryOpen(true)
  }

  const nextImage = () => {
    if (event?.gallery) {
      setSelectedImageIndex((prev) => (prev === event.gallery!.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (event?.gallery) {
      setSelectedImageIndex((prev) => (prev === 0 ? event.gallery!.length - 1 : prev - 1))
    }
  }

  if (!event) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      {/* Banner Section */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image src={event.bannerImage || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/">
            <Button variant="outline" size="sm" className="backdrop-panel border-primary/30">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <Badge
              variant="outline"
              className={`mb-4 ${event.status === "upcoming" ? "border-green-500 text-green-400" : "border-blue-500 text-blue-400"}`}
            >
              {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="backdrop-panel border-primary/20">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold gradient-text mb-4">About This Event</h2>
                <div className="prose prose-invert max-w-none">
                  {event.description.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outcomes (for past events) */}
            {event.outcomes && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold gradient-text mb-4">Event Outcomes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {event.outcomes.map((outcome, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold gradient-text mb-4">Event Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {event.gallery.slice(0, 6).map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => openGallery(index)}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                  {event.gallery.length > 6 && (
                    <Button
                      variant="outline"
                      className="mt-4 border-primary text-primary hover:bg-primary/10"
                      onClick={() => openGallery(0)}
                    >
                      View All {event.gallery.length} Photos
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            {event.stats && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold gradient-text mb-4">Event Stats</h3>
                  <div className="space-y-4">
                    {event.stats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300">{stat.label}</span>
                        <span className="text-primary font-bold">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Participants (for past events) */}
            {event.participants && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-white">Participants</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary">{event.participants}</p>
                  <p className="text-sm text-gray-400">Total attendees</p>
                </CardContent>
              </Card>
            )}

            {/* Registration (for upcoming events) */}
            {event.registrationLink && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold gradient-text mb-4">Registration</h3>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                      Register Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Resources/Results */}
            {event.resultLinks && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold gradient-text mb-4">Resources</h3>
                  <div className="space-y-2">
                    {event.resultLinks.map((link, index) => (
                      <Button key={index} variant="outline" className="w-full justify-start" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {link}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Social Posts */}
            {event.socialPosts && (
              <Card className="backdrop-panel border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold gradient-text mb-4">Social Media</h3>
                  <div className="space-y-2">
                    {event.socialPosts.map((post, index) => (
                      <Button key={index} variant="outline" className="w-full justify-start" size="sm" asChild>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on {post.platform}
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          {event.gallery && (
            <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setIsGalleryOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="relative w-full h-full">
                <Image
                  src={event.gallery[selectedImageIndex] || "/placeholder.svg"}
                  alt={`Gallery image ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>

              {event.gallery.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded">
                    {selectedImageIndex + 1} / {event.gallery.length}
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
