"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Mail,
  AtSign,
  Calendar,
  Edit3,
  Camera,
  Settings,
  Shield,
  Key,
  Activity,
  ArrowLeft,
  Save,
  X,
  Eye,
  Smartphone,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import ParticleField from "@/components/particle-field"
import CyberGrid from "@/components/cyber-grid"
import { getUserProfile } from "@/lib/api"

interface UserData {
  name?: string
  username?: string
  email?: string
  upiId?: string
  createdAt?: string
  [key: string]: any
}

export default function ProfilePage() {
  const [data, setData] = useState<UserData>({})
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const userProfile = await getUserProfile();
        if (userProfile) {
          setData(userProfile);
        } else {
          throw new Error('User profile data not available');
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        // setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const formatDate = (dateString?: string): string => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getInitials = (name?: string): string => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSaving(false)
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <ParticleField />
        <CyberGrid />

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-cyan-400 text-lg">Loading profile...</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleField />
      <CyberGrid />

      {/* Navigation Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 border-b border-cyan-500/20"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5 text-cyan-400" />
              </motion.button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Profile Settings
              </h1>
              <p className="text-gray-400">Manage your account information</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 rounded-xl hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span className="text-cyan-400">{isEditing ? "Cancel" : "Edit Profile"}</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Main Profile Card */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative inline-block mb-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-cyan-500/25 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
                    {getInitials(data.name)}
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-1 -right-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full p-2 shadow-lg border-2 border-black"
                  >
                    <Camera size={14} className="text-white" />
                  </motion.button>
                </div>

                <h2 className="text-xl font-bold text-white mb-2">{data.name || "Loading..."}</h2>
                <p className="text-cyan-400 font-medium mb-4 font-mono">@{data.username || "username"}</p>

                <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 rounded-xl p-4 mb-4">
                  <p className="text-gray-400 text-sm mb-1">Member since</p>
                  <p className="font-semibold text-cyan-400">{formatDate(data.createdAt)}</p>
                </div>

                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Verified Account</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-white mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Account Stats</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Transactions</span>
                  <span className="font-semibold text-cyan-400 font-mono">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">This Month</span>
                  <span className="font-semibold text-green-400">+12%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Security Score</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-green-500 to-cyan-500" />
                    </div>
                    <span className="text-green-400 text-sm">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Account Status</span>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  <span>Personal Information</span>
                </h3>
                <Settings size={20} className="text-gray-400" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <User size={16} className="text-cyan-400" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="text"
                      defaultValue={data.name}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-white placeholder-gray-400"
                    />
                  ) : (
                    <div className="p-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-gray-300">
                      {data.name || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <AtSign size={16} className="text-cyan-400" />
                    Username
                  </label>
                  {isEditing ? (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="text"
                      defaultValue={data.username}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-white placeholder-gray-400"
                    />
                  ) : (
                    <div className="p-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-gray-300 font-mono">
                      {data.username || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Mail size={16} className="text-cyan-400" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="email"
                      defaultValue={data.email}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-white placeholder-gray-400"
                    />
                  ) : (
                    <div className="p-3 bg-gray-800/30 border border-gray-700/50 rounded-xl text-gray-300">
                      {data.email || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Calendar size={16} className="text-cyan-400" />
                    UPI ID
                  </label>
                  {isEditing ? (
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      type="text"
                      defaultValue={data.upiId}
                      className="w-full p-3 bg-gray-800/50 border border-cyan-500/30 rounded-xl focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all text-white placeholder-gray-400"
                    />
                  ) : (
                    <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-xl">
                      <span className="font-mono text-cyan-400">{data.upiId || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-3 mt-6 pt-6 border-t border-gray-700/50"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-3 px-6 rounded-xl hover:from-cyan-400 hover:to-teal-400 transition-all font-medium disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800/50 transition-all font-medium"
                    >
                      Cancel
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Security Settings */}
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                <span>Security & Privacy</span>
              </h3>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg">
                      <Smartphone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:from-cyan-400 hover:to-teal-400 transition-all text-sm font-medium"
                  >
                    Enable
                  </motion.button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg">
                      <Key className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Change Password</h4>
                      <p className="text-sm text-gray-400">Update your account password</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all text-sm font-medium"
                  >
                    Change
                  </motion.button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700/50 rounded-xl hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-lg">
                      <Eye className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Login Activity</h4>
                      <p className="text-sm text-gray-400">View recent login sessions</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all text-sm font-medium"
                  >
                    View
                  </motion.button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Delete Account</h4>
                      <p className="text-sm text-gray-400">Permanently delete your account</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-red-500/50 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/10 transition-all text-sm font-medium"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
