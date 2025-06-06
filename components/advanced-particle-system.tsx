"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
  maxLife: number
  color: string
  trail: { x: number; y: number }[]
}

export default function AdvancedParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  const createParticle = useCallback((x: number, y: number): Particle => {
    const colors = [
      "rgba(34, 211, 238, 0.8)",
      "rgba(20, 184, 166, 0.8)",
      "rgba(139, 92, 246, 0.8)",
      "rgba(59, 130, 246, 0.8)",
    ]

    return {
      x,
      y,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      life: 0,
      maxLife: Math.random() * 100 + 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
    }
  }, [])

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((particle) => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life++

      // Add to trail
      particle.trail.push({ x: particle.x, y: particle.y })
      if (particle.trail.length > 10) {
        particle.trail.shift()
      }

      // Mouse attraction
      const dx = mouseRef.current.x - particle.x
      const dy = mouseRef.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.1
        particle.vy += (dy / distance) * force * 0.1
      }

      // Apply friction
      particle.vx *= 0.99
      particle.vy *= 0.99

      // Boundary check
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8

      // Draw trail
      ctx.strokeStyle = particle.color
      ctx.lineWidth = 1
      ctx.beginPath()
      particle.trail.forEach((point, index) => {
        const alpha = index / particle.trail.length
        ctx.globalAlpha = alpha * 0.5
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          ctx.lineTo(point.x, point.y)
        }
      })
      ctx.stroke()

      // Draw particle
      const alpha = 1 - particle.life / particle.maxLife
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()

      // Draw glow
      ctx.shadowBlur = 20
      ctx.shadowColor = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      return particle.life < particle.maxLife
    })

    // Add new particles randomly
    if (Math.random() < 0.1) {
      particlesRef.current.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    // Connect nearby particles
    ctx.globalAlpha = 0.3
    ctx.strokeStyle = "rgba(34, 211, 238, 0.2)"
    ctx.lineWidth = 0.5

    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x
        const dy = particlesRef.current[i].y - particlesRef.current[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          ctx.beginPath()
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
          ctx.stroke()
        }
      }
    }

    ctx.globalAlpha = 1
    animationRef.current = requestAnimationFrame(updateParticles)
  }, [createParticle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Add particles on mouse move
      if (Math.random() < 0.3) {
        particlesRef.current.push(createParticle(e.clientX, e.clientY))
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particlesRef.current.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height))
    }

    updateParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle, updateParticles])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}
