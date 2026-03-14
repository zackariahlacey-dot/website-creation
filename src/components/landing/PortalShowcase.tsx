'use client'

import { motion } from 'framer-motion'
import { Layout, Shield, Cloud, MessageSquare, ChevronRight } from 'lucide-react'

export default function PortalShowcase({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <section className="py-20 md:py-64 px-8 bg-black relative overflow-hidden">
      {/* Background HUD Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-violet-600/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-10">
            <Shield className="w-3 h-3" /> Exclusive Access
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] italic mb-12">
            YOUR <br />
            <span className="text-zinc-700">DIGITAL HQ.</span>
          </h2>
          <p className="text-2xl text-zinc-400 leading-tight font-medium max-w-lg mb-8">
            Stop wondering where your project stands. <span className="text-white">The Vizulux Portal</span> is your high-fidelity command center for every phase of the build.
          </p>
          
          <div className="space-y-8 pt-4 w-full text-center md:text-left flex flex-col items-center md:items-start">
            {[
              { icon: Layout, title: "Real-Time Tracking", desc: "Watch your website's engine come to life with a live project timeline." },
              { icon: Cloud, title: "Secure Asset Vault", desc: "Drag and drop logos, content, and feedback directly into our secure cloud." },
              { icon: MessageSquare, title: "Direct Architect Feed", desc: "Instant updates and technical notes directly from my terminal to yours." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center group-hover:border-violet-500/50 transition-colors shrink-0">
                  <item.icon className="text-violet-400 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pt-12"
          >
            <a 
              href={isLoggedIn ? "/portal" : "#contact"} 
              className="inline-flex items-center gap-4 px-10 py-5 bg-zinc-950/50 backdrop-blur-3xl border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-[0.4em] hover:bg-white/5 hover:border-violet-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.1)] transition-all duration-700 group/btn"
            >
              {isLoggedIn ? "Enter Digital HQ" : "Request Architect Access"}
              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover/btn:text-violet-400 group-hover/btn:translate-x-1 transition-all" />
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Tilted Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: -10 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative order-1 lg:order-2 perspective-1000"
        >
          <div className="glass p-1.5 rounded-[50px] border-white/10 shadow-3xl bg-gradient-to-br from-white/10 to-transparent rotate-3">
            <div className="bg-zinc-950/80 backdrop-blur-3xl rounded-[48px] p-8 aspect-video relative overflow-hidden hud-grid border border-white/5">
              
              {/* Mock Dashboard UI */}
              <div className="flex gap-6 h-full">
                <div className="w-1/4 space-y-4 border-r border-white/5 pr-6 hidden sm:block">
                  <div className="h-4 w-3/4 bg-white/10 rounded-full" />
                  <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                  <div className="pt-8 space-y-4">
                    <div className="h-8 w-full bg-violet-500/20 rounded-xl border border-violet-500/20" />
                    <div className="h-8 w-full bg-white/5 rounded-xl" />
                    <div className="h-8 w-full bg-white/5 rounded-xl" />
                  </div>
                </div>
                <div className="flex-1 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="h-6 w-32 bg-white/20 rounded-full" />
                    <div className="h-6 w-6 bg-white/10 rounded-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-20 bg-white/5 rounded-2xl border border-white/5" />
                    <div className="h-20 bg-white/5 rounded-2xl border border-white/5" />
                    <div className="h-20 bg-violet-500/10 rounded-2xl border border-violet-500/20" />
                  </div>
                  <div className="h-32 w-full bg-zinc-900/50 rounded-3xl border border-white/5 p-6 space-y-4">
                    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-violet-500" />
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 w-20 bg-white/10 rounded-full" />
                      <div className="h-3 w-12 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* HUD Scan Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent h-1/3 w-full animate-[scan_8s_linear_infinite] pointer-events-none" />
            </div>
          </div>
          
          {/* Dashboard Float Glow */}
          <div className="absolute -inset-10 bg-violet-500/10 blur-[100px] -z-10 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
