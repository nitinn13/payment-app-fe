"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import NeonButton from "./neon-button"

interface PricingCardProps {
  title: string
  price: string
  description: string
  features: string[]
  ctaText: string
  popular?: boolean
  delay?: number
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  ctaText,
  popular = false,
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative rounded-2xl overflow-hidden",
        popular
          ? "border-2 border-cyan-500/50 bg-gradient-to-b from-cyan-900/20 to-black"
          : "border border-gray-800 bg-black",
      )}
    >
      {popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-cyan-500 text-black text-xs font-bold px-3 py-1 transform rotate-45 translate-x-8 translate-y-3">
            POPULAR
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-4xl font-bold text-white">{price}</span>
            {price !== "Custom" && <span className="text-gray-400 ml-1">+ 20¢ per transaction</span>}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <Check className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <NeonButton href="#" color={popular ? "cyan" : "violet"} size="md">
          {ctaText}
        </NeonButton>
      </div>
    </motion.div>
  )
}
