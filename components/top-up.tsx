"use client"

import React, { useEffect, useCallback } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wallet,
  CreditCard,
  Zap,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

interface TopUpProps {
  onTopUpSuccess: (amount: number) => void
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => Promise<void>
  prefill?: Record<string, string>
  notes?: Record<string, string>
  theme?: {
    color: string
  }
  modal?: {
    ondismiss: () => void
  }
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

interface RazorpayError {
  error: {
    code: string
    description: string
    source?: string
    step?: string
    reason?: string
    metadata?: Record<string, unknown>
  }
}

const MIN_AMOUNT = 10
const QUICK_AMOUNTS = [100, 500, 1000, 2000, 5000]

const TopUp: React.FC<TopUpProps> = ({ onTopUpSuccess }) => {
  const [amount, setAmount] = useState<number>(100)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState<boolean>(false)

  useEffect(() => {
    const loadScript = async () => {
      try {
        const loaded = await loadRazorpayScript()
        setRazorpayLoaded(loaded)
      } catch (err) {
        console.error("Failed to load Razorpay script:", err)
        toast.error("Failed to load payment gateway")
      }
    }

    if (!razorpayLoaded) {
      loadScript()
    }
  }, [razorpayLoaded])

  const loadRazorpayScript = useCallback((): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        return resolve(true)
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.onload = () => {
        if ((window as any).Razorpay) {
          resolve(true)
        } else {
          reject(new Error("Razorpay not available after script load"))
        }
      }
      script.onerror = () => reject(new Error("Failed to load Razorpay script"))
      document.body.appendChild(script)
    })
  }, [])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= MIN_AMOUNT) {
      setAmount(value)
    } else if (e.target.value === "") {
      setAmount(0)
    }
  }

  const verifyPayment = async (response: RazorpayResponse, txId: string) => {
    try {
      setLoading(true)
      
      const verifyResponse = await fetch(
        "https://payment-app-backend-dulq.onrender.com/transaction/verify-razorpay-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            transactionId: txId,
            amount: amount,
          }),
        }
      )

      const responseData = await verifyResponse.json()
      
      if (!verifyResponse.ok) {
        throw new Error(responseData.message || "Payment verification failed")
      }

      setSuccess(true)
      onTopUpSuccess(amount)
      toast.success(`₹${amount} added to your wallet successfully!`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment verification failed"
      setError(errorMessage)
      toast.error(errorMessage)
      console.error("Payment verification error:", err)
      
      try {
        await fetch(
          `https://payment-app-backend-dulq.onrender.com/transaction/${transactionId}/fail`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        )
      } catch (e) {
        console.error("Failed to update transaction status:", e)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTopUp = async () => {
    if (amount < MIN_AMOUNT) {
      setError(`Minimum amount is ₹${MIN_AMOUNT}`)
      toast.error(`Minimum amount is ₹${MIN_AMOUNT}`)
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!razorpayLoaded && !(await loadRazorpayScript())) {
        throw new Error("Payment gateway unavailable")
      }

      const orderResponse = await fetch(
        "https://payment-app-backend-dulq.onrender.com/transaction/create-razorpay-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ amount }),
        }
      )

      if (!orderResponse.ok) {
        throw new Error(await orderResponse.text() || "Failed to create payment order")
      }

      const orderData = await orderResponse.json()
      const { orderId, transactionId: txId } = orderData
      setTransactionId(txId)

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: amount * 100,
        currency: "INR",
        name: "NeonPay Wallet TopUp",
        description: `Add ₹${amount} to your NeonPay wallet`,
        order_id: orderId,
        handler: async (response) => {
          try {
            await verifyPayment(response, txId)
          } catch (err) {
            console.error("Error in payment handler:", err)
          }
        },
        prefill: {
          email: localStorage.getItem("email") || "",
          name: localStorage.getItem("name") || "",
        },
        theme: {
          color: "#00ffff",
        },
        modal: {
          ondismiss: () => {
            if (!success) {
              setLoading(false)
              toast.info("Payment window closed")
            }
          }
        }
      }

      const rzp = new (window as any).Razorpay(options)

      rzp.on("payment.failed", (response: RazorpayError) => {
        const errorMsg = response.error.description || "Payment failed"
        setError(errorMsg)
        toast.error(errorMsg)
        setLoading(false)
      })

      rzp.open()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create payment order"
      setError(errorMessage)
      toast.error(errorMessage)
      console.error("TopUp error:", err)
      setLoading(false)
    }
  }

  const resetForm = () => {
    setSuccess(false)
    setTransactionId(null)
    setAmount(100)
    setError(null)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 rounded-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)] rounded-3xl" />

      <Card className="relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-6 sm:p-8 max-w-md mx-auto overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30">
              <Wallet className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Wallet TopUp
            </h2>
          </div>
          <p className="text-gray-400 text-sm">Add funds to your NeonPay wallet securely</p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 border border-green-400/30 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">TopUp Successful!</h3>
                <p className="text-gray-400">₹{amount.toLocaleString()} has been added to your wallet</p>
              </div>

              {transactionId && (
                <div className="mb-6 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
                  <p className="text-xs text-gray-400 mb-1">Transaction ID</p>
                  <p className="text-sm font-mono text-cyan-400 break-all">{transactionId}</p>
                </div>
              )}

              <Button
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 text-white border-0 rounded-xl h-12 font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Make Another TopUp
              </Button>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">Quick Select</label>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_AMOUNTS.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount)}
                      className={`p-3 rounded-xl border transition-all duration-200 text-sm font-medium ${
                        amount === quickAmount
                          ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-500/50 text-cyan-400"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-400 hover:border-gray-600/50 hover:text-gray-300"
                      }`}
                    >
                      ₹{quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3" htmlFor="amount">
                  Custom Amount
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</div>
                  <Input
                    type="number"
                    id="amount"
                    min={MIN_AMOUNT}
                    step="10"
                    value={amount || ""}
                    onChange={handleAmountChange}
                    className="pl-8 bg-gray-800/50 border-gray-700/50 text-white placeholder-gray-500 rounded-xl h-12 focus:border-cyan-500/50 focus:ring-cyan-500/20"
                    placeholder={`Minimum ₹${MIN_AMOUNT}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Minimum amount: ₹{MIN_AMOUNT}
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-xl border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-medium text-white">Secure Payment</span>
                </div>
                <p className="text-xs text-gray-400">Powered by Razorpay • UPI, Cards, Net Banking supported</p>
              </div>

              <Button
                onClick={handleTopUp}
                disabled={loading || amount < MIN_AMOUNT}
                className="w-full bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600 disabled:from-gray-600 disabled:to-gray-700 text-white border-0 rounded-xl h-14 font-semibold text-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />

                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    TopUp ₹{amount.toLocaleString()}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Sparkles className="w-3 h-3" />
                <span>256-bit SSL encrypted • PCI DSS compliant</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}

export default TopUp