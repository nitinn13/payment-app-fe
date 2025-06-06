"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function CircuitLines() {
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

    // Circuit properties
    const nodeCount = 15
    const nodes: { x: number; y: number; connections: number[] }[] = []

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        connections: [],
      })
    }

    // Create connections
    nodes.forEach((node, i) => {
      // Find 1-3 closest nodes to connect to
      const distances = nodes
        .map((otherNode, j) => {
          if (i === j) return { index: j, distance: Number.POSITIVE_INFINITY }
          const dx = node.x - otherNode.x
          const dy = node.y - otherNode.y
          return { index: j, distance: Math.sqrt(dx * dx + dy * dy) }
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, Math.floor(Math.random() * 3) + 1)

      distances.forEach((d) => {
        if (d.distance < 300) {
          node.connections.push(d.index)
        }
      })
    })

    // Animation properties
    let time = 0
    const speed = 0.001

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((connectionIndex) => {
          const otherNode = nodes[connectionIndex]
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Draw line
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
          ctx.strokeStyle = "rgba(34, 211, 238, 0.15)" // Cyan
          ctx.lineWidth = 1
          ctx.stroke()

          // Draw pulse
          const pulsePosition = (time * 0.5) % 1
          const pulseX = node.x + dx * pulsePosition
          const pulseY = node.y + dy * pulsePosition

          ctx.beginPath()
          ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(34, 211, 238, 0.8)" // Cyan
          ctx.fill()
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(139, 92, 246, 0.8)" // Violet
        ctx.fill()

        ctx.beginPath()
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(139, 92, 246, 0.3)" // Violet
        ctx.lineWidth = 1
        ctx.stroke()
      })

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
      animate={{ opacity: 0.8 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-0"
    />
  )
}
