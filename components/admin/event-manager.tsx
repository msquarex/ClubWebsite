"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, Calendar, Pin } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  image: string
  isPinned: boolean
  status: "upcoming" | "past"
  gallery?: string[]
}

export function EventManager() {
  const [events, setEvents] = useState<Event[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    image: "",
    isPinned: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockEvents: Event[] = [
      {
        id: "1",
        title: "Annual Tech Symposium 2024",
        description: "Join us for our biggest technical event of the year featuring industry experts.",
        date: "2024-12-25",
        time: "10:00",
        image: "/placeholder.svg?height=300&width=400",
        isPinned: true,
        status: "upcoming",
      },
      {
        id: "2",
        title: "Web Development Workshop",
        description: "Learn modern web development with React and Next.js.",
        date: "2024-01-15",
        time: "14:00",
        image: "/placeholder.svg?height=300&width=400",
        isPinned: false,
        status: "upcoming",
      },
      {
        id: "3",
        title: "Annual Hackathon 2023",
        description: "A 48-hour coding marathon with amazing prizes.",
        date: "2023-11-15",
        time: "09:00",
        image: "/placeholder.svg?height=300&width=400",
        isPinned: false,
        status: "past",
        gallery: ["/placeholder.svg?height=400&width=600"],
      },
    ]
    setEvents(mockEvents)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingEvent) {
      // Update existing event
      setEvents((prev) =>
        prev.map((event) =>
          event.id === editingEvent.id
            ? {
                ...event,
                ...formData,
                status: new Date(`${formData.date} ${formData.time}`) > new Date() ? "upcoming" : "past",
              }
            : event,
        ),
      )
      toast({ title: "Event updated successfully" })
    } else {
      // Create new event
      const newEvent: Event = {
        id: Date.now().toString(),
        ...formData,
        status: new Date(`${formData.date} ${formData.time}`) > new Date() ? "upcoming" : "past",
      }
      setEvents((prev) => [...prev, newEvent])
      toast({ title: "Event created successfully" })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      image: "",
      isPinned: false,
    })
    setEditingEvent(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      image: event.image,
      isPinned: event.isPinned,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId))
    toast({ title: "Event deleted successfully" })
  }

  const togglePin = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => ({
        ...event,
        isPinned: event.id === eventId ? !event.isPinned : false, // Only one event can be pinned
      })),
    )
    toast({ title: "Event pin status updated" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Event Manager</h2>
          <p className="text-muted-foreground">Create and manage club events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingEvent(null)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
              <DialogDescription>
                {editingEvent ? "Update event details" : "Add a new event to the club calendar"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    required
                    placeholder="Enter event title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Cover Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  required
                  placeholder="Describe the event..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pinned"
                  checked={formData.isPinned}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isPinned: checked as boolean }))}
                />
                <Label htmlFor="pinned" className="text-sm">
                  Pin to Hero Section
                </Label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1">
                  {editingEvent ? "Update Event" : "Create Event"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                {event.isPinned && (
                  <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                    <Pin className="h-3 w-3 mr-1" />
                    Pinned
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(event)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => togglePin(event.id)}
                  className={event.isPinned ? "bg-yellow-500/10" : ""}
                >
                  <Pin className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(event.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
