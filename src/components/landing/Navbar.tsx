'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Layout, Shield, Zap, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar({ isLoggedIn }: { isLoggedIn?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Services', href: '#services', icon: Layout },
    { name: 'Architecture', href: '#blueprint', icon: Shield },
    { name: 'Authority', href: '#market', icon: Globe },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-12 md:py-8 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="glass-nav rounded-full px-4 py-2 md:px-8 md:py-3 flex items-center justify-between border-white/5 shadow-2xl backdrop-blur-2xl">
          
          {/* Brand Node */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/vizulux.png" 
              alt="Vizulux" 
              width={70} 
              height={18} 
              className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="h-3 w-[1px] bg-white/10 hidden md:block" />
            <span className="text-[7px] font-black text-zinc-600 uppercase tracking-[0.4em] hidden md:block">Burlington, Vermont</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[9px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.3em] transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="h-4 w-[1px] bg-white/10" />
            <Link 
              href={isLoggedIn ? "/portal" : "/login"} 
              className="px-6 py-2 bg-white text-black font-black text-[9px] uppercase tracking-[0.2em] rounded-full hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              {isLoggedIn ? 'Client_HQ' : 'Client_Login'}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="fixed inset-x-4 top-20 z-[101] md:hidden glass p-6 rounded-[32px] border-white/10 bg-black/95 backdrop-blur-3xl shadow-3xl pointer-events-auto"
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <link.icon className="w-4 h-4 text-zinc-600 group-hover:text-violet-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">{link.name}</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-zinc-800" />
                  </a>
                ))}
              </div>

              <Link 
                href={isLoggedIn ? "/portal" : "/login"}
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-white text-black font-black text-[9px] uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 shadow-xl"
              >
                {isLoggedIn ? 'Enter Digital HQ' : 'Portal Login'} <Zap className="w-3 h-3 fill-black" />
              </Link>

              <div className="pt-4 border-t border-white/5 flex justify-center gap-6 opacity-40">
                <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">SYS_V2.3</span>
                <span className="text-[7px] font-black text-zinc-500 uppercase tracking-widest">VT_NODE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
