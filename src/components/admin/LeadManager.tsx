'use client'

import { useState } from 'react'
import { updateLeadStatus, convertLeadToProject } from '@/app/actions/admin'
import { Mail, CheckCircle2, Zap, Radio, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export function LeadManager({ leads }: { leads: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleStatusUpdate = async (id: string, status: string) => {
    setLoading(id)
    await updateLeadStatus(id, status)
    router.refresh()
    setLoading(null)
  }

  const handleConvert = async (lead: any) => {
    setLoading(lead.id)
    const result = await convertLeadToProject(lead.id, {
      name: lead.name,
      email: lead.email,
      industry: lead.industry
    })
    if (result.success) {
      router.refresh()
    }
    setLoading(null)
  }

  return (
    <div className="space-y-6">
      {leads.map((lead) => (
        <motion.div 
          key={lead.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={`group relative ${lead.status === 'converted' ? 'opacity-40 grayscale' : ''}`}
        >
          <div className="glass p-8 rounded-[40px] border border-white/5 bg-zinc-950/20 hover:border-violet-500/30 transition-all duration-700 relative overflow-hidden hud-grid shadow-2xl">
            
            {/* Corner HUD Markers */}
            <div className="absolute top-6 left-6 w-2 h-2 border-t border-l border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute top-6 right-6 w-2 h-2 border-t border-r border-zinc-800 transition-colors group-hover:border-zinc-600" />

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Radio className={`w-3 h-3 ${lead.status === 'new' ? 'text-amber-500 animate-pulse' : 'text-zinc-600'}`} />
                  <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Signal_Intercept</span>
                </div>
                <p className="text-[10px] font-mono text-zinc-400">UUID: {lead.id.split('-')[0].toUpperCase()}</p>
              </div>
              <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                lead.status === 'new' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
                lead.status === 'converted' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                'bg-zinc-900 border-white/5 text-zinc-500'
              }`}>
                {lead.status}
              </div>
            </div>

            <div className="relative z-10 mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tighter mb-1 italic">{lead.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest">{lead.industry}</span>
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                <span className="text-[10px] font-mono text-zinc-500">{lead.email}</span>
              </div>
            </div>

            <div className="relative z-10 bg-black/40 border border-white/5 rounded-2xl p-6 mb-8 group-hover:border-white/10 transition-colors">
              <p className="text-zinc-400 text-sm leading-relaxed italic line-clamp-3 group-hover:line-clamp-none transition-all">
                "{lead.message}"
              </p>
            </div>

            <div className="relative z-10 flex gap-3">
              {lead.status === 'new' && (
                <button 
                  onClick={() => handleStatusUpdate(lead.id, 'contacted')}
                  disabled={loading === lead.id}
                  className="flex-1 py-3 bg-zinc-900 border border-white/5 text-zinc-400 font-black text-[9px] uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-800 hover:text-white transition-all disabled:opacity-50"
                >
                  Mark_Contacted
                </button>
              )}
              {lead.status !== 'converted' && (
                <button 
                  onClick={() => handleConvert(lead)}
                  disabled={loading === lead.id}
                  className="flex-1 py-3 bg-white text-black font-black text-[9px] uppercase tracking-[0.2em] rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl"
                >
                  <Target className="w-3 h-3" />
                  Initialize_Conversion
                </button>
              )}
              {lead.status === 'converted' && (
                <div className="flex-1 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-[9px] uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-3 h-3" /> Node_Converted
                </div>
              )}
            </div>

            {/* Internal Laser Scan HUD */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-20" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
