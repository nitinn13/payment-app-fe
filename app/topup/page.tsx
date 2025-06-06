"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import TopUp from "@/components/top-up"
import ParticleField from "@/components/particle-field"
import CyberGrid from "@/components/cyber-grid"

export default function TopUpPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(5420.5) // Mock balance

  const handleTopUpSuccess = () => {
    // Refresh balance or trigger any other success actions
    console.log("TopUp successful!")
    // You might want to refresh the user's balance here
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <ParticleField />
      <CyberGrid />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,69,255,0.1),transparent_50%)]" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 border-b border-gray-800/50 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-700" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                Wallet TopUp
              </h1>
            </div>

            {/* Current Balance */}
            <div className="flex items-center gap-3 bg-gray-800/30 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-700/50">
              <Wallet className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-400">Current Balance</p>
                <p className="text-lg font-bold text-white">₹{balance.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-8"
          >
            {/* TopUp Component */}
            <div className="flex-1 max-w-md mx-auto lg:mx-0">
              <TopUp onTopUpSuccess={handleTopUpSuccess} />
            </div>

            {/* Info Panel */}
            <div className="flex-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Why TopUp?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Instant Transfers</h4>
                      <p className="text-gray-400 text-sm">
                        Send money instantly to anyone with sufficient wallet balance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Lower Fees</h4>
                      <p className="text-gray-400 text-sm">Wallet transactions have lower processing fees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Better Control</h4>
                      <p className="text-gray-400 text-sm">Manage your spending with pre-loaded wallet balance</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-xl border border-violet-500/20 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-4">Payment Methods</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <h4 className="font-semibold text-white text-sm">UPI</h4>
                    <p className="text-gray-400 text-xs">Google Pay, PhonePe, Paytm</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <h4 className="font-semibold text-white text-sm">Cards</h4>
                    <p className="text-gray-400 text-xs">Debit & Credit Cards</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <h4 className="font-semibold text-white text-sm">Net Banking</h4>
                    <p className="text-gray-400 text-xs">All major banks</p>
                  </div>
                  <div className="p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                    <h4 className="font-semibold text-white text-sm">Wallets</h4>
                    <p className="text-gray-400 text-xs">Paytm, Mobikwik</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
