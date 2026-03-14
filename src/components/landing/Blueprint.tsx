'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Search, PenTool, Code2, Rocket, CheckCircle2, Zap, Activity, Cpu } from 'lucide-react'
import { useRef } from 'react'

const steps = [
  {
    id: "01",
    title: "Strategy",
    description: "Deep competitor analysis and GEO-targeting calibration to win Vermont market share.",
    icon: Search,
    color: "violet",
    telemetry: "DATA_MINING_v1.2",
    hex: "#8b5cf6"
  },
  {
    id: "02",
    title: "Design",
    description: "Architecting high-fidelity visual homes that command premium authority and trust.",
    icon: PenTool,
    color: "rose",
    telemetry: "UI_ARCHITECT_v3.0",
    hex: "#fb7185"
  },
  {
    id: "03",
    title: "Build",
    description: "Engineering speed-optimized digital engines using the latest Next.js 16 frameworks.",
    icon: Code2,
    color: "cyan",
    telemetry: "ENGINE_DEPLOY_v2.1",
    hex: "#22d3ee"
  },
  {
    id: "04",
    title: "Growth",
    description: "Managing the hosting, security, and SEO nodes so you can focus on scaling operations.",
    icon: Rocket,
    color: "emerald",
    telemetry: "REVENUE_SCALE_v4.4",
    hex: "#10b981"
  }
]

export default function Blueprint() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  })

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <section id="process" ref={containerRef} className="py-32 md:py-64 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Technical Header */}
        <div className="mb-24 md:mb-40 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[8px] md:text-[10px] font-bold text-violet-500 uppercase tracking-[0.4em] mb-8"
          >
            <Cpu className="w-3 h-3" /> Our Approach
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter italic leading-[0.85] uppercase">
            The Success <br /><span className="text-zinc-800">Blueprint.</span>
          </h2>
        </div>

        <div className="relative">
          {/* THE HUD LASER (Mobile & Desktop) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] md:w-[2px] bg-zinc-900 md:-translate-x-1/2">
            <motion.div 
              style={{ scaleY: pathLength }}
              className="w-full h-full bg-gradient-to-b from-violet-500 via-rose-400 via-cyan-400 to-emerald-400 origin-top shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            />
            
            {/* The Active Scanning Node */}
            <motion.div 
              style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full shadow-[0_0_30px_white] z-30"
            >
              <div className="absolute inset-[-10px] border border-white/20 rounded-full animate-ping" />
            </motion.div>
          </div>

          <div className="space-y-32 md:space-y-64 relative z-10">
            {steps.map((step, i) => (
              <StepNode key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* The Guarantee Node */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 md:mt-64 max-w-4xl mx-auto"
        >
          <div className="glass p-10 md:p-20 rounded-[48px] md:rounded-[60px] border border-emerald-500/20 bg-emerald-500/[0.01] text-center relative overflow-hidden group">
            <div className="absolute inset-0 hud-grid opacity-10" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">
                Zero Risk <br /><span className="text-zinc-700">Architecture.</span>
              </h3>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                We don't take deposits. You pay only when your custom engine is <span className="text-white">fully synchronized and live.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StepNode({ step, index }: { step: any, index: number }) {
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 90%", "end 10%"]
  })

  // Peak state happens at 0.3 (lower screen) instead of 0.5 (center)
  const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0.9, 1.05, 0.9])
  const opacity = useTransform(scrollYProgress, [0.05, 0.3, 0.7], [0.3, 1, 0.3])
  const x = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [index % 2 === 0 ? -20 : 20, 0, index % 2 === 0 ? -20 : 20])

  return (
    <motion.div 
      ref={cardRef}
      style={{ scale, opacity, x }}
      className={`flex items-center w-full ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-20' : 'md:pl-20 text-right'}`}>
        <div className="relative group">
          {/* Card Glass */}
          <div className="glass p-8 md:p-12 rounded-[40px] border-white/5 bg-zinc-950/20 overflow-hidden relative hud-grid group-hover:border-white/20 transition-all duration-700">
            
            {/* Header Telemetry */}
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">{step.id}</span>
                <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">{step.telemetry}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                <step.icon className="w-5 h-5 text-zinc-500" />
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-4 italic uppercase">{step.title}</h3>
            <p className="text-zinc-500 text-sm md:text-lg leading-relaxed mb-8 uppercase font-bold tracking-widest md:normal-case md:font-medium">
              {step.description}
            </p>

            {/* Tactical Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[7px] font-black text-zinc-700 uppercase tracking-widest">
                <span>Build Progress</span>
                <span>100%</span>
              </div>
              <div className="h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  style={{ backgroundColor: step.hex }}
                  className="h-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
              </div>
            </div>

            {/* Internal Laser Scan HUD */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-10" />
          </div>

          {/* Background Glow */}
          <div 
            style={{ backgroundColor: step.hex }}
            className="absolute inset-0 blur-[100px] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 -z-10" 
          />
        </div>
      </div>
    </motion.div>
  )
}
