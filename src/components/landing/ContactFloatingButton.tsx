'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ContactFloatingButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 800) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          className="fixed bottom-8 right-8 z-[90] md:bottom-12 md:right-12"
        >
          <a 
            href="#contact"
            className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white text-black rounded-full shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-110 transition-all active:scale-95 overflow-hidden"
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 bg-violet-500/20 animate-pulse" />
            
            <div className="relative z-10 flex flex-col items-center">
              <Zap className="w-6 h-6 md:w-8 md:h-8 fill-black" />
              <span className="text-[7px] font-black uppercase tracking-widest mt-1 hidden md:block">Sync</span>
            </div>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          </a>
          
          {/* Label Tag */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:block">
            <div className="glass px-4 py-2 rounded-full border border-white/10 whitespace-nowrap">
              <p className="text-[8px] font-black text-white uppercase tracking-[0.4em]">Initialize_Sync</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
