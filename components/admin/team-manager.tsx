"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Plus, Edit, Trash2, User } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  role: string
  year: string
  photo: string
  bio?: string
  linkedin?: string
  github?: string
  email?: string
}

export function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [selectedYear, setSelectedYear] = useState("2024-25")
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    year: "2024-25",
    photo: "",
    bio: "",
    linkedin: "",
    github: "",
    email: "",
  })
  const { toast } = useToast()

  const availableYears = ["2024-25", "2023-24", "2022-23"]
  const availableRoles = [
    "President",
    "Vice President",
    "Technical Lead",
    "Events Coordinator",
    "Marketing Head",
    "Treasurer",
    "Secretary",
    "Member",
  ]

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockTeamMembers: TeamMember[] = [
      {
        id: "1",
        name: "Alex Johnson",
        role: "President",
        year: "2024-25",
        photo: "/placeholder.svg?height=300&width=300",
        bio: "Computer Science senior passionate about AI and machine learning.",
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson",
        email: "alex@nexusclub.edu",
      },
      {
        id: "2",
        name: "Sarah Chen",
        role: "Vice President",
        year: "2024-25",
        photo: "/placeholder.svg?height=300&width=300",
        bio: "Software Engineering student with expertise in full-stack development.",
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen",
      },
    ]
    setTeamMembers(mockTeamMembers)
  }, [])

  const filteredMembers = teamMembers.filter((member) => member.year === selectedYear)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingMember) {
      setTeamMembers((prev) =>
        prev.map((member) => (member.id === editingMember.id ? { ...member, ...formData } : member)),
      )
      toast({ title: "Team member updated successfully" })
    } else {
      const newMember: TeamMember = {
        id: Date.now().toString(),
        ...formData,
      }
      setTeamMembers((prev) => [...prev, newMember])
      toast({ title: "Team member added successfully" })
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      year: "2024-25",
      photo: "",
      bio: "",
      linkedin: "",
      github: "",
      email: "",
    })
    setEditingMember(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      year: member.year,
      photo: member.photo,
      bio: member.bio || "",
      linkedin: member.linkedin || "",
      github: member.github || "",
      email: member.email || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (memberId: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== memberId))
    toast({ title: "Team member removed successfully" })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Manager</h2>
          <p className="text-muted-foreground">Manage core team members by year</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingMember(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
                <DialogDescription>
                  {editingMember ? "Update member details" : "Add a new member to the core team"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      placeholder="Full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Select
                      value={formData.year}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, year: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableYears.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="photo">Photo URL</Label>
                    <Input
                      id="photo"
                      value={formData.photo}
                      onChange={(e) => setFormData((prev) => ({ ...prev, photo: e.target.value }))}
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Short bio or description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                      placeholder="LinkedIn profile URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                      placeholder="GitHub profile URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Email address"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingMember ? "Update Member" : "Add Member"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="border-border/50">
            <CardHeader className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {member.photo ? (
                  <Image
                    src={member.photo || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <CardDescription>{member.role}</CardDescription>
            </CardHeader>
            <CardContent>
              {member.bio && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{member.bio}</p>}
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(member.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No team members found for {selectedYear}</p>
        </div>
      )}
    </div>
  )
}
