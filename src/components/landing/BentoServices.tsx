'use client'

import { motion } from 'framer-motion'
import { Stethoscope, HardHat, Building2, Search, Cpu, Activity, Database, Fingerprint } from 'lucide-react'

const services = [
  {
    title: "Healthcare & Clinicians",
    description: "Professional, secure platforms built to win patient trust. We handle the technical side so you can focus on care.",
    icon: Stethoscope,
    id: "MOD_01",
    tag: "CLINICAL_TRUST",
    stats: "HIPAA_READY",
    size: "lg"
  },
  {
    title: "Construction & Roofing",
    description: "Websites that make your phone ring. We showcase your best work and capture local leads.",
    icon: HardHat,
    id: "MOD_02",
    tag: "LEAD_FORCE",
    stats: "CONV_MAX",
    size: "sm"
  },
  {
    title: "Real Estate & Luxury",
    description: "High-end visual portfolios that sell properties. A digital home for your most exclusive listings.",
    icon: Building2,
    id: "MOD_03",
    tag: "VISUAL_STK",
    stats: "ASSET_HD",
    size: "sm"
  },
  {
    title: "The SEO Growth Engine",
    description: "Advanced local SEO and AI-ready optimization. We make sure you are the first one people see in Vermont.",
    icon: Search,
    id: "MOD_04",
    tag: "GEO_LOCATE",
    stats: "AI_READY",
    size: "md"
  }
]

export default function BentoServices() {
  return (
    <section id="services" className="py-64 px-8 bg-black relative">
      {/* Subtle Background Text */}
      <div className="absolute top-40 left-8 text-[12vw] font-black text-zinc-950 leading-none select-none pointer-events-none">
        MODULES
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md text-[10px] font-bold text-violet-500 uppercase tracking-[0.4em] mb-10"
          >
            <Cpu className="w-3 h-3" /> System Architecture
          </motion.div>
          <h2 className="text-6xl md:text-[90px] font-bold text-white tracking-tighter leading-[0.85] italic mb-12">
            HIGH-END WEBSITES <br />
            <span className="text-zinc-800">FOR BUSINESSES THAT MEAN BUSINESS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`relative group will-change-transform transform-gpu ${
                service.size === 'lg' ? 'md:col-span-8' : 
                service.size === 'md' ? 'md:col-span-7' : 
                'md:col-span-4'
              }`}
            >
              {/* The "Module Rack" Frame */}
              <div className="h-full bg-zinc-950/20 backdrop-blur-3xl p-1 rounded-[48px] border border-white/5 group-hover:border-violet-500/30 transition-all duration-700 relative overflow-hidden shadow-2xl">
                
                <div className="relative h-full p-10 md:p-14 flex flex-col justify-between hud-grid rounded-[46px] overflow-hidden group/card">
                  
                  {/* Internal Technical Schematics (SVG Background) */}
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.1" />
                      <path d="M10 10 L90 90 M90 10 L10 90" stroke="currentColor" strokeWidth="0.1" />
                      <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.1" />
                    </svg>
                  </div>

                  {/* Laser Scan Line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent h-1/4 w-full -translate-y-full group-hover/card:animate-scan pointer-events-none" />

                  {/* Header: ID and Status */}
                  <div className="flex justify-between items-start relative z-10 mb-12">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black text-violet-500 tracking-widest">{service.id}</span>
                      <div className="flex items-center gap-2">
                        <Activity className="w-2.5 h-2.5 text-zinc-700 group-hover/card:text-emerald-500 transition-colors" />
                        <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest group-hover/card:text-zinc-500 transition-colors">
                          Status: Optimal
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                      {service.stats}
                    </div>
                  </div>

                  {/* Content Node */}
                  <div className="relative z-10 space-y-8">
                    <div className="w-20 h-20 rounded-[28px] bg-white/5 flex items-center justify-center border border-white/5 group-hover/card:border-violet-500/40 group-hover/card:bg-violet-500/5 transition-all duration-700 group/icon shadow-inner">
                      <service.icon className="w-10 h-10 text-zinc-600 group-hover/card:text-violet-400 group-hover/card:scale-110 transition-all duration-700" />
                    </div>
                    
                    <div>
                      <div className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-3">{service.tag}</div>
                      <h3 className="text-4xl font-bold text-white mb-6 tracking-tighter leading-none group-hover/card:text-white transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-zinc-500 text-lg leading-relaxed max-w-sm group-hover/card:text-zinc-400 transition-colors duration-700">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Readout */}
                  <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-end relative z-10">
                    <div className="space-y-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((b) => (
                          <div key={b} className={`w-3 h-1 rounded-full transition-colors duration-1000 ${i % 2 === 0 ? 'bg-violet-500/20 group-hover/card:bg-violet-500' : 'bg-zinc-800'}`} />
                        ))}
                      </div>
                      <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Architectural Integrity Check</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Database className="w-3 h-3 text-zinc-800" />
                      <Fingerprint className="w-3 h-3 text-zinc-800" />
                    </div>
                  </div>

                  {/* Focal Glow */}
                  <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-600/5 blur-[100px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
