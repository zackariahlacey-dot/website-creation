'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield, ChevronRight, X, Lock } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function SignupModal({ 
  isOpen, 
  onClose, 
  initialEmail 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  initialEmail: string 
}) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email: initialEmail,
      password,
      options: {
        data: {
          full_name: 'New Prospect', // We'll update this from the lead data in the trigger
        }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = '/portal' // Redirect to the portal
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-[40px] p-8 md:p-12 shadow-3xl overflow-hidden hud-grid"
          >
            {/* Corner Markers */}
            <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-zinc-700" />
            <div className="absolute top-6 right-6 w-2 h-2 border-t border-r border-zinc-700" />

            <div className="relative z-10 text-center space-y-8">
              <div className="w-20 h-20 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto border border-violet-500/20">
                <Shield className="w-10 h-10 text-violet-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-white tracking-tight">Secure Your Portal</h3>
                <p className="text-zinc-500 text-sm tracking-wide">
                  Create a password to access your <span className="text-white">Digital HQ</span> and track your build in real-time.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Assigned Email</label>
                  <input 
                    disabled
                    value={initialEmail}
                    className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-zinc-400 outline-none cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1">Create Password</label>
                  <div className="relative">
                    <input 
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-6 py-4 bg-white/5 border border-white/5 rounded-2xl text-white focus:border-violet-500 outline-none transition-all"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                  </div>
                </div>

                {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</p>}

                <button 
                  disabled={loading}
                  className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 tracking-widest text-xs"
                >
                  {loading ? 'INITIALIZING...' : 'ACTIVATE DIGITAL HQ'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              <button 
                onClick={onClose}
                className="text-[10px] font-bold text-zinc-700 hover:text-zinc-400 transition-colors uppercase tracking-[0.3em]"
              >
                I'll set this up later
              </button>
            </div>

            {/* Internal Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full animate-[scan_10s_linear_infinite] pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
