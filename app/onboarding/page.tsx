"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  Shield,
  BarChart3,
  Globe,
  Zap,
  Users,
  CreditCard,
  Bell,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import NeonButton from "@/components/neon-button"
import { cn } from "@/lib/utils"

interface OnboardingStep {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<any>
  content: React.ReactNode
  canSkip?: boolean
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [userPreferences, setUserPreferences] = useState({
    notifications: true,
    biometric: false,
    newsletter: true,
    displayName: "",
    avatar: "",
  })

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to NeonPay",
      subtitle: "Your journey into the future of payments begins now",
      icon: Zap,
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-cyan-500/30"
          >
            <Zap className="w-16 h-16 text-cyan-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white">Ready to revolutionize your payments?</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Let's take a quick tour to help you get the most out of NeonPay's powerful features.
            </p>
          </motion.div>
        </div>
      ),
    },
    {
      id: "features",
      title: "Powerful Features",
      subtitle: "Discover what makes NeonPay special",
      icon: BarChart3,
      content: (
        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: Send, title: "Instant Transfers", desc: "Send money in seconds" },
            { icon: Shield, title: "Bank-Grade Security", desc: "Your data is protected" },
            { icon: BarChart3, title: "Real-time Analytics", desc: "Track your spending" },
            { icon: Globe, title: "Global Payments", desc: "160+ currencies supported" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gray-900/50 border border-cyan-900/30 rounded-xl p-4 text-center space-y-3"
            >
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-lg flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: "profile",
      title: "Set Up Your Profile",
      subtitle: "Personalize your NeonPay experience",
      icon: Users,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
              <Input
                placeholder="Enter your display name"
                value={userPreferences.displayName}
                onChange={(e) => setUserPreferences((prev) => ({ ...prev, displayName: e.target.value }))}
                className="bg-gray-900/50 border-cyan-900/30 text-white placeholder-gray-500"
              />
            </div>

            <div className="bg-gray-900/30 border border-cyan-900/30 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-3">Choose your avatar style:</p>
              <div className="grid grid-cols-4 gap-3">
                {["🚀", "⚡", "🌟", "💎"].map((emoji, i) => (
                  <button
                    key={i}
                    onClick={() => setUserPreferences((prev) => ({ ...prev, avatar: emoji }))}
                    className={cn(
                      "w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl transition-all",
                      userPreferences.avatar === emoji
                        ? "border-cyan-500 bg-cyan-500/20"
                        : "border-gray-700 hover:border-cyan-700",
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security Settings",
      subtitle: "Keep your account safe and secure",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-4 border border-cyan-500/30">
              <Shield className="w-12 h-12 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-gray-900/30 border border-cyan-900/30 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Biometric Authentication</h4>
                  <p className="text-sm text-gray-400">Use fingerprint or face ID to secure your account</p>
                </div>
                <Switch
                  checked={userPreferences.biometric}
                  onCheckedChange={(checked) => setUserPreferences((prev) => ({ ...prev, biometric: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Push Notifications</h4>
                  <p className="text-sm text-gray-400">Get notified about transactions and updates</p>
                </div>
                <Switch
                  checked={userPreferences.notifications}
                  onCheckedChange={(checked) => setUserPreferences((prev) => ({ ...prev, notifications: checked }))}
                />
              </div>
            </div>

            <div className="bg-cyan-900/10 border border-cyan-500/30 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-cyan-300">Security Tip</h4>
                  <p className="text-sm text-gray-400">
                    Enable biometric authentication for the highest level of security.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Stay Connected",
      subtitle: "Choose how you want to stay informed",
      icon: Bell,
      content: (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-4 border border-cyan-500/30">
              <Bell className="w-12 h-12 text-cyan-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              { title: "Transaction Alerts", desc: "Get notified when money is sent or received", enabled: true },
              { title: "Security Alerts", desc: "Important security updates and login notifications", enabled: true },
              { title: "Product Updates", desc: "New features and improvements", enabled: userPreferences.newsletter },
              { title: "Marketing", desc: "Special offers and promotions", enabled: false },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900/30 border border-cyan-900/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(checked) => {
                      if (item.title === "Product Updates") {
                        setUserPreferences((prev) => ({ ...prev, newsletter: checked }))
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      ),
    },
    {
      id: "complete",
      title: "You're All Set!",
      subtitle: "Welcome to the future of payments",
      icon: Check,
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-32 h-32 mx-auto bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-16 h-16 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white">Congratulations!</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Your NeonPay account is ready. Start sending money, tracking expenses, and exploring all the features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            {[
              { icon: Send, label: "Send Money" },
              { icon: BarChart3, label: "View Analytics" },
              { icon: CreditCard, label: "Add Cards" },
            ].map((action, i) => (
              <div key={i} className="bg-gray-900/30 border border-cyan-900/30 rounded-xl p-3 text-center">
                <action.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">{action.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      ),
    },
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]))
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const skipOnboarding = () => {
    window.location.href = "/dashboard"
  }

  const completeOnboarding = () => {
    // Save user preferences and redirect to dashboard
    localStorage.setItem("onboarding_completed", "true")
    localStorage.setItem("user_preferences", JSON.stringify(userPreferences))
    window.location.href = "/dashboard"
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(34,211,238,0.1),_rgba(0,0,0,0)_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(20,184,166,0.1),_rgba(0,0,0,0)_50%)]"></div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={skipOnboarding}
        className="absolute top-6 right-6 z-10 text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
      >
        <span className="text-sm">Skip</span>
        <X className="w-4 h-4" />
      </motion.button>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-900">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          {/* Step Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    i === currentStep ? "bg-cyan-500 scale-125" : i < currentStep ? "bg-teal-500" : "bg-gray-700",
                  )}
                />
              ))}
            </div>
          </motion.div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-cyan-900/30 rounded-2xl p-8 space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-cyan-500/30"
                >
                  {React.createElement(steps[currentStep].icon, { className: "w-8 h-8 text-cyan-400" })}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                    {steps[currentStep].title}
                  </h1>
                  <p className="text-gray-400 mt-2">{steps[currentStep].subtitle}</p>
                </motion.div>
              </div>

              {/* Step Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {steps[currentStep].content}
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex justify-between items-center pt-6"
              >
                <Button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  variant="outline"
                  className="border-cyan-800/50 text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <div className="text-sm text-gray-500">
                  {currentStep + 1} of {steps.length}
                </div>

                {currentStep === steps.length - 1 ? (
                  <NeonButton onClick={completeOnboarding} color="cyan">
                    <span className="flex items-center">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </NeonButton>
                ) : (
                  <NeonButton onClick={nextStep} color="cyan">
                    <span className="flex items-center">
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </span>
                  </NeonButton>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
