"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronRight, User, Users } from "lucide-react"

interface Contact {
  id: string
  name?: string
  upiId: string
  amount?: number
  [key: string]: any
}

interface ContactListProps {
  contacts: Contact[]
  onSelect: (contact: Contact) => void
  className?: string
}

export default function ContactList({ contacts, onSelect, className }: ContactListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.upiId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.name && contact.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
        <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-teal-900/30 shadow-xl shadow-teal-900/10 overflow-hidden">
          <div className="p-6 border-b border-teal-900/30 bg-gray-900/30">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Users className="w-5 h-5 text-teal-400 mr-2" />
              Contacts
            </h3>
            <p className="text-sm text-gray-400 mt-1">Select a recipient from your contacts</p>
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
                className="w-full px-4 py-2 pl-9 rounded-lg border border-teal-800/50 focus:border-teal-500 focus:ring-teal-500/20 outline-none transition-all duration-200 bg-black/50 focus:bg-black/70 text-sm text-white"
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

            <div className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-800 scrollbar-track-gray-900">
              <AnimatePresence>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact, index) => (
                    <motion.button
                      key={contact.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      onClick={() => onSelect(contact)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-teal-900/20 rounded-xl transition-colors text-left group border border-transparent hover:border-violet-800/50"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-black font-semibold">
                        {contact.name?.charAt(0) || contact.upiId.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-200 truncate">{contact.name || contact.upiId}</p>
                        <p className="text-sm text-gray-400 truncate">{contact.upiId}</p>
                        {contact.amount && <p className="text-xs text-violet-400">Last: ${contact.amount}</p>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400 transition-colors" />
                    </motion.button>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-400"
                  >
                    <User className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                    <p>No contacts found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
