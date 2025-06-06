"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  User,
  AtSign,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Shield,
  Zap,
  Chrome,
  Apple,
  Github,
} from "lucide-react"
import CyberGrid from "@/components/cyber-grid"
import CircuitLines from "@/components/circuit-lines"
import GlitchText from "@/components/glitch-text"
import NeonButton from "@/components/neon-button"
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const usernameInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const signupButtonRef = useRef<HTMLButtonElement>(null)

  const handleSignup = async (): Promise<void> => {
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post('https://payment-app-backend-dulq.onrender.com/user/signup', {
        name,
        username,
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      setSuccess(true)
      // Redirect to onboarding after a short delay to show success state
      setTimeout(() => {
        router.push("/onboarding")
      }, 1500)
    } catch (error) {
      console.error("Signup failed:", error)
      setError("Signup failed. Please try again.")
      setSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string): Promise<void> => {
    try {
      console.log(`${provider} login initiated`)
      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setTimeout(() => {
        router.push("/onboarding")
      }, 1500)
    } catch (error) {
      console.error(`${provider} login failed:`, error)
      setError(`${provider} login failed. Please try again.`)
    }
  }

  const handleNameKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && usernameInputRef.current) {
      usernameInputRef.current.focus()
    }
  }

  const handleUsernameKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }

  const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && signupButtonRef.current) {
      signupButtonRef.current.click()
    }
  }

  const isFormValid = name && username && email && password

  return (
    <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
      <CyberGrid />
      <CircuitLines />

      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-teal-900/20 pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <nav className="flex justify-between items-center px-8 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => router.push("/")}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-lg">N</span>
            </div>
            <GlitchText
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
              text="NeonPay"
            />
          </motion.button>
        </nav>

        {/* Main Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-green-500/30 shadow-xl shadow-green-900/10 p-8 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>

                    <h2 className="text-2xl font-bold text-white mb-2">Account Created!</h2>
                    <p className="text-gray-400 mb-6">Your NeonPay account has been successfully created.</p>

                    <div className="flex justify-center">
                      <NeonButton color="cyan" size="lg">
                        <span className="flex items-center">
                          Continue to Setup
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </NeonButton>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 p-8">
                    <div className="text-center mb-8">
                      <GlitchText
                        className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-2"
                        text="Create Account"
                      />
                      <p className="text-gray-400">Join NeonPay and start sending money instantly</p>
                    </div>

                    <div className="space-y-6">
                      {/* Social Login Options */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center px-4 py-3 border border-cyan-800/50 rounded-xl bg-black/50 hover:bg-cyan-900/20 hover:border-cyan-600/50 transition-all duration-200 group"
                            onClick={() => handleSocialLogin("Google")}
                          >
                            <Chrome className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center px-4 py-3 border border-cyan-800/50 rounded-xl bg-black/50 hover:bg-cyan-900/20 hover:border-cyan-600/50 transition-all duration-200 group"
                            onClick={() => handleSocialLogin("Apple")}
                          >
                            <Apple className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center px-4 py-3 border border-cyan-800/50 rounded-xl bg-black/50 hover:bg-cyan-900/20 hover:border-cyan-600/50 transition-all duration-200 group"
                            onClick={() => handleSocialLogin("GitHub")}
                          >
                            <Github className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                          </motion.button>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-900 text-gray-400">Or continue with email</span>
                          </div>
                        </div>
                      </div>

                      {/* Name Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Full Name</label>
                        <div className="relative">
                          <User className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            value={name}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                            onKeyDown={handleNameKeyDown}
                          />
                        </div>
                      </div>

                      {/* Username Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Username</label>
                        <div className="relative">
                          <User className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            value={username}
                            placeholder="Choose a username"
                            className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                            onKeyDown={handleUsernameKeyDown}
                            ref={usernameInputRef}
                          />
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Email Address</label>
                        <div className="relative">
                          <AtSign className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                            onKeyDown={handleEmailKeyDown}
                            ref={emailInputRef}
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Password</label>
                        <div className="relative">
                          <Lock className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            placeholder="Create a strong password"
                            className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                            onKeyDown={handlePasswordKeyDown}
                            ref={passwordInputRef}
                          />
                        </div>
                      </div>

                      {/* Error Message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center space-x-2 p-4 bg-red-900/20 border border-red-800/50 rounded-xl"
                          >
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Signup Button */}
                      <NeonButton
                        onClick={handleSignup}
                        disabled={isLoading || !isFormValid}
                        color="cyan"
                        size="lg"
                        ref={signupButtonRef}
                      >
                        {isLoading ? (
                          <span className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Create Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        )}
                      </NeonButton>

                      {/* Additional Options */}
                      <div className="text-center">
                        <p className="text-sm text-gray-400">
                          Already have an account?{" "}
                          <button
                            onClick={() => router.push("/login")}
                            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Instant Transfers</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
