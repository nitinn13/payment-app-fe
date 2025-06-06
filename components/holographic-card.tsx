"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, CreditCard } from "lucide-react"

export default function HolographicCard() {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [glowX, setGlowX] = useState(50)
  const [glowY, setGlowY] = useState(50)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    // Calculate mouse position relative to card (0 to 1)
    const relX = (e.clientX - rect.left) / rect.width
    const relY = (e.clientY - rect.top) / rect.height

    // Set rotation based on mouse position (-15 to 15 degrees)
    setRotateX((relY - 0.5) * -20)
    setRotateY((relX - 0.5) * 20)

    // Set mouse position for glow effect
    setMouseX(relX)
    setMouseY(relY)

    // Update glow position
    setGlowX(relX * 100)
    setGlowY(relY * 100)
  }

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves
    setRotateX(0)
    setRotateY(0)
  }

  // Subtle floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      if (!mouseX && !mouseY) {
        setRotateX((prev) => prev + Math.sin(Date.now() / 1000) * 0.5)
        setRotateY((prev) => prev + Math.cos(Date.now() / 1000) * 0.5)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        perspective: "1000px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          backgroundImage: `
            radial-gradient(circle at ${glowX}% ${glowY}%, rgba(139, 92, 246, 0.8), rgba(34, 211, 238, 0.6), rgba(0, 0, 0, 0.8))
          `,
          boxShadow: `
            0 0 30px rgba(139, 92, 246, 0.3),
            0 0 60px rgba(34, 211, 238, 0.2)
          `,
        }}
      >
        {/* Holographic overlay */}
        <div
          className="absolute inset-0 z-10 opacity-30"
          style={{
            backgroundImage: "url('/placeholder.svg?height=400&width=400')",
            backgroundSize: "200% 200%",
            backgroundPosition: `${glowX}% ${glowY}%`,
            mixBlendMode: "overlay",
          }}
        />

        {/* Card content */}
        <div className="relative z-20 p-8 backdrop-blur-sm bg-black/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Quick Transfer</h3>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-6 mb-6">
            <div className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
              <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center text-black font-bold">
                N
              </div>
              <div>
                <div className="font-semibold text-white">nitin@upi</div>
                <div className="text-sm text-gray-300">Last sent: ₹2,500</div>
              </div>
            </div>

            <div className="text-center py-4">
              <motion.div
                className="text-3xl font-bold text-white mb-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                ₹5,000
              </motion.div>
              <div className="text-sm text-gray-300">Amount to send</div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-4">
              <div className="flex items-center">
                <CreditCard className="mr-1" size={12} />
                **** 4289
              </div>
              <div className="flex items-center">
                <Zap className="mr-1" size={12} />
                Instant
              </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/25 transform hover:scale-105 transition-all duration-200">
            Send Money
          </button>

          {/* Circuit pattern overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: "url('/placeholder.svg?height=400&width=400')",
              backgroundSize: "cover",
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* Reflective edge */}
        <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none"></div>
      </motion.div>

      {/* Card reflection */}
      <div
        className="w-full h-20 mt-2 rounded-3xl opacity-30 blur-sm"
        style={{
          background: "linear-gradient(to bottom, rgba(139, 92, 246, 0.3), transparent)",
          transform: "rotateX(180deg) translateY(40px) scale(0.9, 0.4)",
        }}
      />
    </motion.div>
  )
}
