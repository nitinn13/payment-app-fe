"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Shield,
  Zap,
  Globe,
  Lock,
  ChevronDown,
  Menu,
  X,
  BarChart3,
  Wallet,
  Layers,
  Code,
  Smartphone,
  Check,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import CyberGrid from "@/components/cyber-grid"
import GlitchText from "@/components/glitch-text"
import NeonButton from "@/components/neon-button"
import TerminalAnimation from "@/components/terminal-animation"
import PricingCard from "@/components/pricing-card"
import SecurityBadge from "@/components/security-badge"
import FeatureCard from "@/components/feature-card"
import CircuitLines from "@/components/circuit-lines"

export default function NeonPayApp() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-hidden">
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-xl border-b border-cyan-900/30" : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <GlitchText
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
                text="NeonPay"
              />
            </motion.div>

            <nav className="hidden md:flex space-x-8">
              {["Products", "Developers", "Pricing", "Security"].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    i === 0 ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400",
                  )}
                >
                  {item}
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <div className="hidden sm:flex space-x-2">
                <a
                  href="/login"
                  className="text-gray-400 hover:text-cyan-400 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Dashboard
                </a>
                <NeonButton href="/signup" color="cyan">
                  Start Free
                </NeonButton>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-cyan-400"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        <CyberGrid />
        <CircuitLines />

        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-black pointer-events-none"></div>

        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="inline-flex items-center px-3 py-1 rounded-full border border-cyan-800 bg-cyan-900/20 text-cyan-400 text-xs font-medium"
                >
                  <Zap size={12} className="mr-1" />
                  Next-Gen Payment Infrastructure
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    Payments
                    <motion.span
                      className="block bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent"
                      initial={{ backgroundPosition: "0% 50%" }}
                      animate={{ backgroundPosition: "100% 50%" }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                    >
                      For The Digital Age
                    </motion.span>
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-gray-400 leading-relaxed max-w-lg"
                >
                  A complete payment platform engineered for growth. Accept payments worldwide, build financial
                  products, or manage your business online.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <NeonButton href="/signup" color="cyan" size="lg">
                  <span className="flex items-center">
                    Create Account
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </span>
                </NeonButton>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-cyan-800/50 text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all duration-300"
                >
                  Contact Sales
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center space-x-8 text-sm text-gray-400"
              >
                <div className="flex items-center">
                  <Shield className="mr-2 text-cyan-400" size={16} />
                  PCI DSS Level 1
                </div>
                <div className="flex items-center">
                  <Globe className="mr-2 text-cyan-400" size={16} />
                  160+ Currencies
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <TerminalAnimation />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ChevronDown className="text-cyan-400" size={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.08),_rgba(0,0,0,0)_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <p className="text-gray-400 text-lg">Trusted by innovative companies worldwide</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                whileHover={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="h-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent font-bold text-xl">
                  COMPANY {i}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.08),_rgba(0,0,0,0)_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Built for Developers
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our APIs and SDKs are designed to be simple yet powerful, helping you integrate payments quickly
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Code}
              title="Developer-First API"
              description="Well-documented APIs with native libraries for all major programming languages"
              delay={0}
            />
            <FeatureCard
              icon={Layers}
              title="Flexible Integration"
              description="Embed checkout directly or use our hosted payment page with just a few lines of code"
              delay={0.1}
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile SDKs"
              description="Native iOS and Android SDKs for seamless mobile payment experiences"
              delay={0.2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Real-time Analytics"
              description="Comprehensive dashboard with real-time insights into your payment flows"
              delay={0.3}
            />
            <FeatureCard
              icon={Wallet}
              title="Multiple Payment Methods"
              description="Support for cards, digital wallets, bank transfers, and local payment methods"
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Fraud Protection"
              description="Advanced AI-powered fraud detection and prevention systems"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/10 to-black"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                Enterprise-Grade Security
              </h2>
              <p className="text-xl text-gray-400">
                We take security seriously. Our platform is built with multiple layers of protection to keep your data
                and transactions safe.
              </p>

              <div className="space-y-4">
                {[
                  "PCI DSS Level 1 compliant",
                  "End-to-end encryption",
                  "Tokenization for sensitive data",
                  "Two-factor authentication",
                  "24/7 fraud monitoring",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center"
                  >
                    <Check className="text-cyan-400 mr-2 flex-shrink-0" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <NeonButton href="/security" color="cyan">
                  Learn More About Security
                </NeonButton>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-6"
            >
              <SecurityBadge icon={Shield} title="PCI DSS Level 1" delay={0} />
              <SecurityBadge icon={Lock} title="SOC 2 Type II" delay={0.1} />
              <SecurityBadge icon={Globe} title="GDPR Compliant" delay={0.2} />
              <SecurityBadge icon={Zap} title="99.99% Uptime" delay={0.3} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.08),_rgba(0,0,0,0)_50%)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              No hidden fees, no surprises. Just pay for what you use.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="1.9%"
              description="Perfect for new businesses"
              features={[
                "2.9% + 30¢ per transaction",
                "Standard payouts (2-3 days)",
                "Basic fraud protection",
                "24/7 email support",
                "Up to $50,000 in monthly processing",
              ]}
              ctaText="Start for Free"
              popular={false}
              delay={0}
            />
            <PricingCard
              title="Growth"
              price="1.5%"
              description="For growing businesses"
              features={[
                "1.9% + 20¢ per transaction",
                "Fast payouts (1-2 days)",
                "Advanced fraud protection",
                "24/7 priority support",
                "Up to $250,000 in monthly processing",
              ]}
              ctaText="Start 14-Day Trial"
              popular={true}
              delay={0.1}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For large businesses"
              features={[
                "Custom pricing",
                "Instant payouts",
                "Custom fraud rules",
                "Dedicated account manager",
                "Unlimited processing volume",
              ]}
              ctaText="Contact Sales"
              popular={false}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.2),_rgba(0,0,0,0)_70%)]"></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                revolutionize
              </span>{" "}
              your payments?
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10"
          >
            Join thousands of businesses that trust NeonPay for their payment processing needs
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <NeonButton href="/signup" color="cyan" size="lg">
              <span className="flex items-center">
                Create Free Account
                <ExternalLink className="ml-2 h-4 w-4" />
              </span>
            </NeonButton>
            <Button
              variant="outline"
              size="lg"
              className="border-cyan-800/50 text-gray-300 hover:bg-cyan-950/30 hover:text-cyan-300 transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-cyan-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent mb-4">
                NeonPay
              </div>
              <p className="text-gray-400 mb-4">Next-generation payment infrastructure for the digital economy</p>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "GitHub", "YouTube"].map((social, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Documentation", "API Reference"],
              },
              {
                title: "Company",
                links: ["About", "Customers", "Careers", "Blog", "Press"],
              },
              {
                title: "Resources",
                links: ["Support", "Contact", "Privacy", "Terms", "Security"],
              },
            ].map((column, i) => (
              <div key={i}>
                <h3 className="font-semibold text-white mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-cyan-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© 2025 NeonPay, Inc. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-64 bg-gray-900 border-l border-cyan-900/30"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
                    NeonPay
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-cyan-400">
                    <X size={24} />
                  </button>
                </div>
                <nav className="space-y-4">
                  {["Products", "Developers", "Pricing", "Security"].map((item, i) => (
                    <motion.button
                      key={item}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className={cn(
                        "block w-full text-left py-2 px-4 rounded-xl transition-colors",
                        i === 0
                          ? "bg-cyan-900/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-400 hover:bg-cyan-900/10 hover:text-cyan-400",
                      )}
                    >
                      {item}
                    </motion.button>
                  ))}
                  <div className="pt-4 border-t border-gray-800">
                    <div className="space-y-2">
                      <a
                        href="/login"
                        className="block w-full text-gray-400 hover:text-cyan-400 py-2 px-4 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </a>
                      <a
                        href="/signup"
                        className="block w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 px-4 rounded-xl font-semibold text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Start Free
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
