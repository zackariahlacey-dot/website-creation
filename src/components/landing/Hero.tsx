'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ChevronRight, ShieldCheck, Zap, MousePointer2, Activity } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

export default function Hero({ city }: { city: string }) {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax transforms - Calibrated for mobile persistence
  const y1 = useTransform(scrollY, [0, 800], [0, 300])
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 1, 0])
  
  // Mouse tracking for the "Refractive" feel
  const [mousePos, setMouseState] = useState({ x: 0, y: 0 })
  const springX = useSpring(0, { stiffness: 50, damping: 20 })
  const springY = useSpring(0, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = (clientX / innerWidth - 0.5) * 40
      const y = (clientY / innerHeight - 0.5) * 40
      springX.set(x)
      springY.set(y)
      setMouseState({ x: clientX, y: clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [springX, springY])

  return (
    <section ref={containerRef} className="relative min-h-[115vh] flex items-center justify-center bg-black overflow-hidden pt-20 cursor-default">
      {/* Immersive Background Engine */}
      <div className="absolute inset-0 z-0">
        {/* Mouse-Follower Glow */}
        <motion.div 
          className="absolute w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[160px] pointer-events-none"
          style={{ 
            left: mousePos.x - 400, 
            top: mousePos.y - 400,
            transition: 'left 0.1s ease-out, top 0.1s ease-out'
          }}
        />
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] light-leak-violet opacity-40" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] light-leak-amber opacity-30 blur-[160px]" />
        
        <motion.div 
          className="absolute bottom-0 left-[-10%] right-[-10%] h-[60vh] opacity-30"
          style={{
            x: springX,
            y: springY,
            backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
            transform: 'perspective(1200px) rotateX(65deg) translateY(100px)',
            translateZ: 0
          }}
        />
      </div>

      {/* Floating Metadata Readouts */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-1/4 left-10 space-y-1 font-mono text-[8px] text-zinc-800 font-bold tracking-widest uppercase">
          <div>[ V_ARCH_v4.0 ]</div>
          <div>[ LAT: 44.47, LONG: -73.21 ]</div>
          <div className="text-violet-900">SYSTEM_ARMED</div>
        </div>
        <div className="absolute bottom-1/4 right-10 space-y-1 font-mono text-[8px] text-zinc-800 font-bold tracking-widest uppercase text-right">
          <div>[ DEPLOY_INTEGRITY: 100% ]</div>
          <div>[ CACHE: OPTIMIZED ]</div>
          <div className="text-amber-900">LUXURY_HUD_ACTIVE</div>
        </div>
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-20 w-full max-w-7xl px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        <div className="lg:col-span-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl prism-border group relative overflow-hidden"
          >
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-black" />
              <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-black" />
              <div className="w-6 h-6 rounded-full bg-amber-500 border-2 border-black" />
            </div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.4em] group-hover:text-white transition-colors">
              High-performance web development for {city}
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-[140px] font-black tracking-tighter text-white leading-[0.8] select-none italic perspective-1000">
            <motion.span 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="block mb-2 md:mb-4"
            >
              WE BUILD
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-rose-300 via-amber-200 to-white drop-shadow-[0_0_50px_rgba(139,92,246,0.4)] animate-shimmer"
              style={{ backgroundSize: '200% 100%' }}
            >
              SUCCESS.
            </motion.span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-20 pt-2 md:pt-6"
          >
            <p className="max-w-md text-lg md:text-2xl text-zinc-500 font-medium leading-[1.3] tracking-tight">
              Sophisticated web architecture. <br />
              <span className="text-white">Pay only when your site is live.</span>
            </p>
            
            <div className="space-y-3 md:space-y-5">
              <div className="flex items-center gap-4 text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> 
                Pay on Results
              </div>
              <div className="flex items-center gap-4 text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-[0.2em]">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.5)]" /> 
                Concierge Support
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 pt-6 md:pt-10"
          >
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="group w-full sm:w-auto px-10 py-5 md:px-12 md:py-7 bg-white text-black font-black rounded-[20px] md:rounded-[24px] transition-all flex items-center justify-center gap-4 text-base md:text-lg shadow-2xl"
            >
              START YOUR PROJECT
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </motion.a>
            <a 
              href="#process" 
              className="text-xs font-black text-zinc-600 hover:text-white transition-colors uppercase tracking-[0.4em] flex items-center gap-3 border-b border-zinc-900 pb-2"
            >
              <MousePointer2 className="w-3 h-3" /> OUR PROCESS
            </a>
          </motion.div>
        </div>

        {/* The "Power Unit" Visual Pillar */}
        <motion.div 
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: -10 }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="hidden lg:block lg:col-span-4 relative perspective-1000"
        >
          <div className="glass p-1.5 rounded-[50px] border-white/10 shadow-3xl bg-gradient-to-br from-white/10 to-transparent">
            <div className="bg-zinc-950/80 backdrop-blur-3xl rounded-[48px] p-10 aspect-[4/5] flex flex-col justify-between relative overflow-hidden hud-grid border border-white/5">
              
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                  <Activity className="w-6 h-6 text-violet-400 animate-pulse" />
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-[10px] font-black text-white tracking-widest mb-1">NODE_ACTIVE</div>
                  <div className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.2em]">VERMONT_EXT_01</div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-5xl font-black text-white tracking-tighter italic">99.9%</p>
                    <p className="text-[9px] text-zinc-500 font-black uppercase tracking-[0.3em] mt-2">DEPLOY_INTEGRITY</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  </div>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '99%' }}
                    transition={{ delay: 1.5, duration: 3, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-violet-600 via-rose-400 to-amber-300 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                  />
                </div>
              </div>

              {/* Internal Scan HUD */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)] h-1/3 w-full animate-[scan_6s_linear_infinite] pointer-events-none" />
            </div>
          </div>
          
          {/* Subtle floating shadow glow */}
          <div className="absolute -bottom-10 -right-10 w-full h-full bg-violet-600/5 blur-[100px] -z-10" />
        </motion.div>
      </motion.div>

      {/* Extreme Bottom Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent z-30" />
    </section>
  )
}

// Add the shimmer animation keyframes to globals.css if not already present
// @keyframes shimmer {
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// }
