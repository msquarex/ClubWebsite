"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface PinnedEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  image: string
}

export function HeroSection() {
  const [pinnedEvent, setPinnedEvent] = useState<PinnedEvent | null>(null)
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  // Mock pinned event - in real app, fetch from API
  useEffect(() => {
    // Simulate fetching pinned event
    const mockPinnedEvent: PinnedEvent = {
      id: "1",
      title: "Annual Tech Symposium 2024",
      description:
        "Join us for our biggest technical event of the year featuring industry experts, workshops, and networking opportunities.",
      date: "2024-12-25",
      time: "10:00 AM",
      image: "/placeholder.svg?height=600&width=1200",
    }

    // Only set if event is in the future
    const eventDate = new Date(`${mockPinnedEvent.date} ${mockPinnedEvent.time}`)
    if (eventDate > new Date()) {
      setPinnedEvent(mockPinnedEvent)
    }
  }, [])

  // Countdown timer
  useEffect(() => {
    if (!pinnedEvent) return

    const timer = setInterval(() => {
      const eventDate = new Date(`${pinnedEvent.date} ${pinnedEvent.time}`)
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft(null)
        setPinnedEvent(null)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [pinnedEvent])

  if (pinnedEvent) {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${pinnedEvent.image})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Badge variant="secondary" className="mb-4">
            Pinned Event
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{pinnedEvent.title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">{pinnedEvent.description}</p>

          <div className="flex items-center justify-center gap-6 mb-8 text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(pinnedEvent.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{pinnedEvent.time}</span>
            </div>
          </div>

          {timeLeft && (
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-gray-300">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-gray-300">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-300">Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-300">Seconds</div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Register Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    )
  }

  // Default hero section
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/placeholder.svg?height=800&width=1600)" }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-primary">Nexus Club</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
          Empowering the next generation of tech innovators through collaboration, learning, and cutting-edge projects.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Join Our Community
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
            Explore Events
          </Button>
        </div>
      </div>
    </section>
  )
}
