"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface Node {
  x: number
  y: number
  connections: number[]
  activity: number
  targetActivity: number
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<Node[]>([])
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeNodes()
    }

    const initializeNodes = () => {
      const nodeCount = 30
      nodesRef.current = []

      for (let i = 0; i < nodeCount; i++) {
        const node: Node = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          connections: [],
          activity: 0,
          targetActivity: 0,
        }

        // Create connections to nearby nodes
        for (let j = 0; j < nodesRef.current.length; j++) {
          const dx = node.x - nodesRef.current[j].x
          const dy = node.y - nodesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 200 && Math.random() < 0.3) {
            node.connections.push(j)
            nodesRef.current[j].connections.push(i)
          }
        }

        nodesRef.current.push(node)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update node activities
      nodesRef.current.forEach((node, index) => {
        // Random activity spikes
        if (Math.random() < 0.02) {
          node.targetActivity = 1
        }

        // Decay activity
        node.targetActivity *= 0.95
        node.activity += (node.targetActivity - node.activity) * 0.1

        // Propagate activity to connected nodes
        if (node.activity > 0.5) {
          node.connections.forEach((connectedIndex) => {
            if (nodesRef.current[connectedIndex]) {
              nodesRef.current[connectedIndex].targetActivity = Math.max(
                nodesRef.current[connectedIndex].targetActivity,
                node.activity * 0.8,
              )
            }
          })
        }
      })

      // Draw connections
      nodesRef.current.forEach((node, index) => {
        node.connections.forEach((connectedIndex) => {
          const connectedNode = nodesRef.current[connectedIndex]
          if (!connectedNode) return

          const activity = Math.max(node.activity, connectedNode.activity)
          const alpha = activity * 0.5

          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`
          ctx.lineWidth = activity * 2 + 0.5
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(connectedNode.x, connectedNode.y)
          ctx.stroke()

          // Draw data packets
          if (activity > 0.3) {
            const progress = (Date.now() * 0.001) % 1
            const packetX = node.x + (connectedNode.x - node.x) * progress
            const packetY = node.y + (connectedNode.y - node.y) * progress

            ctx.fillStyle = `rgba(20, 184, 166, ${activity})`
            ctx.beginPath()
            ctx.arc(packetX, packetY, 2, 0, Math.PI * 2)
            ctx.fill()

            ctx.shadowBlur = 10
            ctx.shadowColor = "rgba(20, 184, 166, 1)"
            ctx.beginPath()
            ctx.arc(packetX, packetY, 1, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          }
        })
      })

      // Draw nodes
      nodesRef.current.forEach((node) => {
        const size = 3 + node.activity * 5
        const alpha = 0.3 + node.activity * 0.7

        // Node glow
        ctx.shadowBlur = 20
        ctx.shadowColor = `rgba(34, 211, 238, ${alpha})`
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        ctx.shadowBlur = 0
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, size * 0.3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ duration: 3 }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}
