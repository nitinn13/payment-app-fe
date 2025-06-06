"use client"

import { motion } from "framer-motion"
import ParticleField  from "@/components/particle-field"
import  CyberGrid  from "@/components/cyber-grid"

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleField />
      <CyberGrid />

      <div className="relative z-10 p-6">
        {/* Header Skeleton */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-xl animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 w-48 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse" />
              </div>
            </div>
            <div className="h-10 w-32 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full mx-auto animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-gray-700/50 rounded mx-auto animate-pulse" />
                  <div className="h-4 w-24 bg-gray-700/50 rounded mx-auto animate-pulse" />
                </div>
                <div className="h-16 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl animate-pulse" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="space-y-4">
                <div className="h-6 w-32 bg-gray-700/50 rounded animate-pulse" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="space-y-6">
                <div className="h-6 w-48 bg-gray-700/50 rounded animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
                      <div className="h-12 bg-gray-800/30 rounded-xl animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="space-y-6">
                <div className="h-6 w-48 bg-gray-700/50 rounded animate-pulse" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-lg animate-pulse" />
                        <div className="space-y-2">
                          <div className="h-4 w-32 bg-gray-700/50 rounded animate-pulse" />
                          <div className="h-3 w-48 bg-gray-700/50 rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-gray-700/50 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
