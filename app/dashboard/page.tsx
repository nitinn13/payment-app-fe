"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Send,
  Smartphone,
  Zap,
  AlertCircle,
  TrendingUp,
  Search,
  ChevronRight,
  Activity,
  Bell,
  Plus,
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Download,
  RefreshCw,
  Wallet,
  Shield,
  Menu,
  LogOutIcon,
} from "lucide-react"
import CyberGrid from "@/components/cyber-grid"
import ParticleField from "@/components/particle-field"
import NeonButton from "@/components/neon-button"
import GlitchText from "@/components/glitch-text"
import LoadingSpinner from "@/components/loading-spinner"
import Link from "next/link"
import type { UserType, Transaction } from "@/lib/types"
import { getContacts, getUserProfile, getBalance, getTransactions } from "@/lib/api"
import { useRouter } from "next/navigation"

interface UserDetails {
  name: string
  email?: string
  upiId?: string
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  color: string
  bgColor: string
  link: string
}

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  time: string
  read: boolean
}

export default function Dashboard() {
  const [users, setUsers] = useState<UserType[]>([])
  const [me, setMe] = useState<UserDetails>({ name: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [balance, setBalance] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [balanceVisible, setBalanceVisible] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [userProfile, contacts, balance, transactions] = await Promise.all([
          getUserProfile(),
          getContacts(),
          getBalance(),
          getTransactions()
        ])

        if (userProfile) {
          setMe({
            name: userProfile.name,
            email: userProfile.email,
            upiId: userProfile.upiId
          })

          // Transform contacts to UserType with default values
          if (contacts) {
            setUsers(contacts.map(contact => ({
              ...contact,
              email: contact.upiId, // Using UPI ID as email fallback
              username: contact.upiId.split('@')[0] || 'user',
              createdAt: new Date().toISOString(),
              password: '', // Never include real password
              status: "online" // Adding status field
            })))
          }
        }

        if (balance !== null) {
          setBalance(balance)
        }

        if (transactions) {
          setTransactions(transactions)
        }

        // Mock notifications
        const mockNotifications = [
          {
            id: "1",
            type: "success",
            title: "Payment Received",
            message: "Your recent payment was successful",
            time: "2 min ago",
            read: false,
          },
          {
            id: "2",
            type: "info",
            title: "Security Update",
            message: "Your account security has been enhanced",
            time: "1 hour ago",
            read: false,
          }
        ]
        setNotifications(mockNotifications as Notification[])

      } catch (err: any) {
        setError(err.message || "Failed to fetch dashboard data")
        console.error(err)

        // Fallback data
        setMe({ name: "Neo", email: "neo@neonpay.com", upiId: "neo@neonpay" })
        setBalance(0)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  function handleLogout() {
    localStorage.removeItem("token")
    router.push("/")
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.upiId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "all") return true
    if (activeFilter === "sent") return transaction.transactionType === "sent"
    if (activeFilter === "received") return transaction.transactionType === "received"
    return true
  })

  const quickActions: QuickAction[] = [
    {
      icon: Send,
      title: "Send Money",
      desc: "Transfer funds instantly",
      color: "from-cyan-500 to-blue-600",
      bgColor: "bg-cyan-900/20",
      link: "/send",
    },
    {
      icon: Smartphone,
      title: "Mobile Recharge",
      desc: "Top-up your phone",
      color: "from-teal-500 to-cyan-600",
      bgColor: "bg-teal-900/20",
      link: "/recharge",
    },
    {
      icon: Zap,
      title: "Pay Bills",
      desc: "Electricity, gas & more",
      color: "from-yellow-500 to-orange-600",
      bgColor: "bg-yellow-900/20",
      link: "/bills",
    },
    {
      icon: TrendingUp,
      title: "Investments",
      desc: "Grow your money",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-900/20",
      link: "/invest",
    },
  ]

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 border border-red-900/50 rounded-xl p-8 max-w-md w-full mx-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <NeonButton onClick={() => window.location.reload()} color="cyan">
              Try Again
            </NeonButton>
          </div>
        </motion.div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
      <ParticleField />
      <CyberGrid />

      <div className="relative z-10">
        {/* Enhanced Header */}
        <header className="bg-black/80 backdrop-blur-xl border-b border-cyan-900/30 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-black font-bold text-lg">N</span>
                  </div>
                  <div>
                    <GlitchText
                      className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                      text="NeonPay"
                    />
                    <p className="text-gray-400 text-sm">Digital Wallet</p>
                  </div>
                </div>

                <nav className="hidden md:flex items-center space-x-6">
                  <button className="text-cyan-400 font-medium border-b-2 border-cyan-400 pb-1">Dashboard</button>
                  <Link href="/transactions" className="text-gray-400 hover:text-cyan-300 hover:border-b-2 hover:border-cyan-400 pb-1  transition-colors">Transactions</Link>
                  <Link href="/contacts" className="text-gray-400 hover:text-cyan-300 hover:border-b-2 hover:border-cyan-400 pb-1 transition-colors">Contacts</Link>
                </nav>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-xl transition-all duration-200 relative">
                    <Bell className="w-5 h-5" />
                    {notifications.filter((n) => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                    )}
                  </button>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-xl transition-all duration-200">
                  <LogOutIcon className="w-5 h-5" />
                </button>
                <Link href="/profile">
                  <div className="flex items-center space-x-3 bg-gray-900/50 rounded-xl p-2 border border-cyan-900/30">

                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-black font-bold text-sm">{me.name.charAt(0)}</span>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-gray-300 text-sm font-medium">{me.name}</p>
                      <p className="text-gray-500 text-xs">{me.upiId}</p>
                    </div>

                  </div>
                </Link>
                <button className="md:hidden p-3 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-xl transition-all duration-200">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Good evening,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {me.name}
                  </span>
                </h1>
                <p className="text-gray-400">Here's what's happening with your money today.</p>
              </div>

            </div>
          </motion.div>

          {/* Top Row - Balance & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Main Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="relative group">
                {/* Outer glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-2xl rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Main card */}
                <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl border border-cyan-400/30 backdrop-blur-xl overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20"></div>
                    <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                  </div>

                  {/* Circuit lines decoration */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>

                  <div className="relative z-10 p-8">
                    {/* Header section */}
                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <p className="text-cyan-300 text-sm font-medium uppercase tracking-wider">Total Balance</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <h3 className="text-5xl font-bold text-white tracking-tight">
                            {balanceVisible ? `$${balance.toLocaleString()}` : "••••••••"}
                          </h3>
                          <button
                            onClick={() => setBalanceVisible(!balanceVisible)}
                            className="p-3 hover:bg-cyan-400/10 rounded-xl transition-all duration-200 border border-cyan-400/20 hover:border-cyan-400/40 group"
                          >
                            {balanceVisible ? (
                              <EyeOff className="w-5 h-5 text-cyan-300 group-hover:text-cyan-200" />
                            ) : (
                              <Eye className="w-5 h-5 text-cyan-300 group-hover:text-cyan-200" />
                            )}
                          </button>
                        </div>
                        <p className="text-gray-400 text-sm">Available for transactions</p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col space-y-3">
                        <NeonButton href="/topup" color="cyan" size="sm" className="whitespace-nowrap">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Funds
                        </NeonButton>
                        <button className="px-4 py-2 text-cyan-300 border border-cyan-400/30 rounded-xl hover:bg-cyan-400/10 transition-all duration-200 text-sm font-medium">
                          Transfer
                        </button>
                      </div>
                    </div>

                    {/* Stats grid */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* Monthly Income */}
                      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-2xl p-5 border border-green-400/20 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-green-400/20 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                          </div>
                          <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded-full">
                            +12%
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$1,234</p>
                        <p className="text-green-300 text-sm font-medium">Monthly Income</p>
                      </div>

                      {/* Total Transactions */}
                      <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 rounded-2xl p-5 border border-blue-400/20 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-blue-400/20 rounded-xl flex items-center justify-center">
                            <Activity className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="text-blue-400 text-xs font-semibold bg-blue-400/10 px-2 py-1 rounded-full">
                            {transactions.length}
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">156</p>
                        <p className="text-blue-300 text-sm font-medium">Transactions</p>
                      </div>

                      {/* Savings Goal */}
                      <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 rounded-2xl p-5 border border-orange-400/20 backdrop-blur-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-orange-400/20 rounded-xl flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-orange-400" />
                          </div>
                          <span className="text-orange-400 text-xs font-semibold bg-orange-400/10 px-2 py-1 rounded-full">
                            78%
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-white mb-1">$3,900</p>
                        <p className="text-orange-300 text-sm font-medium">Savings Goal</p>
                      </div>
                    </div>

                    {/* Quick actions bar */}
                    <div className="mt-6 pt-6 border-t border-cyan-400/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 transition-colors">
                            <Download className="w-4 h-4" />
                            <span className="text-sm font-medium">Export</span>
                          </button>
                          <button className="flex items-center space-x-2 text-cyan-300 hover:text-cyan-200 transition-colors">
                            <RefreshCw className="w-4 h-4" />
                            <span className="text-sm font-medium">Refresh</span>
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-400">Last updated</p>
                          <p className="text-sm text-cyan-300 font-medium">Just now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-green-900/30 shadow-xl shadow-green-900/10 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-400" />
                </div>
                <div className="text-sm font-medium text-green-400">+8%</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">$2,456</h3>
              <p className="text-gray-400 text-sm uppercase tracking-wide">Monthly Spending</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-teal-900/30 shadow-xl shadow-teal-900/10 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-teal-900/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-teal-400" />
                </div>
                <div className="text-sm font-medium text-teal-400">98%</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Excellent</h3>
              <p className="text-gray-400 text-sm uppercase tracking-wide">Security Score</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center space-x-1 transition-colors">
                <span>View More</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (

                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${action.bgColor} hover:bg-opacity-80 rounded-xl p-6 border border-cyan-900/30 hover:border-cyan-500/50 transition-all duration-200 group backdrop-blur-sm`}
                >
                  <Link href={action.link} >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div
                        className={`relative w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-black mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <action.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-100 mb-1 text-left">{action.title}</h4>
                    <p className="text-sm text-gray-400 text-left">{action.desc}</p>
                  </Link>
                </motion.button>

              ))}
            </div>
          </motion.div>

          {/* Bottom Section - Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10">
                <div className="p-6 border-b border-cyan-900/30">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-100">Recent Transactions</h3>
                      <p className="text-sm text-gray-400 mt-1">Your latest financial activity</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {["all", "sent", "received"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${activeFilter === filter
                          ? "bg-cyan-500 text-black"
                          : "text-gray-400 hover:text-cyan-300 hover:bg-cyan-900/20"
                          }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-cyan-900/20 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {filteredTransactions.slice(0, 5).map((transaction, index) => {
                      const isSent = transaction.transactionType === "sent"
                      return (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ backgroundColor: "rgba(34, 211, 238, 0.05)" }}
                          className="p-6 hover:bg-cyan-900/10 transition-colors cursor-pointer border-l-2 border-transparent hover:border-cyan-500"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${isSent
                                  ? "bg-red-900/20 text-red-400 border border-red-800/50"
                                  : "bg-green-900/20 text-green-400 border border-green-800/50"
                                  }`}
                              >
                                {isSent ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-100">
                                  {isSent ? transaction.receiverUpiId : transaction.senderUpiId}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <p className="text-sm text-gray-400">{transaction.category}</p>
                                  <span className="text-gray-600">•</span>
                                  <p className="text-sm text-gray-400 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {new Date(transaction.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={`text-right ${isSent ? "text-red-400" : "text-green-400"}`}>
                              <p className="font-bold text-lg">
                                {isSent ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>

                <div className="p-4 border-t border-cyan-900/30">
                  <Link href="/transactions">
                    <button className="w-full text-cyan-400 hover:text-cyan-300 font-medium text-sm flex items-center justify-center space-x-1 transition-colors">
                      <span>View All Transactions</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Quick Send & Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6"
            >
              {/* Quick Send */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-teal-900/30 shadow-xl shadow-teal-900/10">
                <div className="p-6 border-b border-teal-900/30">
                  <h3 className="text-lg font-bold text-gray-100">Quick Send</h3>
                  <p className="text-sm text-gray-400 mt-1">Send to your contacts</p>
                </div>

                <div className="p-6">
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-teal-800/50 bg-black/50 text-gray-200 placeholder-gray-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 text-sm"
                    />
                  </div>

                  {/* Users List */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <AnimatePresence>
                      {filteredUsers.slice(0, 4).map((user, index) => (
                        <motion.div
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-teal-900/20 transition-all duration-200 cursor-pointer border border-transparent hover:border-teal-500/30"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                {user.name.charAt(0)}
                              </div>

                            </div>
                            <div>
                              <p className="font-medium text-gray-100 text-sm">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.upiId}</p>
                            </div>
                          </div>
                          <button className="p-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                            <Send className="w-3 h-3" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <Link href="/contacts">
                    <button className="w-full mt-4 py-2 text-teal-400 hover:text-teal-300 font-medium text-sm border border-teal-800/50 hover:border-teal-500/50 rounded-lg transition-all duration-200 hover:bg-teal-900/20">
                      View All Contacts
                    </button>
                  </Link>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-orange-900/30 shadow-xl shadow-orange-900/10">
                <div className="p-6 border-b border-orange-900/30">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-100">Notifications</h3>
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                  {notifications.slice(0, 3).map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-lg border transition-all duration-200 hover:bg-orange-900/20 ${notification.read
                        ? "bg-gray-800/50 border-gray-700/50"
                        : "bg-orange-900/20 border-orange-500/30"
                        }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${notification.type === "success"
                            ? "bg-green-400"
                            : notification.type === "warning"
                              ? "bg-yellow-400"
                              : "bg-cyan-400"
                            }`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-100">{notification.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
