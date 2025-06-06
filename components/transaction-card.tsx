"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, MoreHorizontal, Clock, CheckCircle, AlertCircle, Loader } from "lucide-react"

// interface Transaction {
//   id: string
//   amount: number
//   transactionType: "sent" | "received"
//   createdAt: string
//   receiverUpiId?: string
//   senderUpiId?: string
//   category?: string
//   status?: "completed" | "pending" | "failed"
// }
import type { Transaction } from "@/lib/types"
interface TransactionCardProps {
  transaction: Transaction
  delay: number
  onClick: () => void
  formatDate: (date: string) => string
  formatTime: (date: string) => string
  formatAmount: (amount: number, type: string) => string
  getTransactionDescription: (transaction: Transaction) => string
}

export default function TransactionCard({
  transaction,
  delay,
  onClick,
  formatDate,
  formatTime,
  formatAmount,
  getTransactionDescription,
}: TransactionCardProps) {
  const isSent = transaction.transactionType === "sent"

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Loader className="w-4 h-4 text-yellow-400 animate-spin" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-400" />
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "pending":
        return "text-yellow-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-green-400"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{
        backgroundColor: "rgba(34, 211, 238, 0.05)",
        borderColor: "rgba(34, 211, 238, 0.3)",
        scale: 1.01,
      }}
      onClick={onClick}
      className="p-6 hover:bg-cyan-900/10 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-cyan-500 group"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Transaction Icon */}
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:scale-110 ${
                isSent
                  ? "bg-red-900/20 text-red-400 border-red-800/50 group-hover:border-red-500/50"
                  : "bg-green-900/20 text-green-400 border-green-800/50 group-hover:border-green-500/50"
              }`}
            >
              {isSent ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
            </div>
            <div className="absolute -bottom-1 -right-1">{getStatusIcon(transaction.status)}</div>
          </div>

          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <p className="font-semibold text-gray-100 truncate">{getTransactionDescription(transaction)}</p>
              {transaction.category && (
                <span className="px-2 py-1 text-xs rounded-full bg-cyan-900/20 text-cyan-400 border border-cyan-800/50">
                  {transaction.category}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>ID: {transaction.id}</span>
              <span>•</span>
              <span className={getStatusColor(transaction.status)}>
                {transaction.status?.charAt(0).toUpperCase() + (transaction.status?.slice(1) || "")}
              </span>
            </div>
          </div>

          {/* Date and Time */}
          <div className="text-right hidden sm:block">
            <div className="text-sm font-medium text-gray-100">{formatDate(transaction.createdAt)}</div>
            <div className="text-xs text-gray-400 flex items-center justify-end">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(transaction.createdAt)}
            </div>
          </div>

          {/* Amount */}
          <div className="text-right">
            <div
              className={`text-lg font-bold ${
                isSent ? "text-red-400" : "text-green-400"
              } group-hover:scale-105 transition-transform duration-200`}
            >
              {formatAmount(transaction.amount, transaction.transactionType)}
            </div>
            <div className="text-xs text-gray-400">{isSent ? "Sent" : "Received"}</div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation()
              // Handle action menu
            }}
          >
            <MoreHorizontal className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
