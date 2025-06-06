"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      }
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className="relative">
      {/* Main text */}
      <span className={cn(className)}>{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className={cn("absolute left-0 top-0 text-cyan-400 opacity-70", className)}
            style={{ clipPath: "inset(0 0 0 0)" }}
            animate={{
              x: [0, -2, 1, 0],
              y: [0, 1, -1, 0],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {text}
          </motion.span>

          <motion.span
            className={cn("absolute left-0 top-0 text-violet-400 opacity-70", className)}
            style={{ clipPath: "inset(0 0 0 0)" }}
            animate={{
              x: [0, 2, -1, 0],
              y: [0, -1, 1, 0],
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  )
}
