'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Lock, ChevronRight, Globe, Mail, Phone, Cpu, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null)

  const LegalModal = ({ type }: { type: 'privacy' | 'terms' }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6 p-10">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={() => setModalContent(null)}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden hud-grid shadow-3xl max-h-[80vh] flex flex-col"
      >
        <div className="flex justify-between items-center mb-8 shrink-0">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">
              {type === 'privacy' ? 'Privacy_Protocol' : 'Service_Terms'}
            </h3>
          </div>
          <button onClick={() => setModalContent(null)} className="text-zinc-600 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-4 font-mono text-[11px] text-zinc-500 leading-relaxed space-y-6 scrollbar-hide">
          {type === 'privacy' ? (
            <>
              <p>1. DATA_COLLECTION: We collect only the essential telemetry needed to architect your vision. This includes name, email, and project goals provided through the Intake Node.</p>
              <p>2. ENCRYPTION_STANDARDS: All transmission data is secured using industry-standard AES-256 protocols. Your project assets remain in a private vault accessible only by authorized nodes.</p>
              <p>3. THIRD_PARTY_SYNC: We do not sell or trade your data. External system synchronization (Resend, Supabase, Stripe) is conducted via encrypted API channels.</p>
            </>
          ) : (
            <>
              <p>1. ZERO_RISK_GUARANTEE: No upfront costs are required. Payment is only triggered upon successful system launch and client satisfaction.</p>
              <p>2. RETAINER_PROTOCOL: Monthly support nodes cover hosting, security audits, and minor architectural tweaks. Cancellation requires a 30-day sync notice.</p>
              <p>3. OWNERSHIP_TRANSFER: Upon final payment, full intellectual property of the digital engine is transferred to the client node.</p>
            </>
          )}
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center shrink-0">
          <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">Vizulux_Legal_Node_v1.0</span>
          <button 
            onClick={() => setModalContent(null)}
            className="px-6 py-2 bg-white text-black font-black text-[9px] uppercase tracking-widest rounded-lg"
          >
            Acknowledge
          </button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <footer className="relative bg-black pt-32 pb-12 px-8 overflow-hidden border-t border-white/5">
      {/* Background Decorative Grid Floor (Faded) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(50px)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Image 
              src="/vizulux.png" 
              alt="VIZULUX" 
              width={120} 
              height={32} 
              className="object-contain opacity-80"
            />
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              Architecting high-performance digital real estate for Vermont's elite businesses. 
              Built for the future of search.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">System_Online: VERMONT_NODE</span>
            </div>
          </div>

          {/* SEO / Location Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Service_Areas</h4>
            <ul className="space-y-4 text-xs font-bold text-zinc-500 uppercase tracking-widest">
              <li className="hover:text-violet-400 transition-colors cursor-default">Burlington, VT</li>
              <li className="hover:text-violet-400 transition-colors cursor-default">Williston, VT</li>
              <li className="hover:text-violet-400 transition-colors cursor-default">South Burlington, VT</li>
              <li className="hover:text-violet-400 transition-colors cursor-default">Shelburne, VT</li>
              <li className="hover:text-violet-400 transition-colors cursor-default">Stowe, VT</li>
            </ul>
          </div>

          {/* Engine Specs Column */}
          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Engine_Specs</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Core', val: 'Next.js 16' },
                { label: 'Logic', val: 'TypeScript' },
                { label: 'Database', val: 'Supabase' },
                { label: 'Styles', val: 'Tailwind 4' },
                { label: 'Motion', val: 'Framer' },
                { label: 'Alerts', val: 'Resend' }
              ].map((spec) => (
                <div key={spec.label} className="space-y-1">
                  <p className="text-[7px] text-zinc-700 font-black uppercase tracking-widest">{spec.label}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">{spec.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-8 text-right md:text-left">
            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Contact_Nodes</h4>
            <div className="space-y-6">
              <a href="mailto:zack@vizulux.com" className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-violet-500/30">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold font-mono lowercase">zack@vizulux.com</span>
              </a>
              <a href="tel:8025859179" className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-emerald-500/30">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold font-mono">802-585-9179</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.3em]">
            © 2026 VIZULUX. Architected with precision in Vermont.
          </p>
          
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setModalContent('privacy')}
              className="text-[9px] font-bold text-zinc-600 hover:text-white uppercase tracking-widest transition-colors"
            >
              Privacy_Protocol
            </button>
            <button 
              onClick={() => setModalContent('terms')}
              className="text-[9px] font-bold text-zinc-600 hover:text-white uppercase tracking-widest transition-colors"
            >
              Service_Terms
            </button>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex items-center gap-2">
              <Globe className="w-3 h-3 text-zinc-800" />
              <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">Global_Deploy: US_EAST_1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modal Portal */}
      <AnimatePresence>
        {modalContent && <LegalModal type={modalContent} />}
      </AnimatePresence>
    </footer>
  )
}
