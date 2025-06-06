"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Search,
  Shield,
  UserPlus,
  Send,
  AlertCircle,
  Users,
  X,
  ChevronRight,
  Star,
  MoreVertical,
} from "lucide-react"
import { useRouter } from "next/navigation"
import CyberGrid from "@/components/cyber-grid"
import CircuitLines from "@/components/circuit-lines"
import DashboardHeader from "@/components/dashboard-header"
import GlitchText from "@/components/glitch-text"
import NeonButton from "@/components/neon-button"
import LoadingSpinner from "@/components/loading-spinner"

interface Contact {
  id?: string
  name: string
  upiId?: string
  verified?: boolean
  favorite?: boolean
  lastTransaction?: {
    amount: number
    date: string
  }
  [key: string]: any
}

export default function Contacts() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "verified" | "favorites">("all")
  const router = useRouter()

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/all-users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }

        const result = await response.json();

        // Handle different possible response structures
        const contactsData: Contact[] = result.contacts || result.users || result.data || [];
        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching contacts:", error)
        setError("Failed to fetch contacts. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [])

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.upiId && contact.upiId.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "verified" && contact.verified) ||
      (selectedFilter === "favorites" && contact.favorite)

    return matchesSearch && matchesFilter
  })

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const toggleFavorite = (contactId: string) => {
    setContacts((prev) =>
      prev.map((contact) => (contact.id === contactId ? { ...contact, favorite: !contact.favorite } : contact)),
    )
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
            <h2 className="text-xl font-semibold text-gray-100 mb-2">Error Loading Contacts</h2>
            <p className="text-gray-400 mb-6">{error}</p>
            <NeonButton onClick={() => window.location.reload()} color="cyan">
              Try Again
            </NeonButton>
          </div>
        </motion.div>
      </div>
    )
  }

  if (!contacts || contacts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-gray-200 relative overflow-hidden">
        <CyberGrid />
        <CircuitLines />

        <div className="relative z-10">
          <DashboardHeader user={{ name: "Neo", email: "neo@neonpay.com" }} />

          <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
              <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-teal-900/30 shadow-xl shadow-teal-900/10 p-8 max-w-md w-full text-center">
                <div className="w-20 h-20 bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-500/50">
                  <Users className="w-10 h-10 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">No Contacts Yet</h2>
                <p className="text-gray-400 mb-8">Start building your network by adding your first contact.</p>
                <NeonButton onClick={() => router.push("/add-contact")} color="teal" size="lg">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Add Your First Contact
                </NeonButton>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

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
            <div className="max-w-7xl mx-auto">
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
                    text="My Contacts"
                  />
                  <p className="text-cyan-200/70 mt-1">Manage your payment network</p>
                </div>
              </div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-cyan-800/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-cyan-900/20 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{contacts.length}</p>
                      <p className="text-cyan-200/70 text-sm">Total Contacts</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{contacts.filter((c) => c.verified).length}</p>
                      <p className="text-cyan-200/70 text-sm">Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-900/20 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{contacts.filter((c) => c.favorite).length}</p>
                      <p className="text-cyan-200/70 text-sm">Favorites</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-8 -mt-8 pb-12 relative z-10">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-2xl"></div>
            <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 shadow-xl shadow-cyan-900/10 overflow-hidden">
              {/* Search and Filter Bar */}
              <div className="p-6 border-b border-cyan-900/30 bg-gray-900/30">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by name or UPI ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-cyan-800/50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200 bg-black/50 text-white"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex space-x-2">
                    {[
                      { key: "all", label: "All", icon: Users },
                      { key: "verified", label: "Verified", icon: Shield },
                      { key: "favorites", label: "Favorites", icon: Star },
                    ].map(({ key, label, icon: Icon }) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFilter(key as any)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedFilter === key
                            ? "bg-cyan-600 text-white"
                            : "bg-gray-800/50 text-gray-300 hover:bg-cyan-900/30 hover:text-cyan-300"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  Showing {filteredContacts.length} of {contacts.length} contacts
                </div>
              </div>

              {/* Contacts List */}
              <div className="divide-y divide-cyan-900/20">
                <AnimatePresence>
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact, index) => (
                      <motion.div
                        key={contact.id || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{
                          backgroundColor: "rgba(34, 211, 238, 0.05)",
                          borderColor: "rgba(34, 211, 238, 0.3)",
                        }}
                        className="p-6 hover:bg-cyan-900/10 transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-cyan-500 group"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Avatar */}
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-110">
                              {getInitials(contact.name)}
                            </div>
                            {contact.verified && (
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                                <Shield className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>

                          {/* Contact Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-lg font-semibold text-gray-100 truncate group-hover:text-cyan-300 transition-colors">
                                {contact.name}
                              </h3>
                              {contact.favorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                            </div>
                            <p className="text-gray-400 truncate font-mono text-sm mb-1">{contact.upiId}</p>
                            {contact.lastTransaction && (
                              <p className="text-xs text-gray-500">
                                Last: ${contact.lastTransaction.amount} •{" "}
                                {new Date(contact.lastTransaction.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFavorite(contact.id!)
                              }}
                              className={`p-2 rounded-lg transition-all duration-200 ${contact.favorite
                                  ? "bg-yellow-900/20 text-yellow-400 hover:bg-yellow-800/30"
                                  : "bg-gray-800/50 text-gray-400 hover:bg-yellow-900/20 hover:text-yellow-400"
                                }`}
                            >
                              <Star className={`w-4 h-4 ${contact.favorite ? "fill-current" : ""}`} />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => router.push(`/send?upi=${contact.upiId}`)}
                              className="bg-cyan-600 text-white p-2 rounded-lg hover:bg-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                              title="Send Money"
                            >
                              <Send className="w-4 h-4" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </motion.button>

                            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-12 text-center">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-100 mb-2">No matches found</h3>
                      <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
                      <NeonButton onClick={() => router.push("/add-contact")} color="cyan">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add New Contact
                      </NeonButton>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Action Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => router.push("/add-contact")}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 border-2 border-cyan-400/50 z-50"
          title="Add New Contact"
        >
          <UserPlus className="w-6 h-6" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-xl rounded-full -z-10"></div>
        </motion.button>
      </div>
    </div>
  )
}
