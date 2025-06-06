"use client"

import { motion } from "framer-motion"
import { CheckCircle, Zap } from "lucide-react"

interface SuccessAnimationProps {
  message: string
  details: {
    label: string
    value: string
  }[]
  className?: string
}

export default function SuccessAnimation({ message, details, className }: SuccessAnimationProps) {
  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
        <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-green-900/30 shadow-xl shadow-green-900/10 overflow-hidden p-8 text-center space-y-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto border border-green-500/50"
          >
            <CheckCircle className="w-10 h-10 text-green-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Transfer Successful!</h2>
            <p className="text-gray-400">{message}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 blur-md rounded-xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-left border border-green-800/50">
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                Transaction Details
              </h3>
              <div className="space-y-3 text-sm">
                {details.map((detail, index) => (
                  <motion.div
                    key={detail.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                    className="flex justify-between"
                  >
                    <span className="text-gray-400">{detail.label}</span>
                    <span className="font-semibold text-white">{detail.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
