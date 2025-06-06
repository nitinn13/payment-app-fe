"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface SecurityBadgeProps {
  icon: LucideIcon
  title: string
  delay?: number
}

export default function SecurityBadge({ icon: Icon, title, delay = 0 }: SecurityBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-black border border-cyan-800/50 rounded-xl p-6 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-cyan-900/20 flex items-center justify-center mb-4">
          <Icon className="text-cyan-400" size={32} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full mt-2"></div>
      </div>
    </motion.div>
  )
}
