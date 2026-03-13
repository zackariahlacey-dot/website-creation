'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Layout, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'

export default function ProjectInitModal({ 
  isOpen, 
  onClose, 
  onConfirm,
  clientName 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: (name: string) => void,
  clientName: string 
}) {
  const [projectName, setProjectName] = useState(`${clientName}'s Build`)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim()) {
      onConfirm(projectName)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-3xl overflow-hidden hud-grid"
          >
            {/* Corner Markers */}
            <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-zinc-700" />
            <div className="absolute top-6 right-6 w-2 h-2 border-t border-r border-zinc-700" />

            <div className="relative z-10 space-y-10">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center border border-violet-500/20 shadow-inner">
                  <Layout className="w-8 h-8 text-violet-400" />
                </div>
                <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[8px] font-black uppercase tracking-[0.3em]">
                  Initialize_New_Build_Node
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight italic">Blueprint Naming</h3>
                <p className="text-zinc-500 text-xs tracking-wide">
                  Assign a unique identifier to this client project in the mainframe.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Blueprint Name</label>
                  <input 
                    autoFocus
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-violet-500 focus:bg-white/10 outline-none transition-all duration-300 text-lg"
                    placeholder="Enter project name..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 tracking-widest text-xs"
                >
                  ACTIVATE BUILD SEQUENCE
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Internal Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full animate-[scan_10s_linear_infinite] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
