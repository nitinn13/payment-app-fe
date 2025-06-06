"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { AtSign, Lock, ArrowRight, AlertCircle } from "lucide-react"
import CyberGrid from "@/components/cyber-grid"
import CircuitLines from "@/components/circuit-lines"
import GlitchText from "@/components/glitch-text"
import NeonButton from "@/components/neon-button"
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const passwordInputRef = useRef<HTMLInputElement>(null)
  const loginButtonRef = useRef<HTMLButtonElement>(null)

  const handleLogin = async (): Promise<void> => {
    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post('https://payment-app-backend-dulq.onrender.com/user/login', {
        email,
        password
      });

      
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error)
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && passwordInputRef.current) {
      passwordInputRef.current.focus()
    }
  }

  const handlePasswordKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && loginButtonRef.current) {
      loginButtonRef.current.click()
    }
  }

  const isFormValid = email && password

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 p-8">
                <div className="text-center mb-8">
                  <GlitchText
                    className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-2"
                    text="Welcome Back"
                  />
                  <p className="text-gray-400">Sign in to your NeonPay account</p>
                </div>

                <div className="space-y-6">
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
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-300 block">Password</label>
                      <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        value={password}
                        placeholder="Enter your password"
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

                  {/* Login Button */}
                  <NeonButton
                    onClick={handleLogin}
                    disabled={isLoading || !isFormValid}
                    color="cyan"
                    size="lg"
                    ref={loginButtonRef}
                  >
                    {isLoading ? (
                      <span className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing In...</span>
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </NeonButton>

                  {/* Additional Options */}
                  <div className="text-center">
                    <p className="text-sm text-gray-400">
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => router.push("/signup")}
                        className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      >
                        Create Account
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
