"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  color?: "cyan" | "teal" | "orange"
  size?: "sm" | "md" | "lg"
  className?: string
  disabled?: boolean
}

export default function NeonButton({
  children,
  href,
  onClick,
  color = "cyan",
  size = "md",
  className,
  disabled = false,
}: NeonButtonProps) {
  const colorStyles = {
    cyan: "from-cyan-600 to-blue-600 hover:shadow-cyan-500/25",
    teal: "from-teal-600 to-cyan-600 hover:shadow-teal-500/25",
    orange: "from-orange-600 to-yellow-600 hover:shadow-orange-500/25",
  }

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2",
    lg: "px-8 py-4 text-lg",
  }

  const ButtonContent = () => (
    <motion.span
      className={cn("relative z-10 inline-flex items-center justify-center font-medium group", sizeStyles[size])}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.span>
  )

  const buttonClasses = cn(
    "relative rounded-full overflow-hidden",
    "bg-gradient-to-r text-white font-medium",
    "hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200",
    disabled ? "opacity-50 cursor-not-allowed" : colorStyles[color],
    className,
  )

  // Add glow effect
  const glowClasses = cn(
    "absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    "bg-gradient-to-r blur-md -z-10",
    color === "cyan"
      ? "from-cyan-600/50 to-blue-600/50"
      : color === "teal"
        ? "from-teal-600/50 to-cyan-600/50"
        : "from-orange-600/50 to-yellow-600/50",
  )

  if (href && !disabled) {
    return (
      <a href={href} className={cn("group", buttonClasses)}>
        <div className={glowClasses} />
        <ButtonContent />
      </a>
    )
  }

  return (
    <button onClick={disabled ? undefined : onClick} className={cn("group", buttonClasses)} disabled={disabled}>
      <div className={glowClasses} />
      <ButtonContent />
    </button>
  )
}
