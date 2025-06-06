"use client"

import { motion } from "framer-motion"
import { ChevronRight, UserIcon } from "lucide-react"

interface User {
  id: string
  name: string
  upiId: string
  status?: "online" | "offline"
  avatar?: string
}

interface ContactItemProps {
  user: User
  delay: number
}

export default function ContactItem({ user, delay }: ContactItemProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
      className="w-full flex items-center space-x-3 p-3 hover:bg-teal-900/10 rounded-xl transition-all duration-200 text-left group border border-transparent hover:border-teal-800/50"
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-black font-semibold">
          {user.avatar || <UserIcon className="w-6 h-6" />}
        </div>
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
            user.status === "online" ? "bg-green-500" : "bg-gray-500"
          }`}
        ></div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-100 truncate">{user.name}</p>
        <p className="text-sm text-gray-400 truncate">{user.upiId}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-teal-400 transition-colors" />
    </motion.button>
  )
}
