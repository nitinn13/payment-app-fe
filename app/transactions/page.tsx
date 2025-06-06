"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Search, Download, Eye, Calendar, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useRouter } from "next/navigation"
import CyberGrid from "@/components/cyber-grid"
import NeonButton from "@/components/neon-button"
import DashboardHeader from "@/components/dashboard-header"
import TransactionCard from "@/components/transaction-card"
import StatsCard from "@/components/stats-card"
import FilterPanel from "@/components/filter-panel"
import LoadingSpinner from "@/components/loading-spinner"
import CircuitLines from "@/components/circuit-lines"
import { getTransactions } from "@/lib/api"
import type { Transaction } from "@/lib/types"
import ParticleField from "@/components/particle-field"

export default function Transactions() {
  const [data, setData] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">("all")
  const [dateRange, setDateRange] = useState<string>("all")
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<"date" | "amount">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const router = useRouter()

  useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    const transactions = await getTransactions()
    setData(transactions || [])
    setLoading(false)
  }

  fetchData()
}, [])
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatAmount = (amount: number, type: string): string => {
    const formatted = `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
    return type === "received" ? `+${formatted}` : `-${formatted}`
  }

  const getTransactionDescription = (transaction: Transaction): string => {
    if (transaction.transactionType === "received") {
      return `Received from ${transaction.senderUpiId || "unknown"}`
    } else {
      return `Sent to ${transaction.receiverUpiId || "unknown"}`
    }
  }
  
    const filteredTransactions = data.filter((transaction ) => {
      const matchesSearch =
        (transaction.receiverUpiId && transaction.receiverUpiId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.senderUpiId && transaction.senderUpiId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (transaction.id && transaction.id.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesFilter =
        filterType === "all" ||
        (filterType === "sent" && transaction.transactionType === "sent") ||
        (filterType === "received" && transaction.transactionType === "received")

      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB
      } else {
        return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount
      }
    })

  const totalReceived = data.filter((t) => t.transactionType === "received").reduce((sum, t) => sum + t.amount, 0)

  const totalSent = data.filter((t) => t.transactionType === "sent").reduce((sum, t) => sum + t.amount, 0)

  const netBalance = totalReceived - totalSent

  if (loading) {
      return (
        <div className="min-h-screen bg-black relative overflow-hidden">
          <ParticleField/>
          <CyberGrid />
  
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-cyan-400 text-lg">Loading Transactions...</p>
            </motion.div>
          </div>
        </div>
      )
    }

  return (
    <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
      <CyberGrid />
      <CircuitLines />

      <div className="relative z-10">
        <DashboardHeader />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-teal-900/30 to-cyan-900/30"></div>
          <div className="relative bg-gradient-to-br from-cyan-900/20 via-teal-900/20 to-black px-8 py-12 border-b border-cyan-900/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-6 md:mb-0">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push("/dashboard")}
                      className="bg-cyan-900/20 backdrop-blur-sm text-cyan-300 p-2 rounded-lg hover:bg-cyan-800/30 transition-colors border border-cyan-800/50"
                    >
                      <ArrowLeft className="w-6 h-6" />
                    </motion.button>
                    <div>
                      <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                        Transaction History
                      </h1>
                      <p className="text-cyan-200/70 mt-1">Complete overview of your financial activities</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <NeonButton color="cyan" size="md">
                    <Download className="w-5 h-5 mr-2" />
                    Export Data
                  </NeonButton>
                  <NeonButton color="teal" size="md">
                    <Eye className="w-5 h-5 mr-2" />
                    View Statement
                  </NeonButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-8 -mt-8 relative z-10">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <StatsCard
              icon={TrendingDown}
              title="Total Received"
              value={`$${totalReceived.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
              change={`${data.filter((t) => t.transactionType === "received").length} transactions`}
              positive={true}
              delay={0}
              color="green"
            />
            <StatsCard
              icon={TrendingUp}
              title="Total Sent"
              value={`$${totalSent.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
              change={`${data.filter((t) => t.transactionType === "sent").length} transactions`}
              positive={false}
              delay={0.1}
              color="red"
            />
            <StatsCard
              icon={Activity}
              title="Net Balance"
              value={`${netBalance >= 0 ? "+" : ""}$${Math.abs(netBalance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}`}
              change="Current period"
              positive={netBalance >= 0}
              delay={0.2}
              color={netBalance >= 0 ? "blue" : "orange"}
            />
            <StatsCard
              icon={Calendar}
              title="Total Transactions"
              value={data.length.toString()}
              change="This month"
              positive={true}
              delay={0.3}
              color="purple"
            />
          </motion.div>

          {/* Filters and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <FilterPanel
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterType={filterType}
              setFilterType={setFilterType}
              dateRange={dateRange}
              setDateRange={setDateRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              totalTransactions={data.length}
              filteredCount={filteredTransactions.length}
            />
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-cyan-900/30 bg-gray-900/30">
              <h2 className="text-lg font-semibold text-gray-100">Recent Transactions</h2>
            </div>

            {filteredTransactions.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-12 text-center"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">No transactions found</h3>
                <p className="text-gray-400">Try adjusting your search criteria or filters</p>
              </motion.div>
            ) : (
              <div className="divide-y divide-cyan-900/20">
                <AnimatePresence>
                  {filteredTransactions.map((transaction, index) => (
                    <TransactionCard
                      key={transaction.id}
                      transaction={transaction as Transaction}
                      delay={index * 0.05}
                      onClick={() => router.push(`/transactions/${transaction.id}`)}
                      formatDate={formatDate}
                      formatTime={formatTime}
                      formatAmount={formatAmount}
                      getTransactionDescription={getTransactionDescription}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Load More */}
          {filteredTransactions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center mt-8 mb-12"
            >
              <NeonButton color="cyan" size="md">
                Load More Transactions
              </NeonButton>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
