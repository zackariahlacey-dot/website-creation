'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Stethoscope, HardHat, Building2, Search, Cpu, Activity, ChevronRight, Zap } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const services = [
  {
    title: "Healthcare & Clinicians",
    description: "Professional, secure platforms built to win patient trust. We handle the technical side so you can focus on care.",
    cta: "Stop Missing Patient Leads",
    icon: Stethoscope,
    id: "MOD_01",
    tag: "CLINICAL_TRUST",
    stats: "HIPAA_READY",
    size: "lg",
    color: "#8b5cf6"
  },
  {
    title: "Construction & Roofing",
    description: "Websites that make your phone ring. We showcase your best work and capture local leads.",
    cta: "Win More Local Contracts",
    icon: HardHat,
    id: "MOD_02",
    tag: "LEAD_FORCE",
    stats: "CONV_MAX",
    size: "sm",
    color: "#ec4899"
  },
  {
    title: "Real Estate & Luxury",
    description: "High-end visual portfolios that sell properties. A digital home for your most exclusive listings.",
    cta: "Showcase Premium Assets",
    icon: Building2,
    id: "MOD_03",
    tag: "VISUAL_STK",
    stats: "ASSET_HD",
    size: "sm",
    color: "#f59e0b"
  },
  {
    title: "The SEO Growth Engine",
    description: "Advanced local SEO and AI-ready optimization. We make sure you are the first one people see in Vermont.",
    cta: "Dominate Google Rankings",
    icon: Search,
    id: "MOD_04",
    tag: "GEO_LOCATE",
    stats: "AI_READY",
    size: "md",
    color: "#10b981"
  }
]

function ServiceCard({ service, index }: { service: typeof services[0], index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative group flex-none w-[85vw] md:w-auto transform-gpu snap-center ${
        service.size === 'lg' ? 'md:col-span-8' : 
        service.size === 'md' ? 'md:col-span-7' : 
        'md:col-span-4'
      }`}
    >
      <div className="h-full bg-zinc-950 border border-white/5 group-hover:border-white/10 lg:group-hover:border-violet-500/20 transition-all duration-500 rounded-[32px] overflow-hidden relative shadow-2xl">
        
        {/* Dynamic Light Track - Works on touch too */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${service.color}15, transparent 80%)`
            )
          }}
        />

        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-white/20 transition-colors" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-white/20 transition-colors" />

        <div className="relative h-full p-8 md:p-10 flex flex-col justify-between text-center md:text-left items-center md:items-start">
          
          <div className="flex justify-between items-start w-full mb-8 relative z-10">
            <span className="text-[10px] font-black tracking-widest opacity-50" style={{ color: service.color }}>{service.id}</span>
            <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[8px] font-black text-zinc-600 uppercase tracking-widest">
              {service.stats}
            </div>
          </div>

          <div className="space-y-8 w-full relative z-10">
            <div className="relative">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-violet-500/20 group-hover:bg-violet-500/5 transition-all duration-500 mx-auto md:mx-0">
                <service.icon className="w-8 h-8 md:w-10 md:h-10 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div className="absolute -inset-2 bg-violet-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full -z-10" style={{ backgroundColor: service.color + '20' }} />
            </div>
            
            <div className="space-y-3">
              <div className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em]">{service.tag}</div>
              <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-tight italic">
                {service.title}
              </h3>
              <p className="text-zinc-500 text-sm md:text-lg leading-relaxed max-w-sm group-hover:text-zinc-400 transition-colors mx-auto md:mx-0">
                {service.description}
              </p>
            </div>

            <a 
              href="#contact"
              className="inline-flex items-center gap-4 px-10 py-5 md:px-0 md:py-2 bg-white md:bg-transparent text-black md:text-zinc-400 rounded-2xl md:rounded-none text-[10px] font-black uppercase tracking-[0.2em] group/btn hover:text-white transition-all shadow-xl md:shadow-none"
            >
              {service.cta}
              <ChevronRight className="w-4 h-4 text-violet-500 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-1000 group-hover:-translate-x-4 group-hover:-translate-y-4 pointer-events-none rotate-12">
            <service.icon className="w-48 h-48 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function BentoServices() {
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
    <section id="services" className="py-20 md:py-48 bg-black relative overflow-hidden">
      <div className="absolute top-20 md:top-40 left-0 right-0 md:left-8 text-[12vw] font-black text-zinc-950 leading-none select-none pointer-events-none text-center md:text-left">
        MODULES
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mb-12 md:mb-24 px-6 text-center md:text-left mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[8px] md:text-[9px] font-bold text-violet-500 uppercase tracking-[0.4em] mb-6"
          >
            <Cpu className="w-3 h-3" /> Our Expertise
          </motion.div>
          
          <div className="relative">
            <h2 className="text-4xl md:text-7xl lg:text-[100px] font-bold text-white tracking-tighter leading-[0.9] italic">
              PREMIUM DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500 uppercase">Experiences.</span>
            </h2>
            <div className="hidden lg:block absolute -bottom-4 left-0 w-32 h-1 bg-violet-500/50 rounded-full" />
          </div>

          <div className="hidden lg:flex items-center gap-12 mt-20 pt-8 border-t border-white/5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em]">Core_Engine</span>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-zinc-400 font-bold tracking-tight">VIZULUX_V4.0_LATEST</span>
                <div className="px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[7px] text-emerald-500 font-black">STABLE</div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.3em]">Build_Performance</span>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-violet-500 rounded-full shadow-[0_0_5px_rgba(139,92,246,0.5)]" />)}
                </div>
                <span className="text-[11px] font-mono text-zinc-400 font-bold ml-2">OPTIMAL</span>
              </div>
            </div>
            <div className="flex-1" />
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.5em]">SYSTEM_READY</span>
              <div className="h-px w-48 bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
            </div>
          </div>
        </div>

        {/* Premium Mobile Horizontal Stream */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto md:grid md:grid-cols-12 gap-6 md:gap-8 pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide px-6 md:px-0"
          >
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>

          {/* Mobile Scroll Progress Indicator */}
          <div className="md:hidden flex flex-col items-center gap-4 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">DRAG_TO_SYNC</span>
              <div className="w-32 h-[1px] bg-zinc-900 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <span className="text-[7px] font-black text-zinc-800 uppercase tracking-widest">MOD_04</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
