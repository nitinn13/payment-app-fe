"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownLeft, Clock } from "lucide-react"

interface Transaction {
  id: string
  transactionType: "sent" | "received"
  receiverUpiId: string
  senderUpiId: string
  amount: number
  category: string
  createdAt: string
}

interface TransactionItemProps {
  transaction: Transaction
  delay: number
}

export default function TransactionItem({ transaction, delay }: TransactionItemProps) {
  const isSent = transaction.transactionType === "sent"

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ backgroundColor: "rgba(34, 211, 238, 0.05)" }}
      className="p-6 hover:bg-cyan-900/10 transition-colors cursor-pointer border-l-2 border-transparent hover:border-cyan-500"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isSent
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
}
