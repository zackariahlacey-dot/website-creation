'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ChevronRight, Cpu } from 'lucide-react'
import { useEffect, useState } from 'react'

export function WelcomeSuccess({ name }: { name: string }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('vizulux_welcome_seen')
    if (!hasSeenWelcome) {
      setShow(true)
    }
  }, [])

  const handleDismiss = () => {
    setShow(false)
    sessionStorage.setItem('vizulux_welcome_seen', 'true')
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 hud-grid opacity-20" />

          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="max-w-2xl w-full glass p-[1px] rounded-[60px] border border-violet-500/30 relative z-10 shadow-[0_0_100px_rgba(139,92,246,0.2)]"
          >
            <div className="bg-zinc-950/80 rounded-[59px] p-12 md:p-20 text-center relative overflow-hidden">
              {/* Internal Scan HUD */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full animate-[scan_4s_linear_infinite] pointer-events-none" />

              <div className="relative z-10 space-y-10">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-black border border-white/10 rounded-xl flex items-center justify-center shadow-xl"
                  >
                    <Cpu className="w-4 h-4 text-violet-400 animate-pulse" />
                  </motion.div>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[8px] font-black uppercase tracking-[0.4em]">
                    Identity_Verified_Authorized
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-tight">
                    WELCOME, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">{name.split(' ')[0]}</span>.
                  </h2>
                  <p className="text-zinc-400 text-lg font-medium leading-relaxed max-w-sm mx-auto italic">
                    "It's a pleasure to work with you. I have initialized your project node and am ready to architect your vision."
                  </p>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleDismiss}
                    className="px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 mx-auto shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                  >
                    Enter My HQ <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Large Background Name */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">
            {name.split(' ')[0]}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
