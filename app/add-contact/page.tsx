"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, User, AtSign, Save, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import CyberGrid from "@/components/cyber-grid"
import CircuitLines from "@/components/circuit-lines"
import DashboardHeader from "@/components/dashboard-header"
import GlitchText from "@/components/glitch-text"
import NeonButton from "@/components/neon-button"

export default function AddContact() {
  const [name, setName] = useState("")
  const [upiId, setUpiId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSaveContact = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, simulate success
      setSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/contacts")
      }, 1500)
    } catch (error) {
      console.error("Error saving contact:", error)
      setError("Failed to save contact. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = name.trim() && upiId.trim()

  if (success) {
    return (
      <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
        <CyberGrid />
        <CircuitLines />

        <div className="relative z-10">
          <DashboardHeader user={{ name: "Neo", email: "neo@neonpay.com" }} />

          <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-green-500/30 shadow-xl shadow-green-900/10 p-8 max-w-md w-full text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                  className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50"
                >
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-2">Contact Added!</h2>
                <p className="text-gray-400 mb-6">{name} has been successfully added to your contacts.</p>

                <div className="flex justify-center">
                  <NeonButton onClick={() => router.push("/contacts")} color="cyan" size="lg">
                    View Contacts
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
      <CyberGrid />
      <CircuitLines />

      <div className="relative z-10">
        <DashboardHeader user={{ name: "Neo", email: "neo@neonpay.com" }} />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-violet-900/30 to-cyan-900/30"></div>
          <div className="relative bg-gradient-to-br from-cyan-900/20 via-violet-900/20 to-black px-8 py-12 border-b border-cyan-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/contacts")}
                  className="bg-cyan-900/20 backdrop-blur-sm text-cyan-300 p-2 rounded-lg hover:bg-cyan-800/30 transition-colors border border-cyan-800/50"
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
                <div>
                  <GlitchText
                    className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent"
                    text="Add Contact"
                  />
                  <p className="text-cyan-200/70 mt-1">Add a new contact to your network</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto px-8 -mt-8 pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-xl rounded-2xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 p-8">
              <div className="space-y-6">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">Full Name</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter contact's full name"
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                    />
                  </div>
                </div>

                {/* UPI ID Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 block">UPI ID</label>
                  <div className="relative">
                    <AtSign className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="Enter UPI ID (e.g., user@neonpay)"
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-4 bg-red-900/20 border border-red-800/50 rounded-xl"
                  >
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}

                {/* Save Button */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => router.push("/contacts")}
                    className="flex-1 py-3 px-6 border border-cyan-800/50 text-cyan-300 rounded-xl hover:bg-cyan-900/20 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <NeonButton
                    onClick={handleSaveContact}
                    disabled={isLoading || !isFormValid}
                    color="cyan"
                    size="md"
                    className="flex-1"
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Save className="w-4 h-4 mr-2" />
                        Save Contact
                      </span>
                    )}
                  </NeonButton>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
