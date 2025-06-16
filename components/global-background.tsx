"use client"

import { MainScene } from "@/components/main-scene"

export function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <MainScene />
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-none" />
    </div>
  )
} 