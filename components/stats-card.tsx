"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  icon: LucideIcon
  title: string
  value: string
  change: string
  positive: boolean
  delay: number
  color?: "green" | "red" | "blue" | "orange" | "purple" | "cyan"
}

export default function StatsCard({
  icon: Icon,
  title,
  value,
  change,
  positive,
  delay,
  color = "cyan",
}: StatsCardProps) {
  const colorClasses = {
    green: {
      bg: "bg-green-900/20",
      icon: "text-green-400",
      border: "border-green-800/50",
      hover: "hover:border-green-500/50",
    },
    red: {
      bg: "bg-red-900/20",
      icon: "text-red-400",
      border: "border-red-800/50",
      hover: "hover:border-red-500/50",
    },
    blue: {
      bg: "bg-blue-900/20",
      icon: "text-blue-400",
      border: "border-blue-800/50",
      hover: "hover:border-blue-500/50",
    },
    orange: {
      bg: "bg-orange-900/20",
      icon: "text-orange-400",
      border: "border-orange-800/50",
      hover: "hover:border-orange-500/50",
    },
    purple: {
      bg: "bg-purple-900/20",
      icon: "text-purple-400",
      border: "border-purple-800/50",
      hover: "hover:border-purple-500/50",
    },
    cyan: {
      bg: "bg-cyan-900/20",
      icon: "text-cyan-400",
      border: "border-cyan-800/50",
      hover: "hover:border-cyan-500/50",
    },
  }

  // Ensure we have a valid color, fallback to cyan if not found
  const colorClass = colorClasses[color] || colorClasses.cyan

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-gray-900/50 backdrop-blur-sm rounded-xl border ${colorClass.border} ${colorClass.hover} p-6 transition-all duration-300 group shadow-xl shadow-black/20`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${colorClass.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${colorClass.icon}`} />
        </div>
        <div className={`text-sm font-medium ${positive ? "text-green-400" : "text-red-400"}`}>
          {typeof change === "string" && change.includes("transactions") ? change : change}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400 text-sm uppercase tracking-wide">{title}</p>
    </motion.div>
  )
}
