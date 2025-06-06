"use client"

import { motion } from "framer-motion"
import { Eye, EyeOff, Plus, TrendingUp } from "lucide-react"
import NeonButton from "./neon-button"

interface BalanceCardProps {
  userName: string
  balance: number
  balanceVisible: boolean
  onToggleVisibility: () => void
}

export default function BalanceCard({ userName, balance, balanceVisible, onToggleVisibility }: BalanceCardProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-xl rounded-2xl"></div>
      <div className="relative bg-gradient-to-r from-cyan-900/30 via-violet-900/30 to-cyan-900/30 rounded-2xl p-8 border border-cyan-500/30 backdrop-blur-sm overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-400/10 rounded-full blur-2xl animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg font-medium text-cyan-200"
              >
                Good evening, {userName}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-cyan-300/70 text-sm mt-1"
              >
                Welcome back to your dashboard
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex space-x-2"
            >
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm border border-white/10">
                <Plus className="w-5 h-5 text-cyan-300" />
              </button>
            </motion.div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-cyan-200 text-sm font-medium"
                >
                  Total Balance
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  onClick={onToggleVisibility}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors"
                >
                  {balanceVisible ? (
                    <EyeOff className="w-4 h-4 text-cyan-300" />
                  ) : (
                    <Eye className="w-4 h-4 text-cyan-300" />
                  )}
                </motion.button>
              </div>
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl font-bold text-white"
              >
                {balanceVisible ? `$${balance.toLocaleString()}` : "••••••••"}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-cyan-200/70 text-sm mt-1"
              >
                Available to spend
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-4"
              >
                <NeonButton href="/topup" color="cyan" size="sm">
                  Top Up
                </NeonButton>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-right"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <p className="text-xs text-cyan-200">This Month</p>
                </div>
                <p className="text-lg font-semibold text-white">+$1,234</p>
                <p className="text-xs text-green-400">↗ 12% increase</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
