'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Search, PenTool, Code2, Rocket, CheckCircle2, Zap, Activity, Cpu, Hexagon } from 'lucide-react'
import { useRef } from 'react'

const steps = [
  {
    id: "01",
    title: "Strategy",
    description: "Deep competitor analysis and GEO-targeting calibration to win Vermont market share.",
    icon: Search,
    color: "violet",
    telemetry: "MARKET_RESEARCH",
    hex: "#8b5cf6"
  },
  {
    id: "02",
    title: "Design",
    description: "Architecting high-fidelity visual homes that command premium authority and trust.",
    icon: PenTool,
    color: "rose",
    telemetry: "UI_DESIGN",
    hex: "#fb7185"
  },
  {
    id: "03",
    title: "Build",
    description: "Engineering speed-optimized digital engines using the latest Next.js 16 frameworks.",
    icon: Code2,
    color: "cyan",
    telemetry: "CODE_OPTIMIZATION",
    hex: "#22d3ee"
  },
  {
    id: "04",
    title: "Growth",
    description: "Managing the hosting, security, and SEO nodes so you can focus on scaling operations.",
    icon: Rocket,
    color: "emerald",
    telemetry: "SEO_GROWTH",
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
    <section id="process" ref={containerRef} className="py-20 md:py-64 bg-black relative overflow-hidden">
      {/* Desktop Blueprint Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        {/* Floating Blueprint Accents */}
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute top-1/4 left-10 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center rotate-12"
        >
          <div className="w-48 h-48 border border-white/5 rounded-full border-dashed animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="text-white/10 w-12 h-12" />
          </div>
        </motion.div>

        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
          className="absolute bottom-1/4 right-10 w-96 h-96 border border-white/5 flex items-center justify-center -rotate-12"
        >
          <div className="w-full h-full border border-white/5 border-dashed" />
          <div className="absolute top-0 left-0 p-4 font-mono text-[8px] text-white/20">
            [ COORDINATE_MAPPING_ACTIVE ]
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Technical Header */}
        <div className="mb-16 md:mb-40 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[8px] md:text-[10px] font-bold text-violet-500 uppercase tracking-[0.4em] mb-8"
          >
            <Cpu className="w-3 h-3" /> Our Approach
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter italic leading-[0.85] uppercase">
            OUR DESIGN <br /><span className="text-zinc-800">PROCESS.</span>
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
              {/* Desktop Only Laser Halo */}
              <div className="hidden lg:block absolute inset-[-40px] bg-white/5 rounded-full blur-xl animate-pulse" />
            </motion.div>
          </div>

          <div className="space-y-20 md:space-y-64 relative z-10">
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
          className="mt-24 md:mt-64 max-w-4xl mx-auto"
        >
          <div className="glass p-10 md:p-20 rounded-[48px] md:rounded-[60px] border border-emerald-500/20 bg-emerald-500/[0.01] text-center relative overflow-hidden group">
            <div className="absolute inset-0 hud-grid opacity-10" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="text-emerald-400 w-8 h-8" />
              </div>
              <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase italic leading-none">
                RISK-FREE <br /><span className="text-zinc-700">DEVELOPMENT.</span>
              </h3>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                We don't take deposits. You pay only when your custom engine is <span className="text-white">fully launched and optimized.</span>
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

  // Peak state adjustments for desktop feel
  const scale = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0.95, 1.05, 0.95])
  const opacity = useTransform(scrollYProgress, [0.05, 0.3, 0.7], [0.4, 1, 0.4])
  const x = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [index % 2 === 0 ? -30 : 30, 0, index % 2 === 0 ? -30 : 30])
  const rotateY = useTransform(scrollYProgress, [0.1, 0.3, 0.6], [index % 2 === 0 ? 10 : -10, 0, index % 2 === 0 ? 10 : -10])

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        scale, 
        opacity, 
        x,
        rotateY: typeof window !== 'undefined' && window.innerWidth > 1024 ? rotateY : 0,
        perspective: 1000
      }}
      className={`flex items-center w-full ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
    >
      <div className={`w-full lg:w-[45%] pl-12 lg:pl-0 ${index % 2 === 0 ? 'lg:pr-20' : 'lg:pl-20 lg:text-right'}`}>
        <div className="relative group">
          {/* Desktop Exclusive Floating Data Points */}
          <div className="hidden lg:block absolute -top-10 -left-10 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="w-full h-full border-t border-l border-white/20" />
            <span className="absolute top-2 left-2 text-[6px] font-mono text-zinc-600">SYS_PT_{step.id}</span>
          </div>

          {/* Card Glass */}
          <div className="glass p-8 md:p-12 rounded-[40px] border-white/5 bg-zinc-950/20 overflow-hidden relative hud-grid group-hover:border-white/20 transition-all duration-700 shadow-2xl">
            
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
                <span>Phase Readiness</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-white"
                >100%</motion.span>
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

            {/* Desktop Exclusive Hover Tech Patterns */}
            <div className="hidden lg:block absolute bottom-4 right-4 opacity-0 group-hover:opacity-10 transition-opacity">
              <Hexagon className="w-12 h-12 text-white" />
            </div>

            {/* Internal Laser Scan HUD */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-10" />
          </div>

          {/* Background Glow */}
          <div 
            style={{ backgroundColor: step.hex }}
            className="absolute inset-0 blur-[100px] opacity-0 group-hover:opacity-[0.07] transition-opacity duration-1000 -z-10" 
          />
        </div>
      </div>
    </motion.div>
  )
}
