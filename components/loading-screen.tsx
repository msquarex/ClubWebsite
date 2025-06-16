"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState, useMemo } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Pre-defined particle positions to ensure consistency between server and client
const PREDEFINED_PARTICLES = [
  { x: 87.67, y: 62.67 },
  { x: -11.56, y: -54.52 },
  { x: -8.38, y: 60.17 },
  { x: -78.54, y: -45.81 },
  { x: 32.00, y: 57.64 },
  { x: -50.97, y: 89.58 },
  { x: 42.57, y: 87.89 },
  { x: -46.24, y: 22.09 },
  { x: -99.28, y: 57.14 },
  { x: 99.37, y: -76.77 },
  { x: 34.29, y: -89.02 },
  { x: 2.84, y: -25.55 },
  { x: 60.93, y: -14.24 },
  { x: -70.51, y: 98.45 },
  { x: -93.02, y: 75.57 },
  { x: -61.34, y: 40.18 },
  { x: -17.69, y: -94.95 },
  { x: -51.01, y: 13.39 },
  { x: 6.22, y: -85.62 },
  { x: 22.97, y: 33.23 },
]

export function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Show loading screen on route changes
  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  // Only render particles on the client side
  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="text-4xl font-bold text-white mb-8"
            >
              NEXUS
            </motion.div>

            <div className="flex items-center justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-purple-500 rounded-full"
                  animate={{
                    y: ["0%", "-50%", "0%"],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
            </div>

            {PREDEFINED_PARTICLES.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{
                  x: particle.x,
                  y: particle.y,
                  scale: 0,
                }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 