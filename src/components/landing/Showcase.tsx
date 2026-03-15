'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Globe, ShieldCheck, Zap, Activity, Cpu } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const projects = [
  {
    title: "Arise & Shine VT",
    url: "https://ariseandshinevt.com",
    tag: "MOBILE_DETAILING_PRO",
    desc: "Luxury automotive preservation engine with high-conversion lead architecture.",
    status: "LIVE_SYNC",
    id: "PROJ_01",
    metrics: "99.9% Uptime",
    latency: "14ms"
  },
  {
    title: "Practice Launch 90",
    url: "https://practicelaunch90.com",
    tag: "HEALTHCARE_ACCELERATOR",
    desc: "Strategic medical practice scaling engine with advanced patient acquisition nodes.",
    status: "LIVE_SYNC",
    id: "PROJ_02",
    metrics: "HIPAA Compliant",
    latency: "18ms"
  },
  {
    title: "Embrace Women's Health",
    url: "https://embracewomenshealthcare.com",
    tag: "HEALTHCARE_ELITE",
    desc: "Sophisticated clinical presence built on secure, patient-first architecture.",
    status: "LIVE_SYNC",
    id: "PROJ_03",
    metrics: "Secure Cloud",
    latency: "12ms"
  },
  {
    title: "Develop Aura",
    url: "https://developauradot.com",
    tag: "MARKETING_INNOVATION",
    desc: "Next-generation digital marketing platform showcasing high-fidelity growth assets.",
    status: "LIVE_SYNC",
    id: "PROJ_04",
    metrics: "AI Ready",
    latency: "9ms"
  }
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="relative group flex-none w-[85vw] md:w-auto transform-gpu snap-center md:col-span-6"
    >
      <a 
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full bg-zinc-950/40 backdrop-blur-3xl border border-white/5 group-hover:border-violet-500/30 transition-all duration-700 rounded-[40px] overflow-hidden relative shadow-2xl"
      >
        {/* Internal HUD Grid */}
        <div className="absolute inset-0 hud-grid opacity-10 group-hover:opacity-20 transition-opacity" />
        
        {/* Dynamic Scan Line */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />

        <div className="relative p-8 md:p-14 flex flex-col justify-between h-full" style={{ transform: "translateZ(50px)" }}>
          {/* Technical Header */}
          <div className="flex justify-between items-start mb-16">
            <div className="space-y-1">
              <span className="text-[10px] font-black text-violet-500 tracking-[0.3em]">{project.id}</span>
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">{project.status}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block text-right">
                <p className="text-[7px] font-black text-zinc-700 uppercase tracking-widest">LATENCY</p>
                <p className="text-[10px] font-mono text-zinc-400 font-bold">{project.latency}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-violet-500/40 group-hover:bg-violet-500/5 transition-all duration-700">
                <ExternalLink className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              <Cpu className="w-2.5 h-2.5" /> {project.tag}
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic leading-none group-hover:translate-x-3 transition-transform duration-700">
              {project.title}
            </h3>
            <p className="text-zinc-500 text-sm md:text-xl leading-relaxed max-w-lg group-hover:text-zinc-400 transition-colors duration-700">
              {project.desc}
            </p>
          </div>

          {/* Bottom Technical Bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-end">
            <div className="space-y-3">
              <div className="flex gap-1.5">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="w-4 h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      className="w-full h-full bg-violet-500/40"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] block">DEPLOYMENT_INTEGRITY_CHECK</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">{project.metrics}</span>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export default function Showcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
        setScrollProgress(progress)
      }
    }
    const el = scrollRef.current
    el?.addEventListener('scroll', handleScroll)
    return () => el?.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="showcase" className="py-20 md:py-64 bg-black relative overflow-hidden">
      {/* Background MODULES text - Centered on Mobile */}
      <div className="absolute top-20 md:top-40 left-0 right-0 md:left-8 text-[12vw] font-black text-zinc-950 leading-none select-none pointer-events-none text-center md:text-left">
        DEPLOYED
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mb-16 md:mb-40 px-6 text-center md:text-left mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[8px] md:text-[9px] font-bold text-violet-500 uppercase tracking-[0.4em] mb-8"
          >
            <ShieldCheck className="w-3 h-3" /> Technical Audit
          </motion.div>
          <h2 className="text-5xl md:text-[100px] font-bold text-white tracking-tighter leading-[0.85] italic">
            ACTIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500 uppercase">Deployments.</span>
          </h2>

          {/* Premium Desktop Architectural Readout */}
          <div className="hidden lg:flex items-center gap-12 mt-20 pt-8 border-t border-white/5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em]">Total_Nodes</span>
              <span className="text-[11px] font-mono text-zinc-400 font-bold">04_ACTIVE_INSTANCES</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em]">Traffic_Load</span>
              <div className="flex gap-0.5">
                {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 6 ? 'bg-violet-500' : 'bg-zinc-900'}`} />)}
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_STABLE</span>
              <div className="h-px w-48 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            </div>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto md:grid md:grid-cols-12 gap-8 md:gap-12 pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide px-6 md:px-0"
          >
            {projects.map((project, i) => (
              <ProjectCard key={i} project={project} index={i} />
            ))}
          </div>

          {/* Mobile Scroll Progress Indicator */}
          <div className="md:hidden flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-3">
              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">DRAG_TO_BROWSE</span>
              <div className="w-32 h-[1px] bg-zinc-900 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">PROJ_04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
