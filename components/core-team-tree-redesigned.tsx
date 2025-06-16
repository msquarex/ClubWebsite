"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Crown, User, Linkedin, Mail, Users, Code, Palette, MessageSquare, Briefcase } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  id: string
  name: string
  position: string
  photo?: string
  bio?: string
  email?: string
  linkedin?: string
  department?: string
}

interface Department {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  lead?: TeamMember
  members: TeamMember[]
  subdepartments?: Department[]
}

export function CoreTeamTreeRedesigned() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)

  // Board Members
  const boardMembers: TeamMember[] = [
    {
      id: "1",
      name: "Alex Johnson",
      position: "President",
      photo: "/placeholder.svg?height=120&width=120",
      bio: "Computer Science senior passionate about AI and machine learning. Leading Nexus Club towards innovation and excellence.",
      email: "alex@nexusclub.edu",
      linkedin: "https://linkedin.com/in/alexjohnson",
    },
    {
      id: "2",
      name: "Sarah Chen",
      position: "Vice President",
      photo: "/placeholder.svg?height=120&width=120",
      bio: "Software Engineering student with expertise in full-stack development and project management.",
      email: "sarah@nexusclub.edu",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      position: "General Secretary",
      photo: "/placeholder.svg?height=120&width=120",
      bio: "Cybersecurity enthusiast and competitive programmer. Manages club operations and documentation.",
      email: "michael@nexusclub.edu",
      linkedin: "https://linkedin.com/in/mrodriguez",
    },
    {
      id: "4",
      name: "Emily Davis",
      position: "Joint Secretary",
      photo: "/placeholder.svg?height=120&width=120",
      bio: "Data Science major with a passion for organizing tech events and community building.",
      email: "emily@nexusclub.edu",
      linkedin: "https://linkedin.com/in/emilydavis",
    },
  ]

  // Departments Structure
  const departments: Department[] = [
    {
      id: "frontend",
      name: "Frontend",
      icon: <Code className="h-6 w-6" />,
      color: "green",
      lead: {
        id: "5",
        name: "Lisa Wang",
        position: "Frontend Lead",
        photo: "/placeholder.svg?height=80&width=80",
        bio: "React and Vue.js specialist with 3+ years of experience.",
        linkedin: "https://linkedin.com/in/lisawang",
      },
      members: [
        {
          id: "6",
          name: "James Wilson",
          position: "UI Developer",
          linkedin: "https://linkedin.com/in/jameswilson",
        },
        {
          id: "7",
          name: "Anna Kim",
          position: "Frontend Developer",
          linkedin: "https://linkedin.com/in/annakim",
        },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      icon: <Code className="h-6 w-6" />,
      color: "purple",
      lead: {
        id: "8",
        name: "David Park",
        position: "Backend Lead",
        photo: "/placeholder.svg?height=80&width=80",
        bio: "Node.js and Python expert specializing in scalable architectures.",
        linkedin: "https://linkedin.com/in/davidpark",
      },
      members: [
        {
          id: "9",
          name: "Maria Garcia",
          position: "API Developer",
          linkedin: "https://linkedin.com/in/mariagarcia",
        },
        {
          id: "10",
          name: "Robert Brown",
          position: "Database Specialist",
          linkedin: "https://linkedin.com/in/robertbrown",
        },
      ],
    },
    {
      id: "aiml",
      name: "AI/ML",
      icon: <Code className="h-6 w-6" />,
      color: "pink",
      lead: {
        id: "11",
        name: "Jennifer Lee",
        position: "AI/ML Lead",
        photo: "/placeholder.svg?height=80&width=80",
        bio: "Machine Learning researcher with focus on computer vision and NLP.",
        linkedin: "https://linkedin.com/in/jenniferlee",
      },
      members: [
        {
          id: "12",
          name: "Thomas Anderson",
          position: "Data Scientist",
          linkedin: "https://linkedin.com/in/thomasanderson",
        },
        {
          id: "13",
          name: "Sophie Miller",
          position: "ML Engineer",
          linkedin: "https://linkedin.com/in/sophiemiller",
        },
      ],
    },
    {
      id: "techleads",
      name: "Tech Leads",
      icon: <Crown className="h-6 w-6" />,
      color: "yellow",
      lead: {
        id: "14",
        name: "Kevin Zhang",
        position: "Overall Tech Lead",
        photo: "/placeholder.svg?height=80&width=80",
        bio: "Full-stack developer and technical mentor for all teams.",
        linkedin: "https://linkedin.com/in/kevinzhang",
      },
      members: [
        {
          id: "15",
          name: "Rachel Green",
          position: "Senior Developer",
          linkedin: "https://linkedin.com/in/rachelgreen",
        },
      ],
    },
    {
      id: "design",
      name: "Design Team",
      icon: <Palette className="h-6 w-6" />,
      color: "orange",
      lead: {
        id: "16",
        name: "Amanda Taylor",
        position: "Design Lead",
        photo: "/placeholder.svg?height=80&width=80",
        bio: "UI/UX designer with expertise in user-centered design and prototyping.",
        linkedin: "https://linkedin.com/in/amandataylor",
      },
      members: [
        {
          id: "17",
          name: "Chris Johnson",
          position: "UI Designer",
          linkedin: "https://linkedin.com/in/chrisjohnson",
        },
        {
          id: "18",
          name: "Maya Patel",
          position: "UX Researcher",
          linkedin: "https://linkedin.com/in/mayapatel",
        },
        {
          id: "19",
          name: "Daniel Kim",
          position: "Graphic Designer",
          linkedin: "https://linkedin.com/in/danielkim",
        },
      ],
    },
    {
      id: "social",
      name: "Social Media Team",
      icon: <MessageSquare className="h-6 w-6" />,
      color: "cyan",
      lead: {
        id: "20",
        name: "Isabella Rodriguez",
        position: "Social Media Lead",
        photo: "/placeholder.svg?height=80&width=80",
        bio: "Digital marketing specialist with expertise in content strategy and community engagement.",
        linkedin: "https://linkedin.com/in/isabellarodriguez",
      },
      members: [
        {
          id: "21",
          name: "Tyler Wilson",
          position: "Content Creator",
          linkedin: "https://linkedin.com/in/tylerwilson",
        },
        {
          id: "22",
          name: "Zoe Chen",
          position: "Community Manager",
          linkedin: "https://linkedin.com/in/zoechen",
        },
        {
          id: "23",
          name: "Alex Thompson",
          position: "Video Editor",
          linkedin: "https://linkedin.com/in/alexthompson",
        },
      ],
    },
    {
      id: "organizing",
      name: "Organizing Committee",
      icon: <Briefcase className="h-6 w-6" />,
      color: "red",
      subdepartments: [
        {
          id: "leads",
          name: "Leads",
          icon: <Crown className="h-5 w-5" />,
          color: "red",
          lead: {
            id: "24",
            name: "Nathan Brown",
            position: "Overall Head",
            photo: "/placeholder.svg?height=80&width=80",
            bio: "Event management expert with 4+ years of experience organizing tech conferences.",
            linkedin: "https://linkedin.com/in/nathanbrown",
          },
          members: [
            {
              id: "25",
              name: "Grace Liu",
              position: "Deputy Head",
              linkedin: "https://linkedin.com/in/graceliu",
            },
          ],
        },
        {
          id: "management",
          name: "Management",
          icon: <Users className="h-5 w-5" />,
          color: "indigo",
          lead: {
            id: "26",
            name: "Oliver Davis",
            position: "Management Head",
            photo: "/placeholder.svg?height=80&width=80",
            bio: "Operations specialist focused on logistics and team coordination.",
            linkedin: "https://linkedin.com/in/oliverdavis",
          },
          members: [
            {
              id: "27",
              name: "Emma Wilson",
              position: "Operations Coordinator",
              linkedin: "https://linkedin.com/in/emmawilson",
            },
            {
              id: "28",
              name: "Lucas Garcia",
              position: "Logistics Manager",
              linkedin: "https://linkedin.com/in/lucasgarcia",
            },
          ],
        },
        {
          id: "marketing",
          name: "Marketing",
          icon: <MessageSquare className="h-5 w-5" />,
          color: "green",
          lead: {
            id: "29",
            name: "Sophia Martinez",
            position: "Marketing Head",
            photo: "/placeholder.svg?height=80&width=80",
            bio: "Marketing strategist with expertise in digital campaigns and brand management.",
            linkedin: "https://linkedin.com/in/sophiamartinez",
          },
          members: [
            {
              id: "30",
              name: "Ethan Johnson",
              position: "Campaign Manager",
              linkedin: "https://linkedin.com/in/ethanjohnson",
            },
            {
              id: "31",
              name: "Ava Taylor",
              position: "Brand Coordinator",
              linkedin: "https://linkedin.com/in/avataylor",
            },
          ],
        },
        {
          id: "sponsorship",
          name: "Sponsorship/Outreach",
          icon: <Briefcase className="h-5 w-5" />,
          color: "purple",
          lead: {
            id: "32",
            name: "Mason Lee",
            position: "Sponsorship Head",
            photo: "/placeholder.svg?height=80&width=80",
            bio: "Business development specialist with strong industry connections.",
            linkedin: "https://linkedin.com/in/masonlee",
          },
          members: [
            {
              id: "33",
              name: "Chloe Anderson",
              position: "Partnership Coordinator",
              linkedin: "https://linkedin.com/in/chloeanderson",
            },
            {
              id: "34",
              name: "Ryan Thompson",
              position: "Outreach Specialist",
              linkedin: "https://linkedin.com/in/ryanthompson",
            },
          ],
        },
      ],
      members: [],
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "border-blue-500/30 hover:border-blue-500/50 text-blue-400",
      green: "border-green-500/30 hover:border-green-500/50 text-green-400",
      purple: "border-purple-500/30 hover:border-purple-500/50 text-purple-400",
      pink: "border-pink-500/30 hover:border-pink-500/50 text-pink-400",
      yellow: "border-yellow-500/30 hover:border-yellow-500/50 text-yellow-400",
      orange: "border-orange-500/30 hover:border-orange-500/50 text-orange-400",
      cyan: "border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400",
      red: "border-red-500/30 hover:border-red-500/50 text-red-400",
      indigo: "border-indigo-500/30 hover:border-indigo-500/50 text-indigo-400",
    }
    return colorMap[color] || "border-primary/30 hover:border-primary/50 text-primary"
  }

  const MemberCard = ({ member, onClick }: { member: TeamMember; onClick: () => void }) => (
    <Card className="backdrop-panel border-primary/20 glow-hover cursor-pointer" onClick={onClick}>
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

  const DepartmentCard = ({ department }: { department: Department }) => (
    <Card
      className={`backdrop-panel ${getColorClasses(department.color)} glow-hover cursor-pointer transition-all duration-300`}
      onClick={() => setSelectedDepartment(department)}
    >
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">{department.icon}</div>
        <h3 className="font-bold text-white text-lg mb-2">{department.name}</h3>
        <p className="text-xs text-gray-400">
          {department.subdepartments
            ? `${department.subdepartments.length} departments`
            : `${department.members.length + (department.lead ? 1 : 0)} members`}
        </p>
      </CardContent>
    </Card>
  )

  return (
    <section id="team" className="py-12 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4">Core Team Structure</h2>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
            Meet the dedicated individuals leading Nexus Club towards innovation and excellence
          </p>
        </div>

        <div className="backdrop-panel rounded-2xl p-4 lg:p-8 glow-effect">
          {/* Board Members - Main Center Node */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-6 w-6 text-yellow-500 mr-2" />
              <h3 className="text-xl lg:text-2xl font-bold gradient-text">Board Members</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {boardMembers.map((member) => (
                <MemberCard key={member.id} member={member} onClick={() => setSelectedMember(member)} />
              ))}
            </div>
          </div>

          {/* Departments Grid */}
          <div className="responsive-grid gap-4 lg:gap-6">
            {departments.map((department) => (
              <DepartmentCard key={department.id} department={department} />
            ))}
          </div>
        </div>

        {/* Member Info Modal */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="modal-content max-w-md">
            <DialogHeader>
              <DialogTitle className="gradient-text">Team Member</DialogTitle>
            </DialogHeader>
            {selectedMember && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    {selectedMember.photo ? (
                      <Image
                        src={selectedMember.photo || "/placeholder.svg"}
                        alt={selectedMember.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                  <Badge variant="outline" className="border-primary text-primary mt-2">
                    {selectedMember.position}
                  </Badge>
                </div>

                {selectedMember.bio && <p className="text-gray-300 text-sm leading-relaxed">{selectedMember.bio}</p>}

                <div className="flex gap-3 justify-center">
                  {selectedMember.email && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${selectedMember.email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </a>
                    </Button>
                  )}
                  {selectedMember.linkedin && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Department Modal */}
        <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
          <DialogContent className="modal-content max-w-4xl max-h-[85vh] flex flex-col">
            {selectedDepartment && (
              <div className="flex flex-col h-full">
                {/* Fixed Header */}
                <div className="flex-shrink-0 pb-4 border-b border-primary/20">
                  <DialogTitle className="gradient-text flex items-center gap-2">
                    {selectedDepartment?.icon}
                    {selectedDepartment?.name}
                  </DialogTitle>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar mt-4 space-y-6">
                  {/* Department Lead - Sticky */}
                  {selectedDepartment.lead && (
                    <div className="sticky top-0 bg-gradient-to-b from-[rgba(15,15,35,0.95)] to-[rgba(15,15,35,0.8)] backdrop-blur-sm z-10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-4">Department Lead</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <MemberCard
                          member={selectedDepartment.lead}
                          onClick={() => setSelectedMember(selectedDepartment.lead!)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Rest of the content remains the same but now scrollable */}
                  {/* ... existing subdepartments and members code ... */}
                  {/* Subdepartments */}
                  {selectedDepartment.subdepartments && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Departments</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedDepartment.subdepartments.map((subdept) => (
                          <Card key={subdept.id} className={`backdrop-panel ${getColorClasses(subdept.color)}`}>
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                {subdept.icon}
                                <h5 className="font-semibold text-white">{subdept.name}</h5>
                              </div>
                              {subdept.lead && (
                                <div className="mb-3">
                                  <p className="text-xs text-gray-400 mb-2">Lead:</p>
                                  <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
                                    onClick={() => setSelectedMember(subdept.lead!)}
                                  >
                                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                                      <User className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm text-white">{subdept.lead.name}</span>
                                  </div>
                                </div>
                              )}
                              <div className="space-y-2">
                                <p className="text-xs text-gray-400">Members:</p>
                                {subdept.members.map((member) => (
                                  <div key={member.id} className="flex items-center justify-between">
                                    <span className="text-sm text-white">{member.name}</span>
                                    {member.linkedin && (
                                      <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80"
                                      >
                                        <Linkedin className="h-4 w-4" />
                                      </a>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Regular Members */}
                  {selectedDepartment.members.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Team Members</h4>
                      <div className="space-y-2">
                        {selectedDepartment.members.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-3 backdrop-panel rounded-lg"
                          >
                            <div>
                              <span className="text-white font-medium">{member.name}</span>
                              {member.position && <p className="text-sm text-gray-400">{member.position}</p>}
                            </div>
                            {member.linkedin && (
                              <a
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80"
                              >
                                <Linkedin className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(139, 92, 246, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </section>
  )
}
