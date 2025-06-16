"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, MessageSquare, Calendar, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Feedback {
  id: string
  subject: string
  message: string
  date: string
  isJoinInterest: boolean
  status: "new" | "read"
}

export function FeedbackViewer() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockFeedbacks: Feedback[] = [
      {
        id: "1",
        subject: "Question about upcoming events",
        message:
          "Hi, I'm interested in learning more about your upcoming web development workshop. Could you provide more details about the prerequisites and registration process?",
        date: "2024-01-15T10:30:00Z",
        isJoinInterest: false,
        status: "new",
      },
      {
        id: "2",
        subject: "Interested in joining the club",
        message:
          "Hello! I'm a sophomore studying Computer Science and I'm very interested in joining Nexus Club. I have experience with Python and JavaScript. How can I get involved?",
        date: "2024-01-14T15:45:00Z",
        isJoinInterest: true,
        status: "new",
      },
      {
        id: "3",
        subject: "Partnership proposal",
        message:
          "We are a local tech startup and would like to explore partnership opportunities with Nexus Club for internships and mentorship programs.",
        date: "2024-01-13T09:20:00Z",
        isJoinInterest: false,
        status: "read",
      },
      {
        id: "4",
        subject: "Event feedback",
        message:
          "Thank you for organizing the hackathon last month. It was an amazing experience! I learned a lot and made great connections.",
        date: "2024-01-12T14:15:00Z",
        isJoinInterest: false,
        status: "read",
      },
    ]
    setFeedbacks(mockFeedbacks)
  }, [])

  const markAsRead = (feedbackId: string) => {
    setFeedbacks((prev) =>
      prev.map((feedback) => (feedback.id === feedbackId ? { ...feedback, status: "read" } : feedback)),
    )
  }

  const deleteFeedback = (feedbackId: string) => {
    setFeedbacks((prev) => prev.filter((feedback) => feedback.id !== feedbackId))
    toast({ title: "Feedback deleted successfully" })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const newFeedbackCount = feedbacks.filter((f) => f.status === "new").length
  const joinInterestCount = feedbacks.filter((f) => f.isJoinInterest).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Feedback Viewer</h2>
          <p className="text-muted-foreground">View and manage user feedback and inquiries</p>
        </div>
        <div className="flex gap-4">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
            {newFeedbackCount} New
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            {joinInterestCount} Join Requests
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <Card
            key={feedback.id}
            className={`border-border/50 transition-all duration-200 ${
              feedback.status === "new" ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-lg">{feedback.subject}</CardTitle>
                    {feedback.status === "new" && (
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        New
                      </Badge>
                    )}
                    {feedback.isJoinInterest && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Join Interest
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(feedback.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Anonymous
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  {feedback.status === "new" && (
                    <Button size="sm" variant="outline" onClick={() => markAsRead(feedback.id)}>
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteFeedback(feedback.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{feedback.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {feedbacks.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">No feedback received yet</p>
          <p className="text-sm text-muted-foreground">Feedback from the contact form will appear here</p>
        </div>
      )}
    </div>
  )
}
