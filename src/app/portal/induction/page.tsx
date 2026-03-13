'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Play, Rocket, Calendar, FileCode, ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'
import CyberWebBackground from '@/components/landing/CyberWebBackground'

export default function InductionPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      <CyberWebBackground />
      
      {/* Luminous Success Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10px] border border-emerald-500/20 rounded-full border-dashed" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[8px] font-black uppercase tracking-[0.4em]">
              Financial_Node_Synchronized
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter uppercase italic leading-none">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-violet-400">The Team.</span>
            </h1>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Architect Video Node */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-[48px] border border-white/5 overflow-hidden group relative aspect-video bg-zinc-950 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-all shadow-2xl relative z-10">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
            <p className="mt-6 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] relative z-10">Play_Architect_Welcome</p>
            {/* HUD Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
          </motion.div>

          {/* Next Steps Node */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="glass rounded-[48px] border border-white/5 p-10 text-left flex flex-col justify-between"
          >
            <div className="space-y-8">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Next_Phases</h3>
              <div className="space-y-6">
                {[
                  { icon: Calendar, title: "Book Strategy Sync", desc: "Schedule your initial blueprint deep-dive." },
                  { icon: FileCode, title: "Access Asset Vault", desc: "Upload your brand guides and content." },
                  { icon: Rocket, title: "Initialize Build", desc: "Our engine begins the architecture phase." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-violet-500/50 transition-colors shrink-0">
                      <step.icon className="w-4 h-4 text-zinc-500 group-hover:text-violet-400 transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{step.title}</h4>
                      <p className="text-[10px] text-zinc-600 leading-relaxed uppercase font-bold tracking-widest">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engine Maintenance Node */}
              <div className="mt-10 p-6 bg-violet-500/5 border border-violet-500/10 rounded-3xl space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-violet-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Engine_Protection_Active</span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-medium">
                  Your monthly retainer is now synchronized. You have unlocked **unlimited minor tweaks**, premium **managed hosting**, and **real-time security audits**.
                </p>
              </div>
            </div>

            <Link 
              href="/portal" 
              className="mt-10 w-full py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 shadow-2xl"
            >
              Enter My HQ <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="pt-8"
        >
          <Link href="/" className="text-[8px] font-black text-zinc-800 hover:text-zinc-500 uppercase tracking-[0.5em] flex items-center gap-3 mx-auto justify-center group">
            <ArrowLeft className="w-2 h-2 group-hover:-translate-x-1 transition-transform" /> Back to Terminal
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
