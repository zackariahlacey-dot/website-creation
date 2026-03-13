'use client'

import { motion } from 'framer-motion'
import { Layout } from 'lucide-react'

export function BlueprintInitializing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden min-h-[80vh]">
      {/* Background Wireframe Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" stroke="white" strokeWidth="0.5">
          <motion.path 
            d="M100 100 L900 100 L900 900 L100 900 Z" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
            d="M100 300 L900 300 M100 600 L900 600 M300 100 L300 900 M600 100 L600 900" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl w-full relative z-10"
      >
        <div className="glass p-[1px] rounded-[60px] border border-white/5 shadow-3xl overflow-hidden bg-zinc-950/20">
          <div className="p-12 md:p-24 relative overflow-hidden hud-grid">
            
            <div className="relative z-10 space-y-12 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-violet-500/10 rounded-[32px] flex items-center justify-center mx-auto border border-violet-500/20 group">
                  <Layout className="w-12 h-12 text-violet-400 animate-pulse group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                    <div className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-[6px] font-black text-amber-500 uppercase tracking-widest">Live_Construction</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter uppercase italic leading-none">
                  Blueprint <br />
                  <span className="text-zinc-700">Initializing.</span>
                </h2>
                <p className="text-zinc-500 text-lg max-w-md mx-auto leading-relaxed">
                  Zack is currently architecting your digital foundation. Your project node will materialize shortly.
                </p>
              </div>

              {/* Construction Log HUD */}
              <div className="bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-left max-w-sm mx-auto">
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Architect_Logs_v4.0</span>
                  <span className="text-[8px] font-black text-violet-500 uppercase tracking-widest animate-pulse">Running</span>
                </div>
                <div className="space-y-2 overflow-hidden h-24 relative text-zinc-500 text-[9px] tracking-wider">
                  <p><span className="text-violet-900">{`>`}</span> ALLOCATING_RESOURCES...</p>
                  <p><span className="text-violet-900">{`>`}</span> FETCHING_MARKET_INTEL...</p>
                  <p><span className="text-violet-900">{`>`}</span> GENERATING_STRATEGY_NODE...</p>
                  <p><span className="text-violet-900">{`>`}</span> SYNCING_WITH_MAIN_ENGINE...</p>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
                </div>
              </div>

              <div className="pt-8">
                <button className="px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                  Signal Architect
                </button>
              </div>
            </div>

            {/* Scanning Laser HUD */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full animate-[scan_8s_linear_infinite] pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Global Telemetry */}
      <div className="absolute bottom-12 left-12 text-left font-mono text-[8px] text-zinc-800 font-bold tracking-[0.5em] uppercase">
        [ PROJECT_NODE: NULL ]
      </div>
      <div className="absolute bottom-12 right-12 text-right font-mono text-[8px] text-zinc-800 font-bold tracking-[0.5em] uppercase">
        [ WAITING_FOR_INITIAL_SYNC ]
      </div>
    </div>
  )
}
