'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, ChevronRight, Play, Rocket, 
  Calendar, FileCode, ArrowLeft, Shield, 
  Zap, Globe, Lock, Cpu, Sparkles
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CyberWebBackground from '@/components/landing/CyberWebBackground'
import { createClient } from '@/utils/supabase/client'

export default function InductionPage() {
  const [project, setProject] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      
      const { data: projectData } = await supabase
        .from('projects')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      setProfile(profileData)
      setProject(projectData)
      setLoading(false)
    }
    loadData()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden text-center">
      <CyberWebBackground />
      
      {/* Luminous Success Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10 space-y-16 py-20">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="relative inline-block">
            <div className="w-28 h-28 bg-emerald-500/10 rounded-[40px] flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.3)] relative z-10">
              <CheckCircle2 className="w-14 h-14 text-emerald-400" />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-15px] border border-emerald-500/10 rounded-full border-dashed" 
            />
            {/* Success Particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: [0, 1.5], 
                  opacity: [1, 0],
                  x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 100),
                  y: (Math.random() * -100) - 50
                }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 w-1 h-1 bg-emerald-400 rounded-full"
              />
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-[0.5em] shadow-xl">
              <Sparkles className="w-3 h-3" /> System_Node_Ignited
            </div>
            <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter uppercase italic leading-none">
              The Engine is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-violet-400">Yours.</span>
            </h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em]">
              Authorized_User: {profile?.full_name || 'Prospect'} | Project_Ref: {project?.id?.slice(0,8) || 'N/A'}
            </p>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Node 1: Video */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass rounded-[48px] border border-white/5 overflow-hidden group relative aspect-video bg-zinc-950/50 flex flex-col items-center justify-center p-12"
          >
            <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all shadow-3xl relative z-10">
              <Play className="w-10 h-10 text-white fill-white ml-1" />
            </div>
            <div className="mt-8 space-y-2 relative z-10">
              <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Message_From_The_Architect</p>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Protocol: WELCOME_SEQUENCE</p>
            </div>
            {/* HUD Elements */}
            <div className="absolute top-8 left-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">REC_00:00:42</span>
            </div>
            <div className="absolute bottom-8 right-8 text-right">
              <p className="text-[8px] font-black text-zinc-800 uppercase tracking-widest font-mono">BURLINGTON_NODE_VT</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-20" />
          </motion.div>

          {/* Node 2: Retainer Value */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="glass rounded-[48px] border border-emerald-500/20 bg-emerald-500/[0.02] p-10 text-left flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[60px]" />
            <div className="space-y-8 relative z-10">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Managed_Integrity</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  { icon: Zap, text: "UNLIMITED MINOR EDITS", sub: "Engine calibration on demand." },
                  { icon: Globe, text: "PREMIUM MANAGED HOSTING", sub: "99.9% Up-time availability." },
                  { icon: Lock, text: "REAL-TIME SECURITY AUDITS", sub: "Enterprise-grade protection." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <item.icon className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">{item.text}</p>
                      <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-emerald-500/10 relative z-10">
              <div className="flex items-center gap-3 text-emerald-500 animate-pulse">
                <Cpu className="w-3 h-3" />
                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Node_Protection: ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, title: "BOOK STRATEGY", link: "#", desc: "Lock in your deep-dive." },
            { icon: FileCode, title: "UPLOADER NODE", link: "/portal", desc: "Sync your assets." },
            { icon: Rocket, title: "ENTER DIGITAL HQ", link: "/portal", desc: "View the live build." }
          ].map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
            >
              <Link href={action.link} className="group block glass p-8 rounded-[40px] border-white/5 hover:border-violet-500/30 transition-all hover:bg-violet-500/[0.02]">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-violet-500/10 transition-all border border-white/5 group-hover:border-violet-500/20">
                  <action.icon className="w-5 h-5 text-zinc-500 group-hover:text-violet-400" />
                </div>
                <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-2">{action.title}</h4>
                <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{action.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="pt-12 border-t border-white/5"
        >
          <Link href="/" className="text-[9px] font-black text-zinc-800 hover:text-zinc-500 uppercase tracking-[0.6em] flex items-center gap-4 mx-auto justify-center group transition-all">
            <ArrowLeft className="w-2.5 h-2.5 group-hover:-translate-x-2 transition-transform" /> 
            TERMINATE_TO_MAIN_VIEW
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
