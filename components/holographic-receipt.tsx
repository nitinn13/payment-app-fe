"use client"

import { motion } from "framer-motion"
import { Receipt, Download, Share2, CheckCircle } from "lucide-react"

interface HolographicReceiptProps {
  transaction: any
  isVisible: boolean
  onClose: () => void
}

export default function HolographicReceipt({ transaction, isVisible, onClose }: HolographicReceiptProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 blur-xl rounded-2xl"></div>
        <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-cyan-500/50 p-8 shadow-2xl">
          {/* Receipt Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              NeonPay Receipt
            </h2>
            <p className="text-gray-400 text-sm">Transaction Confirmation</p>
          </div>

          {/* Receipt Content */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Status</span>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-medium">Completed</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Amount</span>
              <span className="text-white font-bold text-lg">${transaction?.amount?.toFixed(2) || "0.00"}</span>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
              <span className="text-gray-400">Transaction ID</span>
              <span className="text-cyan-300 font-mono text-sm">{transaction?.id || "N/A"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
