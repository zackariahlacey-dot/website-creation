'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, ChevronRight, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import CyberWebBackground from '@/components/landing/CyberWebBackground'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
      <CyberWebBackground />
      
      {/* Background Decorative Grid */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(50px)'
        }}
      />

      <div className="w-full max-w-lg relative z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.4em] mb-12 group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Terminal
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-1 rounded-[50px] border border-white/5 shadow-3xl relative overflow-hidden group"
        >
          <div className="bg-zinc-950/60 backdrop-blur-3xl rounded-[49px] p-10 md:p-16 relative overflow-hidden hud-grid">
            {/* Corner HUD Markers */}
            <div className="absolute top-8 left-8 w-3 h-3 border-t-2 border-l-2 border-zinc-800" />
            <div className="absolute top-8 right-8 w-3 h-3 border-t-2 border-r-2 border-zinc-800" />
            <div className="absolute bottom-8 left-8 w-3 h-3 border-b-2 border-l-2 border-zinc-800" />
            <div className="absolute bottom-8 right-8 w-3 h-3 border-b-2 border-r-2 border-zinc-800" />

            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-violet-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-violet-500/20">
                <ShieldCheck className="w-8 h-8 text-violet-400" />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tighter uppercase mb-2">Authorization</h1>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Enter Credentials for HQ Access</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1 text-left block">Assigned Email</label>
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-violet-500 focus:bg-white/10 outline-none transition-all duration-300"
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest ml-1 text-left block">Secure Key</label>
                <div className="relative">
                  <input 
                    required
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-violet-500 focus:bg-white/10 outline-none transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-700" />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest">{error}</p>
                </div>
              )}

              <button 
                disabled={loading}
                className="w-full py-6 bg-white text-black font-black rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 tracking-widest text-xs shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                {loading ? 'SYNCHRONIZING...' : 'INITIALIZE ACCESS'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-12 pt-8 border-t border-white/5 text-center">
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mb-4">No active credentials?</p>
              <Link 
                href="/#contact" 
                className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors font-bold text-xs uppercase tracking-[0.2em]"
              >
                Contact us to request access <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Internal Laser Scan Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />
          </div>
        </motion.div>
        
        {/* Metadata HUD under the card */}
        <div className="mt-8 flex justify-between px-2 font-mono text-[8px] text-zinc-800 font-bold tracking-widest uppercase">
          <div>[ AUTH_NODE: 0x42 ]</div>
          <div>[ CACHE: BYPASS ]</div>
          <div>[ V_ARCH_v4.0 ]</div>
        </div>
      </div>

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none" />
    </div>
  )
}
