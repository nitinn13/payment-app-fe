"use client"

import { motion } from "framer-motion"
import CyberGrid from "./cyber-grid"
import GlitchText from "./glitch-text"

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <CyberGrid />

      {/* Header Skeleton */}
      <header className="bg-black/80 backdrop-blur-lg border-b border-cyan-900/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">N</span>
              </div>
              <div>
                <GlitchText
                  className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                  text="NeonPay"
                />
                <p className="text-xs text-gray-400">Financial Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="w-px h-6 bg-gray-700"></div>
              <div className="w-16 h-8 bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Loading Animation Center */}
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
          {/* Main Loading Spinner */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-20 h-20 border-4 border-cyan-900/30 rounded-full"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-cyan-500 rounded-full"
              ></motion.div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">N</span>
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h2 className="text-xl font-semibold text-gray-100">Loading your dashboard</h2>
            <p className="text-gray-400">Please wait while we fetch your financial data...</p>
          </motion.div>

          {/* Loading Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex space-x-8 text-sm"
          >
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2 text-green-400"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Authenticating</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center space-x-2 text-cyan-400"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              ></motion.div>
              <span>Loading balance</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center space-x-2 text-gray-400"
            >
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Fetching contacts</span>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
