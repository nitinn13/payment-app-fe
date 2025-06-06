"use client"

import { motion } from "framer-motion"
import { Search, Filter, ArrowUp, ArrowDown } from "lucide-react"

interface FilterPanelProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterType: "all" | "sent" | "received"
  setFilterType: (type: "all" | "sent" | "received") => void
  dateRange: string
  setDateRange: (range: string) => void
  sortBy: "date" | "amount"
  setSortBy: (sort: "date" | "amount") => void
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
  totalTransactions: number
  filteredCount: number
}

export default function FilterPanel({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  dateRange,
  setDateRange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  totalTransactions,
  filteredCount,
}: FilterPanelProps) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-cyan-900/30 p-6 shadow-xl shadow-cyan-900/10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by UPI ID or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-cyan-800/50 rounded-xl bg-black/50 text-gray-200 placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "sent" | "received")}
              className="px-4 py-3 border border-cyan-800/50 rounded-xl bg-black/50 text-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200"
            >
              <option value="all">All Types</option>
              <option value="received">Received</option>
              <option value="sent">Sent</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-3 border border-cyan-800/50 rounded-xl bg-black/50 text-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all duration-200"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Sort Controls */}
            <div className="flex border border-cyan-800/50 rounded-xl overflow-hidden">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "amount")}
                className="px-3 py-3 bg-black/50 text-gray-200 focus:outline-none"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-3 bg-cyan-900/20 text-cyan-400 hover:bg-cyan-800/30 transition-colors border-l border-cyan-800/50"
              >
                {sortOrder === "desc" ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Results Count and Filter Button */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400 font-medium">
            {filteredCount} of {totalTransactions} transactions
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-400 hover:text-cyan-400 hover:bg-cyan-900/20 rounded-lg transition-all duration-200"
          >
            <Filter className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
