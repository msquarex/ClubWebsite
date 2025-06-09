"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Hexagon, Sparkles } from "lucide-react"

interface PinnedEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
}

export function HeroSectionRedesigned() {
  const [pinnedEvent, setPinnedEvent] = useState<PinnedEvent | null>(null)
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Mock pinned event
  useEffect(() => {
    const mockPinnedEvent: PinnedEvent = {
      id: "1",
      title: "Annual Tech Symposium 2024",
      description: "Join us for our biggest technical event featuring industry experts and innovation showcases.",
      date: "2024-12-25",
      time: "10:00 AM",
    }

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cursor-glow">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/30 to-black/50"></div>

        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full floating-animation"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Overlays */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 floating-animation"></div>
        <div
          className="absolute bottom-20 left-1/4 w-24 h-24 border border-primary/30 rotate-12 floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/3 w-16 h-16 bg-primary/10 rotate-45 floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Dynamic Elements */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Large decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 border-2 border-primary/20 rounded-full floating-animation"></div>
            <div
              className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg rotate-12 floating-animation"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-32 h-32 border border-primary/30 rotate-45 floating-animation"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="text-center lg:text-left">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start mb-6">
            <div className="relative group">
              <Hexagon className="w-20 h-20 text-primary pulse-glow" />
              <Sparkles className="absolute top-2 right-2 w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
          </div>

          {/* Club Name & Tagline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="gradient-text">Nexus Club</span>
          </h1>
          <p className="text-2xl md:text-3xl text-primary/80 font-light mb-6">Innovate. Lead. Build.</p>

          {/* Brief Intro */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Empowering the next generation of tech innovators through collaboration, cutting-edge projects, and
            community-driven learning experiences.
          </p>

          {/* Pinned Event or CTA */}
          {pinnedEvent && timeLeft ? (
            <div className="backdrop-panel rounded-2xl p-6 mb-8 glow-effect">
              <Badge variant="outline" className="mb-4 border-primary text-primary">
                🔥 Featured Event
              </Badge>
              <h3 className="text-2xl font-bold mb-2 text-white">{pinnedEvent.title}</h3>
              <p className="text-gray-300 mb-4">{pinnedEvent.description}</p>

              <div className="flex items-center justify-center lg:justify-start gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{new Date(pinnedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{pinnedEvent.time}</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="backdrop-panel rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-primary">{timeLeft.days}</div>
                  <div className="text-xs text-gray-400">Days</div>
                </div>
                <div className="backdrop-panel rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-primary">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="backdrop-panel rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-primary">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-400">Minutes</div>
                </div>
                <div className="backdrop-panel rounded-lg p-3 text-center">
                  <div className="text-xl font-bold text-primary">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-400">Seconds</div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 glow-hover">Register Now</Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-hover">
                Join Our Community
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 glow-hover"
              >
                Explore Events
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Cursor Follow Effect */}
      <div
        className="absolute pointer-events-none w-96 h-96 rounded-full opacity-10"
        style={{
          background: `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: "all 0.1s ease",
        }}
      />
    </section>
  )
}
