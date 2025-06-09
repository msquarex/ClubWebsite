"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote, PenTool } from "lucide-react"
import Image from "next/image"

export function FromTheDesk() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* From the President's Desk */}
          <Card className="backdrop-panel border-primary/20 glow-effect">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Quote className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold gradient-text">From the President's Desk</h3>
              </div>

              <div className="flex items-start gap-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image src="/placeholder.svg?height=80&width=80" alt="President" fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <blockquote className="text-gray-300 leading-relaxed mb-4">
                    "Welcome to Nexus Club! As we embark on another year of innovation and collaboration, I'm excited to
                    see our community grow stronger. Together, we're not just learning technology—we're shaping the
                    future of it."
                  </blockquote>

                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-white">Alex Johnson</p>
                      <p className="text-sm text-primary">President, Nexus Club</p>
                    </div>
                    <PenTool className="h-4 w-4 text-primary ml-auto" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* From the Board */}
          <Card className="backdrop-panel border-primary/20 glow-effect">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Quote className="h-6 w-6 text-primary" />
                <h3 className="text-2xl font-bold gradient-text">From the Board</h3>
              </div>

              <div className="space-y-6">
                <blockquote className="text-gray-300 leading-relaxed">
                  "This year marks a new chapter for Nexus Club. With cutting-edge workshops, industry partnerships, and
                  innovative projects, we're committed to providing our members with unparalleled opportunities for
                  growth and learning."
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30"
                      >
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${i}`}
                          alt={`Board member ${i}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-white">The Board</p>
                    <p className="text-sm text-primary">Nexus Club Leadership</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
