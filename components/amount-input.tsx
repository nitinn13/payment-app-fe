"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DollarSign } from "lucide-react"

interface AmountInputProps {
  value: string
  onChange: (value: string) => void
  quickAmounts?: number[]
  maxAmount?: number
  className?: string
}

export default function AmountInput({
  value,
  onChange,
  quickAmounts = [50, 100, 200, 500, 1000],
  maxAmount,
  className,
}: AmountInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (!value) {
      setIsValid(true)
      return
    }

    const numValue = Number(value)
    setIsValid(numValue > 0 && (!maxAmount || numValue <= maxAmount))
  }, [value, maxAmount])

  const handleQuickAmount = (amount: number) => {
    onChange(amount.toString())
  }

  return (
    <div className={className}>
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: isFocused || isHovering ? 1 : 0.5,
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-md rounded-xl -z-10"
        ></motion.div>

        <div className="relative">
          <DollarSign
            className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              isFocused ? "text-cyan-400" : "text-gray-400"
            }`}
          />
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            placeholder="0.00"
            className={`w-full px-4 py-4 pl-10 rounded-xl border transition-all duration-200 bg-black/50 text-xl font-semibold text-white ${
              isFocused
                ? "border-cyan-500 ring-2 ring-cyan-500/20"
                : isValid
                  ? "border-cyan-800/50 hover:border-cyan-700/50"
                  : "border-red-500/50"
            }`}
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
              className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border ${
                value === quickAmount.toString()
                  ? "bg-cyan-800/40 text-cyan-300 border-cyan-500/50"
                  : "bg-cyan-900/20 text-cyan-400 border-cyan-800/50 hover:border-cyan-500/50 hover:bg-cyan-800/30"
              }`}
            >
              ${quickAmount}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
