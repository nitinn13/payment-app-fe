"use client"

import { motion } from "framer-motion"
import { Send, Clock, Shield } from "lucide-react"

interface TransferSummaryProps {
  amount: string
  recipient: string
  fee?: string
  processingTime?: string
  className?: string
}

export default function TransferSummary({
  amount,
  recipient,
  fee = "Free",
  processingTime = "Instant",
  className,
}: TransferSummaryProps) {
  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-md rounded-xl"></div>
        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-800/50">
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto"
            >
              <Send className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-400">You're sending</p>
              <motion.p
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold text-white"
              >
                ${amount}
              </motion.p>
            </div>
            <div>
              <p className="text-sm text-gray-400">To</p>
              <p className="text-lg font-semibold text-cyan-300">{recipient}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-cyan-900/30">
              <span className="text-gray-400">Transaction Fee</span>
              <span className="font-semibold text-green-400">{fee}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-cyan-900/30">
              <span className="text-gray-400">Processing Time</span>
              <span className="font-semibold text-white flex items-center">
                <Clock className="w-4 h-4 mr-1 text-cyan-400" />
                {processingTime}
              </span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-400">Security</span>
              <span className="font-semibold text-white flex items-center">
                <Shield className="w-4 h-4 mr-1 text-cyan-400" />
                End-to-end encrypted
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
