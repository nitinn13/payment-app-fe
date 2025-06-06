"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Grid properties
    const gridSize = 50
    const lineWidth = 0.5
    const primaryColor = "rgba(34, 211, 238, 0.2)" // Cyan
    const secondaryColor = "rgba(139, 92, 246, 0.1)" // Violet

    // Animation properties
    let time = 0
    const speed = 0.0005

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        const waveOffset = Math.sin(time + y * 0.01) * 5

        ctx.beginPath()
        ctx.moveTo(0, y + waveOffset)
        ctx.lineTo(canvas.width, y + waveOffset)

        const opacity = 0.1 + Math.sin(time + y * 0.01) * 0.05
        ctx.strokeStyle = y % (gridSize * 2) === 0 ? primaryColor : `rgba(34, 211, 238, ${opacity})`
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        const waveOffset = Math.sin(time + x * 0.01) * 5

        ctx.beginPath()
        ctx.moveTo(x + waveOffset, 0)
        ctx.lineTo(x + waveOffset, canvas.height)

        const opacity = 0.1 + Math.sin(time + x * 0.01) * 0.05
        ctx.strokeStyle = x % (gridSize * 2) === 0 ? secondaryColor : `rgba(139, 92, 246, ${opacity})`
        ctx.lineWidth = lineWidth
        ctx.stroke()
      }

      time += speed
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-0"
    />
  )
}
