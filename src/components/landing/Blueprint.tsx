'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Search, PenTool, Code2, Rocket, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'

const steps = [
  {
    id: "01",
    title: "Strategy",
    description: "We research your local competitors and find the exact keywords that will bring you more business.",
    icon: Search,
    color: "text-blue-400",
    glow: "rgba(59, 130, 246, 0.4)",
    telemetry: "DATA_MINING_v1.2"
  },
  {
    id: "02",
    title: "Design",
    description: "We create a premium visual home for your business that looks great on every device and wins client trust.",
    icon: PenTool,
    color: "text-violet-400",
    glow: "rgba(139, 92, 246, 0.4)",
    telemetry: "UI_ARCHITECT_v3.0"
  },
  {
    id: "03",
    title: "Build",
    description: "I build your custom site using modern tools that make it fast, secure, and ready for launch.",
    icon: Code2,
    color: "text-cyan-400",
    glow: "rgba(6, 182, 212, 0.4)",
    telemetry: "ENGINE_DEPLOY_v2.1"
  },
  {
    id: "04",
    title: "Growth",
    description: "We launch your site and manage the hosting, updates, and SEO so you can focus on running your business.",
    icon: Rocket,
    color: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.4)",
    telemetry: "REVENUE_SCALE_v4.4"
  }
]

export default function Blueprint() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="process" ref={containerRef} className="py-48 px-8 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-32 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-violet-500 uppercase tracking-[0.4em] mb-4"
          >
            Our Methodology
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-bold text-white tracking-tighter"
          >
            The Vizulux Blueprint
          </motion.p>
        </div>

        <div className="relative space-y-40 pb-40">
          {/* Central Energy Path (SVG) */}
          <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-900 -translate-x-1/2 overflow-hidden">
            <motion.div 
              style={{ scaleY: pathLength }}
              className="w-full h-full bg-gradient-to-b from-violet-600 via-rose-400 via-cyan-400 to-emerald-400 origin-top shadow-[0_0_30px_rgba(139,92,246,0.6)]"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative group flex items-center will-change-transform transform-gpu ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Individual Color Spotlight */}
              <div 
                style={{ background: `radial-gradient(circle, ${step.glow.replace('0.4', '0.15')} 0%, transparent 70%)` }}
                className="absolute left-[31px] md:left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 group-hover:opacity-100 transition-all duration-1000 pointer-events-none -z-10" 
              />

              {/* Step Icon Node */}
              <div className="absolute left-[31px] md:left-1/2 -translate-x-1/2 z-20">
                <div className="w-16 h-16 rounded-full bg-black border-2 border-zinc-800 flex items-center justify-center relative group/node">
                  <div 
                    style={{ background: step.glow }}
                    className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]" 
                  />
                  <step.icon className={`w-6 h-6 relative z-10 transition-colors duration-500 ${step.color}`} />
                </div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${i % 2 === 0 ? 'md:pr-10' : 'md:pl-10 text-right'}`}>
                <div className="group relative p-10 rounded-[40px] glass border border-white/5 hover:border-violet-500/50 transition-all duration-700 hud-grid overflow-hidden bg-zinc-950/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Corner Telemetry */}
                  <div className={`absolute top-6 ${i % 2 === 0 ? 'right-6' : 'left-6'} text-[8px] font-bold text-zinc-700 uppercase tracking-widest`}>
                    {step.telemetry}
                  </div>
                  
                  <div className="text-4xl font-black mb-6 opacity-[0.03] group-hover:opacity-10 transition-opacity text-white">
                    {step.id}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-6 tracking-tight group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className={`text-zinc-500 text-lg leading-relaxed group-hover:text-zinc-400 transition-colors ${i % 2 !== 0 ? 'ml-auto' : ''}`}>
                    {step.description}
                  </p>

                  {/* Internal Scanning HUD */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Vizulux Guarantee */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="glass p-12 md:p-20 rounded-[60px] border border-emerald-500/20 bg-emerald-500/[0.02] text-center relative overflow-hidden group">
            {/* Animated Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                Zero Risk Architecture
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                The Vizulux Guarantee
              </h3>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
                I don't believe in deposits. I believe in results. <br />
                <span className="text-white">You don't pay a single cent until your website is perfect and ready for launch.</span>
              </p>
              <div className="pt-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Guarantee Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[120px] -z-10" />
        </motion.div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />
    </section>
  )
}
