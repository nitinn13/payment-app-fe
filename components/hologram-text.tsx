"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface HologramTextProps {
  text: string
  className?: string
  delay?: number
}

export default function HologramText({ text, className = "", delay = 0 }: HologramTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      50 + delay * 1000,
    )

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay])

  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
      >
        {displayText}
        <motion.span
          className="inline-block w-0.5 h-6 bg-cyan-400 ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      {/* Hologram layers */}
      <motion.div
        className="absolute inset-0 text-cyan-400 opacity-30"
        animate={{
          x: [0, 1, -1, 0],
          y: [0, -1, 1, 0],
        }}
        transition={{
          duration: 0.1,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {displayText}
      </motion.div>

      <motion.div
        className="absolute inset-0 text-teal-400 opacity-20"
        animate={{
          x: [0, -1, 1, 0],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        {displayText}
      </motion.div>

      {/* Scan lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(34, 211, 238, 0.03) 2px,
            rgba(34, 211, 238, 0.03) 4px
          )`,
        }}
        animate={{ y: [0, -4] }}
        transition={{
          duration: 0.1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}
