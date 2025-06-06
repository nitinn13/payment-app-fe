"use client"

import type React from "react"

import { motion } from "framer-motion"

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  color: string
  bgColor: string
  link: string
}

interface QuickActionCardProps {
  action: QuickAction
  delay: number
}

export default function QuickActionCard({ action, delay }: QuickActionCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`${action.bgColor} hover:bg-opacity-80 rounded-xl p-6 border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-200 group backdrop-blur-sm`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div
          className={`relative w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <action.icon className="w-6 h-6" />
        </div>
      </div>
      <h4 className="font-semibold text-gray-100 mb-1 text-left">{action.title}</h4>
      <p className="text-sm text-gray-400 text-left">{action.desc}</p>
    </motion.button>
  )
}
