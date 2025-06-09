"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight, User, Crown, Shield, Users, Briefcase } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  position: string
  photo?: string
  level: number
}

interface TeamSection {
  id: string
  title: string
  icon: React.ReactNode
  members: TeamMember[]
  subsections?: TeamSection[]
  expanded?: boolean
}

export function CoreTeamTree() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["board"]))

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const teamStructure: TeamSection[] = [
    {
      id: "board",
      title: "Board Level",
      icon: <Crown className="h-5 w-5 text-yellow-500" />,
      members: [
        {
          id: "1",
          name: "Alex Johnson",
          position: "President",
          photo: "/placeholder.svg?height=80&width=80",
          level: 0,
        },
        {
          id: "2",
          name: "Sarah Chen",
          position: "Vice President",
          photo: "/placeholder.svg?height=80&width=80",
          level: 0,
        },
        {
          id: "3",
          name: "Michael Rodriguez",
          position: "General Secretary",
          photo: "/placeholder.svg?height=80&width=80",
          level: 0,
        },
        {
          id: "4",
          name: "Emily Davis",
          position: "Joint Secretary",
          photo: "/placeholder.svg?height=80&width=80",
          level: 0,
        },
      ],
    },
    {
      id: "technical",
      title: "Technical Division",
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      members: [
        {
          id: "5",
          name: "David Kim",
          position: "Overall Technical Lead",
          photo: "/placeholder.svg?height=80&width=80",
          level: 1,
        },
      ],
      subsections: [
        {
          id: "frontend",
          title: "Frontend Team",
          icon: <Users className="h-4 w-4 text-green-500" />,
          members: [
            {
              id: "6",
              name: "Lisa Wang",
              position: "Frontend Lead",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
            {
              id: "7",
              name: "James Wilson",
              position: "UI/UX Designer",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
          ],
        },
        {
          id: "backend",
          title: "Backend Team",
          icon: <Users className="h-4 w-4 text-purple-500" />,
          members: [
            {
              id: "8",
              name: "Maria Garcia",
              position: "Backend Lead",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
            {
              id: "9",
              name: "Robert Brown",
              position: "Database Specialist",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
          ],
        },
        {
          id: "aiml",
          title: "AI/ML Team",
          icon: <Users className="h-4 w-4 text-pink-500" />,
          members: [
            {
              id: "10",
              name: "Jennifer Lee",
              position: "AI/ML Lead",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
            {
              id: "11",
              name: "Thomas Anderson",
              position: "Data Scientist",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
          ],
        },
      ],
    },
    {
      id: "organizing",
      title: "Organizing Committee",
      icon: <Briefcase className="h-5 w-5 text-orange-500" />,
      members: [
        {
          id: "12",
          name: "Amanda Taylor",
          position: "Overall Head",
          photo: "/placeholder.svg?height=80&width=80",
          level: 1,
        },
      ],
      subsections: [
        {
          id: "management",
          title: "Management",
          icon: <Users className="h-4 w-4 text-red-500" />,
          members: [
            {
              id: "13",
              name: "Kevin Zhang",
              position: "Management Head",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
          ],
        },
        {
          id: "marketing",
          title: "Marketing",
          icon: <Users className="h-4 w-4 text-cyan-500" />,
          members: [
            {
              id: "14",
              name: "Sophie Miller",
              position: "Marketing Head",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
          ],
        },
        {
          id: "sponsorship",
          title: "Sponsorship",
          icon: <Users className="h-4 w-4 text-yellow-500" />,
          members: [
            {
              id: "15",
              name: "Daniel Park",
              position: "Sponsorship Head",
              photo: "/placeholder.svg?height=80&width=80",
              level: 2,
            },
          ],
        },
      ],
    },
  ]

  const MemberCard = ({ member }: { member: TeamMember }) => (
    <Card className="backdrop-panel border-primary/20 glow-hover cursor-pointer">
      <CardContent className="p-4 text-center">
        <div className="relative w-16 h-16 mx-auto mb-3">
          {member.photo ? (
            <Image
              src={member.photo || "/placeholder.svg"}
              alt={member.name}
              fill
              className="object-cover rounded-full"
            />
          ) : (
            <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          )}
        </div>
        <h4 className="font-semibold text-white text-sm mb-1">{member.name}</h4>
        <p className="text-xs text-primary">{member.position}</p>
      </CardContent>
    </Card>
  )

  const renderSection = (section: TeamSection, depth = 0) => {
    const isExpanded = expandedSections.has(section.id)
    const hasSubsections = section.subsections && section.subsections.length > 0

    return (
      <div key={section.id} className={`${depth > 0 ? "ml-8" : ""}`}>
        <div className="flex items-center gap-3 mb-4">
          {hasSubsections && (
            <Button variant="ghost" size="sm" onClick={() => toggleSection(section.id)} className="p-1 h-auto">
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          {section.icon}
          <h3 className={`font-bold gradient-text ${depth === 0 ? "text-xl" : "text-lg"}`}>{section.title}</h3>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ${depth > 0 ? "ml-8" : ""}`}>
          {section.members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {hasSubsections && isExpanded && (
          <div className="space-y-6">
            {section.subsections!.map((subsection) => renderSection(subsection, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section id="team" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Core Team Structure</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated individuals leading Nexus Club towards innovation and excellence
          </p>
        </div>

        <div className="backdrop-panel rounded-2xl p-8 glow-effect">
          <div className="space-y-12">{teamStructure.map((section) => renderSection(section))}</div>
        </div>
      </div>
    </section>
  )
}
