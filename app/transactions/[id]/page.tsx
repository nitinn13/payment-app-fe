"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Copy,
  Download,
  Share2,
  Receipt,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  User,
  Shield,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Zap,
  CreditCard,
  Building,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import CyberGrid from "@/components/cyber-grid"
import NeonButton from "@/components/neon-button"
import DashboardHeader from "@/components/dashboard-header"
import CircuitLines from "@/components/circuit-lines"
import LoadingSpinner from "@/components/loading-spinner"

interface MerchantInfo {
  verified?: boolean
  name?: string
}

interface Transaction {
  id: string
  amount: number
  type: "CREDIT" | "DEBIT"
  description: string
  status: "completed"
  paymentMethod: string
  bankReference?: string
  razorpayId?: string
  senderUpiId: string
  receiverUpiId: string
  merchantInfo?: MerchantInfo
  fee: number
  tax: number
  createdAt: string
  updatedAt: string
  category?: string
  [key: string]: any
}

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  const fetchTransactionDetails = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://payment-app-backend-dulq.onrender.com/transaction/my-transactions/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await response.json();
      setTransaction(data.transaction)
    } catch (error) {
      setError("Failed to fetch transaction details.")
      console.error("Error fetching transaction details:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchTransactionDetails(id as string)

  }, [id])

  const handleCopyTransactionId = async () => {
    if (!transaction) return
    try {
      await navigator.clipboard.writeText(transaction.id)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy transaction ID")
    }
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: formatDate(dateString),
      time: formatTime(dateString),
      full: date.toLocaleString("en-US"),
    }
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      completed: {
        icon: CheckCircle,
        color: "text-green-400",
        bgColor: "bg-green-900/20",
        borderColor: "border-green-500/50",
        text: "Completed",
      },
      pending: {
        icon: Clock,
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/20",
        borderColor: "border-yellow-500/50",
        text: "Pending",
      },
      failed: {
        icon: AlertCircle,
        color: "text-red-400",
        bgColor: "bg-red-900/20",
        borderColor: "border-red-500/50",
        text: "Failed",
      },
    }
    return configs[status as keyof typeof configs] || configs.completed
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <CyberGrid />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-red-900/50 rounded-2xl p-8 max-w-md w-full mx-4 relative z-10"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Error Loading Transaction</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <NeonButton onClick={() => router.back()} color="cyan">
              Go Back
            </NeonButton>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <CyberGrid />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 relative z-10"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Transaction Not Found</h2>
            <p className="text-gray-400 mb-6">The requested transaction could not be located.</p>
            <NeonButton onClick={() => router.push("/transactions")} color="cyan">
              Go Back
            </NeonButton>
          </div>
        </motion.div>
      </div>
    )
  }

  const createdDateTime = formatDateTime(transaction.createdAt)
  const statusConfig = getStatusConfig(transaction.status)

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
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-teal-900/30 to-cyan-900/30"></div>
          <div className="relative bg-gradient-to-br from-cyan-900/20 via-teal-900/20 to-black px-8 py-12 border-b border-cyan-900/30">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center space-x-4 mb-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/transactions")}
                  className="bg-cyan-900/20 backdrop-blur-sm text-cyan-300 p-2 rounded-lg hover:bg-cyan-800/30 transition-colors border border-cyan-800/50"
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                    Transaction Details
                  </h1>
                  <p className="text-cyan-200/70 mt-1">Complete information about your transaction</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto px-8 -mt-8 pb-12 relative z-10">
          {/* Main Transaction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 overflow-hidden">
              {/* Transaction Header */}
              <div className="bg-gradient-to-r from-cyan-900/30 via-teal-900/30 to-cyan-900/30 p-8 border-b border-cyan-900/30">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white relative ${transaction.type === "CREDIT"
                        ? "bg-gradient-to-br from-green-400 to-green-600"
                        : "bg-gradient-to-br from-teal-400 to-teal-600"
                        }`}
                    >
                      {transaction.type === "CREDIT" ? (
                        <ArrowDownLeft className="w-8 h-8" />
                      ) : (
                        <ArrowUpRight className="w-8 h-8" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-md rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <motion.h2
                          initial={{ scale: 0.9 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-3xl font-bold text-white"
                        >
                          {transaction.type === "CREDIT" ? "+" : "-"}$
                          {transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </motion.h2>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className={`flex items-center space-x-2 px-3 py-1 rounded-full ${statusConfig.bgColor} border ${statusConfig.borderColor}`}
                        >
                          <statusConfig.icon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-sm font-semibold ${statusConfig.color}`}>{statusConfig.text}</span>
                        </motion.div>
                      </div>
                      <p className="text-cyan-200/80 font-medium">{transaction.description}</p>
                      {transaction.category && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-cyan-900/20 text-cyan-400 border border-cyan-800/50">
                          {transaction.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopyTransactionId}
                      className="flex items-center justify-center space-x-2 bg-gray-800/50 border border-cyan-800/50 text-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-900/20 transition-all duration-200"
                    >
                      <Copy className="w-4 h-4" />
                      <span className="text-sm font-medium">{copied ? "Copied!" : "Copy ID"}</span>
                    </motion.button>
                    <NeonButton color="teal" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </NeonButton>
                    <NeonButton color="cyan" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </NeonButton>
                  </div>
                </div>
              </div>

              {/* Transaction Details Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Transaction Information */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-100 border-b border-cyan-900/30 pb-3 flex items-center">
                      <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                      Transaction Information
                    </h3>

                    <div className="space-y-4">
                      <div className="flex justify-between items-start p-3 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                        <span className="text-sm font-medium text-gray-400">Transaction ID</span>
                        <div className="text-right">
                          <span className="text-sm font-mono text-cyan-300 break-all">{transaction.id}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-start p-3 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                        <span className="text-sm font-medium text-gray-400">Type</span>
                        <span
                          className={`text-sm font-semibold px-2 py-1 rounded ${transaction.type === "CREDIT"
                            ? "bg-green-900/20 text-green-400 border border-green-800/50"
                            : "bg-teal-900/20 text-teal-400 border border-teal-800/50"
                            }`}
                        >
                          {transaction.type}
                        </span>
                      </div>

                      <div className="flex justify-between items-start p-3 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                        <span className="text-sm font-medium text-gray-400">Payment Method</span>
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-gray-200 font-medium">{transaction.paymentMethod}</span>
                        </div>
                      </div>

                      {transaction.bankReference && (
                        <div className="flex justify-between items-start p-3 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                          <span className="text-sm font-medium text-gray-400">Bank Reference</span>
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-mono text-gray-200">{transaction.bankReference}</span>
                          </div>
                        </div>
                      )}

                      {transaction.razorpayId && (
                        <div className="flex justify-between items-start p-3 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                          <span className="text-sm font-medium text-gray-400">Razorpay ID</span>
                          <div className="text-right flex items-center space-x-2">
                            <span className="text-sm font-mono text-gray-200">{transaction.razorpayId}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-cyan-400 hover:text-cyan-300"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Payment Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold text-gray-100 border-b border-cyan-900/30 pb-3 flex items-center">
                      <User className="w-5 h-5 text-cyan-400 mr-2" />
                      Payment Details
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-400">From</span>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-200">{transaction.senderUpiId}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-800/30 rounded-lg border border-cyan-900/20">
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-gray-400">To</span>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-200">{transaction.receiverUpiId}</span>
                              {transaction.merchantInfo?.verified && <Shield className="w-4 h-4 text-green-400" />}
                            </div>
                            {transaction.merchantInfo?.name && (
                              <div className="text-xs text-gray-400 mt-1">{transaction.merchantInfo.name}</div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-cyan-900/20 to-teal-900/20 rounded-lg p-4 border border-cyan-800/50 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-300">Amount</span>
                          <span className="text-sm font-medium text-white">${transaction.amount.toFixed(2)}</span>
                        </div>
                        {transaction.fee > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-300">Transaction Fee</span>
                            <span className="text-sm text-white">${transaction.fee.toFixed(2)}</span>
                          </div>
                        )}
                        {transaction.tax > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-300">Tax</span>
                            <span className="text-sm text-white">${transaction.tax.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t border-cyan-800/50 pt-3 flex justify-between">
                          <span className="text-sm font-semibold text-cyan-300">Net Amount</span>
                          <span className="text-sm font-semibold text-cyan-300">
                            ${transaction.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 pt-8 border-t border-cyan-900/30"
                >
                  <h3 className="text-lg font-semibold text-gray-100 mb-6 flex items-center">
                    <Calendar className="w-5 h-5 text-cyan-400 mr-2" />
                    Transaction Timeline
                  </h3>
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-start space-x-4 p-4 bg-gray-800/30 rounded-lg border border-cyan-900/20"
                    >
                      <div className="w-8 h-8 bg-cyan-900/20 rounded-full flex items-center justify-center border border-cyan-500/50">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-100">Transaction {statusConfig.text}</div>
                        <div className="text-sm text-gray-400">
                          {createdDateTime.date} at {createdDateTime.time}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <NeonButton onClick={() => router.push("/transactions")} color="cyan" size="lg">
              Back to Transactions
            </NeonButton>
            <NeonButton color="teal" size="lg">
              <Receipt className="w-5 h-5 mr-2" />
              Download Receipt
            </NeonButton>
          </motion.div>
        </div>
      </div>
    </div>
  )
}