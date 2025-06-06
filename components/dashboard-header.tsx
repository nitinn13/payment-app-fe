"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Bell, Settings, LogOut } from "lucide-react"
import GlitchText from "./glitch-text"

interface DashboardHeaderProps {
  user: {
    name: string
    email?: string
  }
}



export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter()
  function handleLogout() {
    localStorage.removeItem("token")
    router.push("/")
  }
  return (
    <header className="bg-black/80 backdrop-blur-xl border-b border-cyan-900/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-lg">N</span>
            </div>
            <div>
              <GlitchText
                className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
                text="NeonPay"
              />
              <p className="text-xs text-gray-400">Financial Dashboard</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all duration-200">
              <LogOut className="w-5 h-5" onClick={handleLogout} />
            </button>
            <div className="w-px h-6 bg-gray-700"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">{user.name.charAt(0)}</span>
              </div>
              <span className="text-gray-300 text-sm font-medium hidden sm:block">{user.name}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
