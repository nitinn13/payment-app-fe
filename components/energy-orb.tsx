"use client"

import { motion } from "framer-motion"

interface EnergyOrbProps {
  size?: number
  color?: string
  intensity?: number
  className?: string
}

export default function EnergyOrb({ size = 100, color = "cyan", intensity = 1, className = "" }: EnergyOrbProps) {
  const colorMap = {
    cyan: "rgba(34, 211, 238, 0.6)",
    teal: "rgba(20, 184, 166, 0.6)",
    purple: "rgba(139, 92, 246, 0.6)",
    blue: "rgba(59, 130, 246, 0.6)",
  }

  return (
    <div className={`relative ${className}`}>
      {/* Core orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${colorMap[color as keyof typeof colorMap]} 0%, transparent 70%)`,
          filter: "blur(10px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Energy rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size + i * 20,
            height: size + i * 20,
            left: -(i * 10),
            top: -(i * 10),
            borderColor: colorMap[color as keyof typeof colorMap],
            borderWidth: 1,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: 360,
          }}
          transition={{
            duration: 3 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Energy particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: colorMap[color as keyof typeof colorMap],
            left: size / 2,
            top: size / 2,
          }}
          animate={{
            x: [0, Math.cos((i * 45 * Math.PI) / 180) * (size / 2 + 20)],
            y: [0, Math.sin((i * 45 * Math.PI) / 180) * (size / 2 + 20)],
            opacity: [1, 0],
            scale: [1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
