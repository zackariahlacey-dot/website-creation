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
            className="group relative flex items-center gap-3 px-6 py-4 md:px-8 md:py-5 bg-white text-black rounded-2xl shadow-[0_20px_50px_rgba(255,255,255,0.2)] hover:scale-105 transition-all active:scale-95 overflow-hidden"
          >
            {/* Pulsing Aura */}
            <div className="absolute inset-0 bg-violet-500/10 animate-pulse" />
            
            <Zap className="w-4 h-4 md:w-5 md:h-5 fill-black" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em]">START PROJECT</span>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
