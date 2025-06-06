"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

export default function TerminalAnimation() {
  const [text, setText] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [currentLine, setCurrentLine] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)

  const lines = [
    "$ npm install @neonpay/js",
    "Installing packages...",
    "✓ Packages installed successfully",
    "$ import { NeonPay } from '@neonpay/js'",
    "$ const neonpay = new NeonPay({",
    "    apiKey: 'np_test_1234567890',",
    "    environment: 'test'",
    "  })",
    "$ const payment = await neonpay.createPayment({",
    "    amount: 2500,",
    "    currency: 'usd',",
    "    description: 'Order #1234'",
    "  })",
    "$ console.log(payment.id)",
    "pay_28a9ds8f7a9sd87f9asd8f7",
    "$ neonpay.confirmPayment(payment.id)",
    "✓ Payment confirmed successfully",
  ]

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= lines.length) return

    const timeout = setTimeout(() => {
      setText("")
      let i = 0
      const typingInterval = setInterval(() => {
        setText((prev) => prev + lines[currentLine][i])
        i++
        if (i >= lines[currentLine].length) {
          clearInterval(typingInterval)
          setTimeout(() => {
            setCurrentLine((prev) => prev + 1)
          }, 500)
        }
      }, 30)

      return () => clearInterval(typingInterval)
    }, 500)

    return () => clearTimeout(timeout)
  }, [currentLine, lines])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [text])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 blur-xl rounded-xl transform scale-105"></div>
      <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-cyan-800/50 shadow-xl shadow-cyan-900/20">
        <div className="bg-gray-800 px-4 py-2 flex items-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-sm mx-auto">Terminal</div>
        </div>
        <div
          ref={terminalRef}
          className="p-4 font-mono text-sm text-gray-300 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
        >
          {lines.slice(0, currentLine).map((line, i) => (
            <div key={i} className="mb-1">
              {line}
            </div>
          ))}
          <div>
            {text}
            <span
              className={`inline-block w-2 h-4 bg-cyan-400 ml-0.5 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
            ></span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
