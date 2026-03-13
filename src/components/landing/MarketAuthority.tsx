'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Award, ShieldCheck, Target, Zap } from 'lucide-react'

export default function MarketAuthority() {
  return (
    <section className="py-64 px-8 bg-black relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 hud-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.3em]">
            <Target className="w-3 h-3" /> Competitive Intel
          </div>
          
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] italic">
            DEFEAT <br />
            <span className="text-zinc-700">OBSOLESCENCE.</span>
          </h2>

          <div className="space-y-6 max-w-lg">
            <p className="text-2xl text-zinc-400 leading-tight font-medium">
              A standard website is a liability. A Vizulux engine is an asset that <span className="text-white underline decoration-violet-500 underline-offset-8">wins market share</span> while you sleep.
            </p>
            <p className="text-zinc-500 text-lg leading-relaxed">
              In the age of AI-search and Generative Engines, traditional SEO is failing Vermont businesses. We build the architecture that keeps you at the top.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center group-hover:border-violet-500/50 transition-colors">
                <Award className="text-violet-400 w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg">Zero Risk.</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">You don't pay until the results are ready for launch. Absolute accountability.</p>
            </div>
            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                <TrendingUp className="text-emerald-400 w-5 h-5" />
              </div>
              <h4 className="text-white font-bold text-lg">Deep Growth.</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">Continuous support and SEO tweaks included in every monthly partnership.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="glass p-1 rounded-[60px] border border-white/5 group-hover:border-violet-500/20 transition-all duration-1000 shadow-2xl">
            <div className="bg-zinc-950/60 backdrop-blur-3xl rounded-[59px] p-10 md:p-16 relative overflow-hidden hud-grid">
              
              {/* Corner HUD Markers */}
              <div className="absolute top-8 left-8 w-3 h-3 border-t-2 border-l-2 border-zinc-800" />
              <div className="absolute top-8 right-8 w-3 h-3 border-t-2 border-r-2 border-zinc-800" />
              <div className="absolute bottom-8 left-8 w-3 h-3 border-b-2 border-l-2 border-zinc-800" />
              <div className="absolute bottom-8 right-8 w-3 h-3 border-b-2 border-r-2 border-zinc-800" />

              <div className="flex justify-between items-center mb-16">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-[0.3em] mb-1">Market Authority Index</h3>
                  <div className="flex items-center gap-2 text-[8px] text-zinc-600 font-black uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE DATA SYNCHRONIZATION
                  </div>
                </div>
                <div className="text-[10px] font-bold text-violet-400 font-mono">[ 44.47° N, 73.21° W ]</div>
              </div>
              
              {/* Mock Comparison Graph */}
              <div className="h-80 flex items-end gap-4 relative">
                {/* Standard Web Trace */}
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-zinc-800 z-0">
                  <span className="absolute -top-5 left-0 text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Industry Average Ceiling</span>
                </div>

                {[30, 45, 35, 55, 40, 50, 100].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 z-10">
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ delay: i * 0.1, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                      className={`w-full rounded-t-2xl relative group/bar ${
                        i === 6 
                          ? 'bg-gradient-to-t from-violet-600 to-white shadow-[0_0_40px_rgba(139,92,246,0.3)]' 
                          : 'bg-zinc-900 border border-white/5'
                      }`}
                    >
                      {i === 6 && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded">
                          MAX_ROI
                        </div>
                      )}
                    </motion.div>
                    <span className="text-[8px] font-bold text-zinc-700">Q{i + 1}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-zinc-800" />
                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Legacy Systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-sm bg-violet-500" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-widest">Vizulux Engine</span>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-zinc-500 font-mono">V_ARCH_INTEGRITY: 100%</div>
              </div>

              {/* Scan Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
            </div>
          </div>
          
          {/* Decorative Glows */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet-600/10 blur-[100px] -z-10" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/5 blur-[100px] -z-10" />
        </motion.div>
      </div>
    </section>
  )
}
