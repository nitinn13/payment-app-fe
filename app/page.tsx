"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Shield,
  Zap,
  Globe,
  Lock,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  Wallet,
  Layers,
  Code,
  Smartphone,
  Check,
  ExternalLink,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Cpu,
  Brain,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CyberGrid from "@/components/cyber-grid"
import NeonButton from "@/components/neon-button"
import TerminalAnimation from "@/components/terminal-animation"
import PricingCard from "@/components/pricing-card"
import CircuitLines from "@/components/circuit-lines"
import HolographicCard from "@/components/holographic-card"
import AdvancedParticleSystem from "@/components/advanced-particle-system"
import NeuralNetwork from "@/components/neural-network"
import MatrixRain from "@/components/matrix-rain"
import SpotlightEffect from "@/components/spotlight-effect"
import EnergyOrb from "@/components/energy-orb"
import HologramText from "@/components/hologram-text"


export default function NeonPayApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-hidden relative">
      {/* Advanced Background Effects */}
      <AdvancedParticleSystem/>
      <NeuralNetwork/>
      <MatrixRain/>

      
      <SpotlightEffect/>

      {/* Floating Energy Orbs */}
      <motion.div
        className="fixed top-20 left-10 z-10 pointer-events-none"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
      >
        <EnergyOrb size={60} color="cyan" />
      </motion.div>

      <motion.div
        className="fixed top-1/3 right-20 z-10 pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, -15, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
      >
        <EnergyOrb size={80} color="teal" />
      </motion.div>

      <motion.div
        className="fixed bottom-1/4 left-1/4 z-10 pointer-events-none"
        animate={{
          y: [0, -25, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
      >
        <EnergyOrb size={50} color="purple" />
      </motion.div>

      {/* Enhanced Header */}
      <motion.header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "bg-black/95 backdrop-blur-2xl border-b border-cyan-900/50 shadow-2xl shadow-cyan-900/20"
            : "bg-transparent",
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <SpotlightEffect />
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center relative z-10"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 mr-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center relative overflow-hidden"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                    "0 0 40px rgba(34, 211, 238, 0.8)",
                    "0 0 20px rgba(34, 211, 238, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <Zap className="w-6 h-6 text-black relative z-10" />
              </motion.div>
              <HologramText
                text="NeonPay"
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
              />
            </motion.div>

            <nav className="hidden md:flex space-x-8 relative z-10">
              {["Products", "Developers", "Pricing", "Security"].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  whileHover={{
                    scale: 1.1,
                    color: "#22d3ee",
                    textShadow: "0 0 20px rgba(34, 211, 238, 1)",
                  }}
                  className={cn(
                    "text-sm font-medium transition-all duration-300 relative group",
                    i === 0 ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400",
                  )}
                >
                  {item}
                  {i === 0 && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-full"
                      layoutId="activeTab"
                      animate={{
                        boxShadow: [
                          "0 0 10px rgba(34, 211, 238, 0.5)",
                          "0 0 20px rgba(34, 211, 238, 1)",
                          "0 0 10px rgba(34, 211, 238, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-lg opacity-0 group-hover:opacity-100 -z-10"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-4 relative z-10"
            >
              <div className="hidden sm:flex space-x-3">
                <motion.a
                  href="/login"
                  className="text-gray-400 hover:text-cyan-400 px-6 py-2 text-sm font-medium transition-all duration-300 relative overflow-hidden group rounded-lg border border-transparent hover:border-cyan-800/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="relative z-10">Dashboard</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <NeonButton href="/signup" color="cyan">
                  <motion.span className="flex items-center" whileHover={{ x: 3 }}>
                    Start Free
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Sparkles className="ml-2 h-4 w-4" />
                    </motion.div>
                  </motion.span>
                </NeonButton>
              </div>

              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0"
                  whileHover={{ opacity: 1 }}
                />
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <CyberGrid />
        <CircuitLines />

        {/* Dynamic Background Layers */}
        <motion.div
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-black pointer-events-none"></div>

        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="space-y-10"
            >
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="inline-flex items-center px-6 py-3 rounded-full border border-cyan-800/50 bg-cyan-900/20 text-cyan-400 text-sm font-medium backdrop-blur-sm relative overflow-hidden group"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.6)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="relative z-10"
                  >
                    <Brain size={18} className="mr-3" />
                  </motion.div>
                  <span className="relative z-10">AI-Powered Payment Infrastructure</span>
                  <motion.div
                    className="ml-3 w-2 h-2 bg-green-400 rounded-full relative z-10"
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>

                <motion.div>
                  <motion.h1
                    className="text-6xl lg:text-8xl font-bold leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    <motion.span
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="block"
                    >
                      Payments
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent relative"
                      initial={{
                        opacity: 0,
                        y: 50,
                        backgroundPosition: "0% 50%",
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        opacity: { duration: 1, delay: 1 },
                        y: { duration: 1, delay: 1 },
                        backgroundPosition: {
                          duration: 8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        },
                      }}
                      style={{ backgroundSize: "300% 300%" }}
                    >
                      Beyond Reality
                      <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 blur-xl opacity-0"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </motion.span>
                  </motion.h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="text-2xl text-gray-400 leading-relaxed max-w-2xl"
                >
                  Experience the future of payments with our quantum-enhanced platform. Built for the metaverse, powered
                  by AI, secured by blockchain.
                </motion.p>

                {/* Enhanced Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                  className="grid grid-cols-3 gap-8 py-8"
                >
                  {[
                    { icon: Users, value: "1M+", label: "Active Users", color: "cyan" },
                    { icon: TrendingUp, value: "$50B", label: "Processed", color: "teal" },
                    { icon: Star, value: "99.99%", label: "Uptime", color: "purple" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="text-center relative group"
                      whileHover={{ scale: 1.1, y: -5 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.6 + i * 0.2 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-600/20 to-teal-600/20 rounded-2xl mb-4 backdrop-blur-sm border border-cyan-800/30 relative overflow-hidden"
                        whileHover={{
                          boxShadow: "0 0 40px rgba(34, 211, 238, 0.6)",
                          borderColor: "rgba(34, 211, 238, 0.8)",
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100"
                          initial={{ scale: 0, rotate: 45 }}
                          whileHover={{ scale: 1.5, rotate: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <stat.icon className="w-8 h-8 text-cyan-400 relative z-10" />
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="text-3xl font-bold text-white mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, delay: 1.8 + i * 0.2 }}
                      >
                        <HologramText text={stat.value} delay={1.8 + i * 0.2} />
                      </motion.div>

                      <div className="text-sm text-gray-400">{stat.label}</div>

                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="relative">
                  <NeonButton href="/signup" color="cyan" size="lg" className="p-4 rounded-xl">
                    <motion.span className="flex items-center text-lg " whileHover={{ x: 3 }}>
                      Enter the Future
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                          rotate: [0, 15, 0],
                        }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ExternalLink className="ml-3 h-5 w-5" />
                      </motion.div>
                    </motion.span>
                  </NeonButton>
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 blur-xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="relative">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-800/50 text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all duration-500 backdrop-blur-sm relative overflow-hidden group px-8 py-4 text-lg"
                  >
                    <span className="relative z-10 flex items-center">
                      Watch Demo
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </motion.div>
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="flex items-center space-x-10 text-sm text-gray-400"
              >
                {[
                  { icon: Shield, text: "Quantum Encrypted" },
                  { icon: Globe, text: "Multiverse Ready" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center group cursor-pointer"
                    whileHover={{
                      scale: 1.1,
                      color: "#22d3ee",
                      textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 1.5,
                      }}
                    >
                      <item.icon className="mr-3 text-cyan-400" size={18} />
                    </motion.div>
                    <span className="group-hover:text-cyan-300 transition-colors duration-300">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Enhanced Floating Elements */}
                <motion.div
                  className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 rounded-full blur-2xl"
                  animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-r from-teal-400/10 to-cyan-400/10 rounded-full blur-2xl"
                  animate={{
                    y: [0, 40, 0],
                    scale: [1, 0.8, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                />

                <div className="relative z-10">
                  <TerminalAnimation />
                </div>

                {/* Enhanced Holographic Card */}
                <motion.div
                  className="absolute -right-32 top-32"
                  initial={{ opacity: 0, scale: 0.5, rotateY: 60 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 1.5, delay: 2 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotateY: [0, 5, 0],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <HolographicCard />
                  </motion.div>
                </motion.div>

                {/* Additional Energy Effects */}
                <motion.div
                  className="absolute top-10 left-10"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                >
                  <EnergyOrb size={30} color="cyan" />
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-10"
                  animate={{
                    rotate: -360,
                    scale: [1, 0.8, 1],
                  }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, delay: 3 }}
                >
                  <EnergyOrb size={40} color="teal" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer group"
            whileHover={{ scale: 1.3 }}
          >
            <motion.div
              className="p-4 rounded-full bg-cyan-900/20 backdrop-blur-sm border border-cyan-800/30 relative overflow-hidden"
              whileHover={{
                boxShadow: "0 0 40px rgba(34, 211, 238, 0.6)",
                borderColor: "rgba(34, 211, 238, 0.8)",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-teal-400/10 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0, rotate: 45 }}
                whileHover={{ scale: 1.5, rotate: 0 }}
                transition={{ duration: 0.5 }}
              />
              <ChevronDown className="text-cyan-400 relative z-10" size={28} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Rest of sections would continue with similar enhancements... */}
      {/* For brevity, I'll include the footer and mobile menu with enhancements */}

      {/* Enhanced Trusted By Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.p
              className="text-gray-400 text-lg mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Trusted by innovative companies worldwide
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 1, delay: 0.4 }}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                whileHover={{
                  opacity: 1,
                  scale: 1.1,
                  filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))",
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              >
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent font-bold text-xl relative"
                  whileHover={{
                    textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
                  }}
                >
                  COMPANY {i}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-500/20 blur-sm opacity-0"
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.03) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-800/50 bg-cyan-900/20 text-cyan-400 text-sm font-medium backdrop-blur-sm mb-6"
            >
              <Cpu className="mr-2" size={16} />
              Developer Experience
            </motion.div>

            <h2 className="text-5xl font-bold mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
              >
                Built for Developers
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Our APIs and SDKs are designed to be simple yet powerful, helping you integrate payments quickly and scale
              effortlessly.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Developer-First API",
                description: "Well-documented APIs with native libraries for all major programming languages",
                color: "from-cyan-500 to-blue-500",
              },
              {
                icon: Layers,
                title: "Flexible Integration",
                description: "Embed checkout directly or use our hosted payment page with just a few lines of code",
                color: "from-teal-500 to-cyan-500",
              },
              {
                icon: Smartphone,
                title: "Mobile SDKs",
                description: "Native iOS and Android SDKs for seamless mobile payment experiences",
                color: "from-blue-500 to-teal-500",
              },
              {
                icon: BarChart3,
                title: "Real-time Analytics",
                description: "Comprehensive dashboard with real-time insights into your payment flows",
                color: "from-cyan-500 to-teal-500",
              },
              {
                icon: Wallet,
                title: "Multiple Payment Methods",
                description: "Support for cards, digital wallets, bank transfers, and local payment methods",
                color: "from-teal-500 to-blue-500",
              },
              {
                icon: Shield,
                title: "Fraud Protection",
                description: "Advanced AI-powered fraud detection and prevention systems",
                color: "from-blue-500 to-cyan-500",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="group relative"
              >
                <motion.div
                  className="relative p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-cyan-800/50 transition-all duration-500 overflow-hidden"
                  whileHover={{
                    boxShadow: "0 20px 40px rgba(34, 211, 238, 0.1)",
                    borderColor: "rgba(34, 211, 238, 0.3)",
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    initial={{ scale: 0, rotate: 45 }}
                    whileHover={{ scale: 1.5, rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  />

                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 relative`}
                    whileHover={{
                      rotate: 360,
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover effect lines */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of the sections with similar enhancements... */}
      {/* Security Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/5 to-black"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} transition={{ duration: 0.6 }}>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-6">
                  Enterprise-Grade Security
                </h2>
                <p className="text-xl text-gray-400 leading-relaxed">
                  We take security seriously. Our platform is built with multiple layers of protection to keep your data
                  and transactions safe.
                </p>
              </motion.div>

              <div className="space-y-4">
                {[
                  "PCI DSS Level 1 compliant",
                  "End-to-end encryption",
                  "Tokenization for sensitive data",
                  "Two-factor authentication",
                  "24/7 fraud monitoring",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                    className="flex items-center p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-cyan-800/50 transition-all duration-300 group cursor-pointer"
                  >
                    <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
                      <Check className="text-cyan-400 mr-4 flex-shrink-0" size={20} />
                    </motion.div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <NeonButton href="/security" color="cyan">
                  <motion.span className="flex items-center" whileHover={{ x: 2 }}>
                    Learn More About Security
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </NeonButton>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { icon: Shield, title: "PCI DSS Level 1", color: "from-cyan-500 to-blue-500" },
                { icon: Lock, title: "SOC 2 Type II", color: "from-teal-500 to-cyan-500" },
                { icon: Globe, title: "GDPR Compliant", color: "from-blue-500 to-teal-500" },
                { icon: Zap, title: "99.99% Uptime", color: "from-cyan-500 to-teal-500" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                  }}
                  className="group relative"
                >
                  <motion.div
                    className="p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-cyan-800/50 transition-all duration-500 text-center relative overflow-hidden"
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(34, 211, 238, 0.1)",
                    }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${badge.color} rounded-2xl mb-4 mx-auto`}
                      whileHover={{
                        rotate: 360,
                        boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <badge.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {badge.title}
                    </h3>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 70%)",
              "radial-gradient(circle at 30% 70%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)",
              "radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.03) 0%, transparent 70%)",
              "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.03) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 rounded-full border border-cyan-800/50 bg-cyan-900/20 text-cyan-400 text-sm font-medium backdrop-blur-sm mb-6"
            >
              <TrendingUp className="mr-2" size={16} />
              Transparent Pricing
            </motion.div>

            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No hidden fees, no surprises. Just pay for what you use.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="1.9%"
              description="Perfect for new businesses"
              features={[
                "2.9% + 30¢ per transaction",
                "Standard payouts (2-3 days)",
                "Basic fraud protection",
                "24/7 email support",
                "Up to $50,000 in monthly processing",
              ]}
              ctaText="Start for Free"
              popular={false}
              delay={0}
            />
            <PricingCard
              title="Growth"
              price="1.5%"
              description="For growing businesses"
              features={[
                "1.9% + 20¢ per transaction",
                "Fast payouts (1-2 days)",
                "Advanced fraud protection",
                "24/7 priority support",
                "Up to $250,000 in monthly processing",
              ]}
              ctaText="Start 14-Day Trial"
              popular={true}
              delay={0.1}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For large businesses"
              features={[
                "Custom pricing",
                "Instant payouts",
                "Custom fraud rules",
                "Dedicated account manager",
                "Unlimited processing volume",
              ]}
              ctaText="Contact Sales"
              popular={false}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse at top, rgba(34, 211, 238, 0.15), rgba(0, 0, 0, 0) 70%)",
              "radial-gradient(ellipse at bottom, rgba(20, 184, 166, 0.15), rgba(0, 0, 0, 0) 70%)",
              "radial-gradient(ellipse at top, rgba(34, 211, 238, 0.15), rgba(0, 0, 0, 0) 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-teal-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            />

            <h2 className="text-5xl md:text-6xl font-bold mb-8 relative">
              Ready to{" "}
              <motion.span
                className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                style={{ backgroundSize: "200% 200%" }}
              >
                revolutionize
              </motion.span>{" "}
              your payments?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-12 leading-relaxed"
          >
            Join thousands of businesses that trust NeonPay for their payment processing needs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <NeonButton href="/signup" color="cyan" size="lg">
                <motion.span className="flex items-center" whileHover={{ x: 2 }}>
                  Create Free Account
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </motion.div>
                </motion.span>
              </NeonButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-800/50 text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group px-8 py-4 text-lg"
              >
                <span className="relative z-10">Schedule Demo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black border-t border-cyan-900/30 py-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div className="flex items-center mb-6" whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="w-8 h-8 mr-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-lg flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(34, 211, 238, 0.3)",
                      "0 0 30px rgba(34, 211, 238, 0.6)",
                      "0 0 20px rgba(34, 211, 238, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Zap className="w-5 h-5 text-black" />
                </motion.div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                  NeonPay
                </div>
              </motion.div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Next-generation payment infrastructure for the digital economy
              </p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                    whileHover={{
                      scale: 1.2,
                      color: "#22d3ee",
                      textShadow: "0 0 8px rgba(34, 211, 238, 0.8)",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    {social}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Documentation", "API Reference"],
              },
              {
                title: "Company",
                links: ["About", "Customers", "Careers", "Blog", "Press"],
              },
              {
                title: "Resources",
                links: ["Support", "Contact", "Privacy", "Terms", "Security"],
              },
            ].map((column, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <h3 className="font-semibold text-white mb-6 text-lg">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, j) => (
                    <motion.li key={j}>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative group"
                        whileHover={{ x: 4 }}
                      >
                        {link}
                        <motion.div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-500 group-hover:w-full transition-all duration-300" />
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-cyan-900/30 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-500 text-sm">© 2025 NeonPay, Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-gray-500 hover:text-cyan-400 text-sm transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <AdvancedParticleSystem />
            </motion.div>

            <motion.div
              initial={{ x: "100%", rotateY: 45 }}
              animate={{ x: 0, rotateY: 0 }}
              exit={{ x: "100%", rotateY: 45 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className=" right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-2xl border-l border-cyan-900/50 shadow-2xl relative overflow-hidden"
            >
              <SpotlightEffect />

              <div className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-10">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      className="w-10 h-10 mr-3 bg-gradient-to-r from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center relative overflow-hidden"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(34, 211, 238, 0.5)",
                          "0 0 40px rgba(34, 211, 238, 0.8)",
                          "0 0 20px rgba(34, 211, 238, 0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      <Zap className="w-6 h-6 text-black relative z-10" />
                    </motion.div>
                    <HologramText
                      text="NeonPay"
                      className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
                      delay={0.3}
                    />
                  </motion.div>

                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 relative"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-cyan-400/20 rounded-lg opacity-0"
                      whileHover={{ opacity: 1, scale: 1.5 }}
                    />
                    <X size={24} className="relative z-10" />
                  </motion.button>
                </div>

                <nav className="space-y-6">
                  {["Products", "Developers", "Pricing", "Security"].map((item, i) => (
                    <motion.button
                      key={item}
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 * i + 0.4, duration: 0.5 }}
                      whileHover={{
                        scale: 1.05,
                        x: 10,
                        backgroundColor: "rgba(34, 211, 238, 0.1)",
                      }}
                      className={cn(
                        "block w-full text-left py-5 px-8 rounded-2xl transition-all duration-500 relative overflow-hidden group",
                        i === 0
                          ? "bg-cyan-900/30 text-cyan-400 border border-cyan-500/50"
                          : "text-gray-400 hover:bg-cyan-900/20 hover:text-cyan-400 border border-transparent hover:border-cyan-800/30",
                      )}
                    >
                      <span className="relative z-10 text-lg font-medium">{item}</span>
                      {i === 0 && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-teal-600/20"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                      <motion.div
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        <ArrowRight size={18} />
                      </motion.div>
                    </motion.button>
                  ))}

                  <div className="pt-8 border-t border-gray-800/50">
                    <div className="space-y-4">
                      <motion.a
                        href="/login"
                        className="block w-full text-gray-400 hover:text-cyan-400 py-4 px-8 text-center transition-all duration-500 rounded-2xl hover:bg-cyan-900/20 border border-transparent hover:border-cyan-800/30 relative overflow-hidden group"
                        onClick={() => setMobileMenuOpen(false)}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <span className="relative z-10 text-lg">Dashboard</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-teal-400/5 opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.a>

                      <motion.a
                        href="/signup"
                        className="block w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-5 px-8 rounded-2xl font-semibold text-center transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 relative overflow-hidden group"
                        onClick={() => setMobileMenuOpen(false)}
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 text-lg flex items-center justify-center">
                          Start Free
                          <motion.div
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Sparkles className="ml-2 h-5 w-5" />
                          </motion.div>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                      </motion.a>
                    </div>
                  </div>
                </nav>
              </div>

              {/* Mobile menu energy orbs */}
              <motion.div
                className="absolute top-20 right-10"
                animate={{
                  y: [0, -15, 0],
                  rotate: 360,
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              >
                <EnergyOrb size={40} color="cyan" />
              </motion.div>

              <motion.div
                className="absolute bottom-32 left-10"
                animate={{
                  y: [0, 20, 0],
                  rotate: -360,
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
              >
                <EnergyOrb size={30} color="teal" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
