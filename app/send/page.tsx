"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Send,
  User,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Loader,
  Shield,
  Clock,
  Zap,
  Users,
  ChevronRight,
  Search,
  X,
  Eye,
  EyeOff,
} from "lucide-react"
import { useRouter } from "next/navigation"
import CyberGrid from "@/components/cyber-grid"
import CircuitLines from "@/components/circuit-lines"
import NeonButton from "@/components/neon-button"
import DashboardHeader from "@/components/dashboard-header"
import GlitchText from "@/components/glitch-text"
import { getBalance, getTransactions } from "@/lib/api"
import type { Transaction } from "@/lib/types"
// interface Transaction {
//   id: string
//   receiverUpiId: string
//   amount: number
//   receiverId?: string
//   [key: string]: any
// }

export default function SendMoney() {
  const [upiId, setUpiId] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [balance, setBalance] = useState<number | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionId, setTransactionId] = useState("")
  const [balanceVisible, setBalanceVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const quickAmounts = [50, 100, 200, 500, 1000]
  async function fetchBalance() {
    const bal = await getBalance()
    if (bal !== null) {
      setBalance(bal)
    } else {
      setError("Could not fetch balance")
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const transactions = await getTransactions();
        setTransactions(transactions || []);

        const balance = await getBalance();
        setBalance(balance);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendMoney = async () => {
    setError("")
    setIsLoading(true)

    if (!upiId.trim()) {
      setError("Please enter a valid UPI ID")
      setIsLoading(false)
      return
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      setIsLoading(false)
      return
    }

    if (balance !== null && Number(amount) > balance) {
      setError("Insufficient balance")
      setIsLoading(false)
      return
    }


    try {
      const response = await fetch('https://payment-app-backend-dulq.onrender.com/transaction/send-upi-internal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({
          receiverUpiId: upiId,
          amount: Number(amount)
        })
      });

      const data = await response.json();
      setTransactionId(data.transactionId)
      setSuccess(`Successfully sent $${amount} to ${upiId}`)
      setStep(3)
    } catch (error) {
      console.error("Error sending money:", error)
      setError("Network error. Please try again.")
    }

    setIsLoading(false)
  }

  const handleContactSelect = (contact: Transaction) => {
    setUpiId(contact.receiverUpiId ?? "")
  }

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString())
  }

  const resetForm = () => {
    setUpiId("")
    setAmount("")
    setStep(1)
    setError("")
    setSuccess("")
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const receiverUpiMatch = transaction.receiverUpiId
      ? transaction.receiverUpiId.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    const receiverIdMatch = transaction.receiverId
      ? transaction.receiverId.toLowerCase().includes(searchTerm.toLowerCase())
      : false;

    return receiverUpiMatch || receiverIdMatch;
  });

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
                      <GlitchText
                        className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
                        text="Send Money"
                      />
                      <p className="text-cyan-200/70 mt-1">Quick & Secure Transfer</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-cyan-300">Available Balance</p>
                    <div className="flex items-center">
                      <p className="font-bold text-xl text-white">
                        {balanceVisible && typeof balance === "number"
                          ? `$${balance.toLocaleString()}`
                          : "••••••••"}
                      </p>

                      <button
                        onClick={() => setBalanceVisible(!balanceVisible)}
                        className="ml-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-8 -mt-8 pb-12 relative z-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Main Form */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 overflow-hidden">
                      <div className="p-6 border-b border-cyan-900/30 bg-gray-900/30">
                        <h2 className="text-xl font-bold text-white flex items-center">
                          <Send className="w-5 h-5 text-cyan-400 mr-2" />
                          Transfer Details
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">Enter recipient information and amount</p>
                      </div>

                      <div className="p-6 space-y-6">
                        {/* UPI ID Input */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Recipient UPI ID</label>
                          <div className="relative">
                            <User className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="Enter UPI ID (e.g., user@neonpay)"
                              className="w-full px-4 py-4 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 focus:bg-black/70 text-white"
                            />
                          </div>
                        </div>

                        {/* Amount Input */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">Amount</label>
                          <div className="relative">
                            <DollarSign className="w-5 h-5 text-cyan-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="0.00"
                              className="w-full px-4 py-4 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 focus:bg-black/70 text-xl font-semibold text-white"
                            />
                          </div>

                          {/* Quick Amount Buttons */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {quickAmounts.map((quickAmount, index) => (
                              <motion.button
                                key={quickAmount}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * index }}
                                onClick={() => handleQuickAmount(quickAmount)}
                                className="px-4 py-2 bg-cyan-900/20 text-cyan-400 rounded-lg hover:bg-cyan-800/30 transition-colors text-sm font-medium border border-cyan-800/50 hover:border-cyan-500/50"
                              >
                                ${quickAmount}
                              </motion.button>
                            ))}
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

                        {/* Send Button */}
                        <NeonButton
                          onClick={() => setStep(2)}
                          disabled={!upiId || !amount || Number(amount) <= 0}
                          color="cyan"
                          size="lg"
                        >
                          <span className="flex items-center">
                            Review Transfer
                            <Send className="ml-2 h-4 w-4" />
                          </span>
                        </NeonButton>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Contacts Sidebar */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mb-6"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-teal-900/30 shadow-xl shadow-teal-900/10 overflow-hidden">
                      <div className="p-6 border-b border-teal-900/30 bg-gray-900/30">
                        <h3 className="text-lg font-bold text-white flex items-center">
                          <Users className="w-5 h-5 text-teal-400 mr-2" />
                          Pay Again
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">Quick select from recent transfers</p>
                      </div>

                      <div className="p-4">
                        {/* Search Input */}
                        <div className="relative mb-4">
                          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search contacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pl-9 rounded-lg border border-teal-800/50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all duration-200 bg-black/50 focus:bg-black/70 text-sm text-white"
                          />
                          {searchTerm && (
                            <button
                              onClick={() => setSearchTerm("")}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-800 scrollbar-track-gray-900">
                          {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction, index) => (
                              <motion.button
                                key={transaction.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 * index }}
                                onClick={() => handleContactSelect(transaction)}
                                className="w-full flex items-center space-x-3 p-3 hover:bg-teal-900/20 rounded-xl transition-colors text-left group border border-transparent hover:border-teal-800/50"
                              >
                                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-black font-semibold">
                                  {transaction.receiverId?.charAt(0) || "U"}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-gray-200 truncate">
                                    {transaction.receiverId || transaction.receiverUpiId}
                                  </p>
                                  <p className="text-sm text-gray-400 truncate">{transaction.receiverUpiId}</p>
                                  <p className="text-xs text-teal-400">Last: ${transaction.amount}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                              </motion.button>
                            ))
                          ) : (
                            <div className="text-center py-4 text-gray-400">No contacts found</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Security Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-green-500/20 blur-xl rounded-2xl"></div>
                    <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 p-6 shadow-xl shadow-cyan-900/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <Shield className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-semibold text-white">Secure Transfer</h4>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-3">
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span>256-bit SSL encryption</span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.6 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span>Instant notifications</span>
                        </motion.li>
                        <motion.li
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.7 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span>24/7 fraud monitoring</span>
                        </motion.li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 overflow-hidden">
                    <div className="p-6 border-b border-cyan-900/30 bg-gray-900/30">
                      <h2 className="text-xl font-bold text-white flex items-center">
                        <Shield className="w-5 h-5 text-cyan-400 mr-2" />
                        Confirm Transfer
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">Please review the details before sending</p>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Transfer Summary */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-md rounded-xl"></div>
                        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-800/50">
                          <div className="text-center space-y-4">
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ scale: [0.8, 1.1, 1] }}
                              transition={{ duration: 0.5 }}
                              className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto"
                            >
                              <Send className="w-8 h-8 text-white" />
                            </motion.div>
                            <div>
                              <p className="text-sm text-gray-400">You're sending</p>
                              <motion.p
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-3xl font-bold text-white"
                              >
                                ${amount}
                              </motion.p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400">To</p>
                              <p className="text-lg font-semibold text-cyan-300">{upiId}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Transaction Details */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center py-3 border-b border-cyan-900/30">
                          <span className="text-gray-400">Transaction Fee</span>
                          <span className="font-semibold text-green-400">Free</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-cyan-900/30">
                          <span className="text-gray-400">Processing Time</span>
                          <span className="font-semibold text-white flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-cyan-400" />
                            Instant
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-400">Total Amount</span>
                          <span className="text-xl font-bold text-white">${amount}</span>
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex space-x-4"
                      >
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-3 px-6 border border-cyan-800/50 text-cyan-300 rounded-xl hover:bg-cyan-900/20 transition-colors font-medium"
                        >
                          Back to Edit
                        </button>
                        <NeonButton
                          onClick={handleSendMoney}
                          disabled={isLoading}
                          color="cyan"
                          size="md"
                          className="flex-1"
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <Loader className="w-5 h-5 animate-spin mr-2" />
                              Processing...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Send Money
                              <Send className="ml-2 h-4 w-4" />
                            </span>
                          )}
                        </NeonButton>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
                  <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-green-900/30 shadow-xl shadow-green-900/10 overflow-hidden">
                    <div className="p-8 text-center space-y-6">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100 }}
                        className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mx-auto border border-green-500/50"
                      >
                        <CheckCircle className="w-10 h-10 text-green-400" />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <h2 className="text-2xl font-bold text-white mb-2">Transfer Successful!</h2>
                        <p className="text-gray-400">{success}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-green-500/10 blur-md rounded-xl"></div>
                        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-left border border-green-800/50">
                          <h3 className="font-semibold text-white mb-4 flex items-center">
                            <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                            Transaction Details
                          </h3>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Amount Sent</span>
                              <span className="font-semibold text-white">${amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">To</span>
                              <span className="font-semibold text-cyan-300">{upiId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Transaction ID</span>
                              <span className="font-semibold text-teal-400">{transactionId}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Date & Time</span>
                              <span className="font-semibold text-white">{new Date().toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"
                      >
                        <NeonButton onClick={resetForm} color="cyan" size="md" className="flex-1">
                          Send Another
                        </NeonButton>
                        <NeonButton
                          onClick={() => router.push(`/transactions/${transactionId}`)}
                          color="teal"
                          size="md"
                          className="flex-1"
                        >
                          View Details
                        </NeonButton>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
