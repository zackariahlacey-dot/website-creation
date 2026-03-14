'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { TrendingUp, Target, Zap, Activity, ShieldAlert, Cpu, Crosshair, Search, Loader2 } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const legacyThreats = [
  { id: "ERR_01", label: "Legacy_Load_Speeds", status: "CRITICAL", fix: "Engine_Ignited" },
  { id: "ERR_02", label: "Static_SEO_Nodes", status: "FAILING", fix: "GEO_Active" },
  { id: "ERR_03", label: "Mobile_Friction", status: "HIGH_RISK", fix: "Fluid_Sync" },
  { id: "ERR_04", label: "Lead_Leakage", status: "UNSTABLE", fix: "Capture_Max" }
]

export default function MarketAuthority() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Creative parallax for the radar background
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="py-32 md:py-64 bg-black relative overflow-hidden px-6 md:px-8">
      {/* BACKGROUND: THE MAINFRAME RADAR */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          style={{ rotate }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-violet-500/10 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-violet-500/40 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-violet-500/40 via-transparent to-transparent" />
        </motion.div>
        <div className="absolute inset-0 hud-grid opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LEFT COLUMN: THE THREAT ANALYSIS */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em]"
            >
              <Target className="w-3 h-3" /> Strategic Analysis: Market Gaps
            </motion.div>

            <h2 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] italic uppercase group">
              Win Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500 group-hover:from-violet-500 group-hover:to-white transition-all duration-1000">Market.</span>
            </h2>

            <div className="space-y-8">
              {/* THE SCANNER HUD (Mobile Exclusive Creativity) */}
              <div className="space-y-4 max-w-md">
                {legacyThreats.map((threat, i) => (
                  <ThreatNode key={threat.id} threat={threat} index={i} />
                ))}
              </div>

              <p className="text-xl md:text-2xl text-zinc-500 leading-tight font-medium max-w-lg">
                Traditional websites are static liabilities. We engineer <span className="text-white">Active Digital Assets</span> that capture market share autonomously.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: THE AUTHORITY CONSOLE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="glass p-1.5 rounded-[60px] border-white/10 shadow-3xl bg-zinc-950/50 backdrop-blur-3xl overflow-hidden relative group">
              <div className="bg-black/40 rounded-[58px] p-10 md:p-16 relative overflow-hidden hud-grid">
                
                {/* Visual Radar Scope */}
                <div className="relative w-full aspect-square md:aspect-auto md:h-96 flex items-center justify-center">
                  {/* Rotating Scanning Beam */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 via-transparent to-transparent rounded-full z-0"
                  />
                  
                  {/* Central Node */}
                  <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full border border-violet-500/30 flex items-center justify-center bg-zinc-950/80 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                    <Cpu className="w-8 h-8 md:w-12 md:h-12 text-violet-400" />
                    <div className="absolute inset-[-10px] border border-violet-500/20 rounded-full animate-ping" />
                  </div>

                  {/* Market Targets - Deterministic for Hydration Stability */}
                  {[
                    { t: '25%', l: '30%' },
                    { t: '65%', l: '75%' },
                    { t: '40%', l: '60%' },
                    { t: '70%', l: '25%' },
                    { t: '30%', l: '80%' }
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5]
                      }}
                      transition={{ 
                        duration: 3, 
                        delay: i * 0.8, 
                        repeat: Infinity 
                      }}
                      style={{
                        top: pos.t,
                        left: pos.l
                      }}
                      className="absolute w-4 h-4 border border-emerald-500/40 rounded-full flex items-center justify-center"
                    >
                      <div className="w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                    </motion.div>
                  ))}
                </div>

                {/* Technical Metadata Bar */}
                <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-end">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-white tracking-widest uppercase">Targeting_Market_Share</p>
                    <div className="flex gap-1">
                      {[1,2,3,4,5,6].map(b => (
                        <div key={b} className="w-4 h-1 bg-violet-500/20 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: b * 0.2 }}
                            className="w-full h-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-[8px] font-mono text-zinc-700 font-bold uppercase text-right space-y-1">
                    <div>[ CACHE: OPTIMIZED ]</div>
                    <div>[ SEO_NODE: VERMONT_PRIMARY ]</div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ThreatNode({ threat, index }: { threat: any, index: number }) {
  const [isPatched, setIsPatched] = useState(false)

  return (
    <motion.div 
      onViewportEnter={() => setTimeout(() => setIsPatched(true), index * 400 + 500)}
      className="relative flex items-center justify-between p-4 rounded-2xl bg-zinc-950/50 border border-white/5 overflow-hidden group/node"
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-1000 ${
          isPatched ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/5 border-red-500/20 text-red-400'
        }`}>
          {isPatched ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
        </div>
        <div>
          <p className="text-[10px] font-black text-white tracking-widest">{threat.label}</p>
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${isPatched ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
            <span className={`text-[7px] font-bold uppercase tracking-widest ${isPatched ? 'text-emerald-600' : 'text-zinc-700'}`}>
              {isPatched ? threat.fix : threat.status}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!isPatched ? (
            <motion.div 
              key="scanning"
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 text-[7px] font-black text-zinc-800 uppercase tracking-widest"
            >
              <Loader2 className="w-2.5 h-2.5 animate-spin" /> Analyzing
            </motion.div>
          ) : (
            <motion.div 
              key="patched"
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-[7px] font-black text-emerald-500 uppercase tracking-widest"
            >
              <CheckCircle2 className="w-2.5 h-2.5" /> Synchronized
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Overwrite Fill */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        transition={{ duration: 1.5, delay: index * 0.4 }}
        className="absolute inset-0 bg-emerald-500/[0.02] pointer-events-none"
      />
    </motion.div>
  )
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  )
}
