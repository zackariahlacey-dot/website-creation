'use client'

import { useState } from 'react'
import { 
  CreditCard, Loader2, DollarSign, Sparkles, Lock, 
  Unlock, ExternalLink, Send, Zap, CheckCircle2,
  ShieldCheck, AlertCircle, Activity, X
} from 'lucide-react'
import { provisionStripeLink, broadcastFinancialSync, togglePaymentStatus } from '@/app/actions/stripe'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

export function BillingNode({ project }: { project: any }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [amounts, setAmounts] = useState({ build: '', retainer: '' })
  const [editingNode, setEditingNode] = useState<'build' | 'retainer' | null>(null)
  const router = useRouter()

  const handleProvision = async (type: 'build' | 'retainer') => {
    const amount = type === 'build' ? amounts.build : amounts.retainer
    if (!amount || isNaN(Number(amount))) return
    
    setLoading(type)
    const result = await provisionStripeLink(project.id, project.name, Number(amount), type === 'retainer')
    if (result.success) {
      setAmounts({ ...amounts, [type]: '' })
      setEditingNode(null)
      router.refresh()
    }
    setLoading(null)
  }

  const handleDispatch = async () => {
    setLoading('dispatch')
    const result = await broadcastFinancialSync(project.id)
    if (result.success) alert("MASTER_SYNC_DISPATCHED")
    setLoading(null)
  }

  const handleTogglePaid = async (type: 'build' | 'retainer') => {
    setLoading('toggle_' + type)
    const currentStatus = type === 'build' ? project.build_paid : project.retainer_active
    await togglePaymentStatus(project.id, type, currentStatus)
    router.refresh()
    setLoading(null)
  }

  const FinancialBlade = ({ type, activeLink, amount, isPaid }: { type: 'build' | 'retainer', activeLink?: string, amount?: number, isPaid: boolean }) => {
    const isEditing = editingNode === type || !activeLink
    
    return (
      <div className={`relative bg-black/40 border rounded-[24px] transition-all duration-500 overflow-hidden flex flex-col ${
        isPaid ? 'border-emerald-500/20' : activeLink ? 'border-violet-500/20' : 'border-white/5'
      }`}>
        {/* Header Strip */}
        <div className="px-5 py-3 border-b border-white/5 flex justify-between items-center bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <div className={`w-1 h-1 rounded-full ${isPaid ? 'bg-emerald-500' : activeLink ? 'bg-violet-500' : 'bg-zinc-800'}`} />
            <span className="text-[7px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              SYS_NODE_{type.toUpperCase()}
            </span>
          </div>
          {activeLink && !isEditing && (
            <button 
              onClick={() => setEditingNode(type)}
              className="text-[7px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
            >
              <Unlock className="w-2.5 h-2.5" /> Mod
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col justify-center min-h-[140px]">
          {isEditing ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-1 duration-500">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-700">$</div>
                <input 
                  value={type === 'build' ? amounts.build : amounts.retainer}
                  onChange={(e) => setAmounts({ ...amounts, [type]: e.target.value })}
                  className="w-full bg-zinc-950 border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm font-bold text-white outline-none focus:border-violet-500/50 transition-all"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleProvision(type)}
                  disabled={!!loading}
                  className="flex-1 py-2.5 bg-white text-black font-black text-[8px] uppercase tracking-widest rounded-lg hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                >
                  {loading === type ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                  Confirm_Price
                </button>
                {activeLink && (
                  <button onClick={() => setEditingNode(null)} className="p-2.5 bg-zinc-900 text-zinc-500 rounded-lg hover:text-white transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-end animate-in fade-in duration-700">
              <div className="space-y-1">
                <p className={`text-[7px] font-black uppercase tracking-[0.2em] ${isPaid ? 'text-emerald-500' : 'text-violet-400'}`}>
                  {isPaid ? 'Synchronized' : 'Pending_Funds'}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white italic tracking-tighter">${amount?.toLocaleString()}</span>
                  <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">{type === 'retainer' ? '/mo' : 'flat'}</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                isPaid ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-violet-500/5 border-violet-500/20 text-violet-400'
              }`}>
                {isPaid ? <ShieldCheck className="w-5 h-5" /> : <Activity className="w-5 h-5 animate-pulse" />}
              </div>
            </div>
          )}
        </div>

        {/* Action Belt */}
        {!isEditing && (
          <div className="grid grid-cols-2 border-t border-white/5 bg-zinc-950/30">
            <a 
              href={activeLink} 
              target="_blank" 
              className="flex items-center justify-center gap-2 py-3 border-r border-white/5 hover:bg-white/5 transition-colors group"
            >
              <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-white" />
              <span className="text-[7px] font-black text-zinc-500 group-hover:text-white uppercase tracking-widest">Audit</span>
            </a>
            <button 
              onClick={() => handleTogglePaid(type)}
              disabled={loading === 'toggle_' + type}
              className={`flex items-center justify-center gap-2 py-3 transition-colors ${
                isPaid ? 'text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10' : 'text-zinc-600 hover:bg-white/5 hover:text-white'
              }`}
            >
              {loading === 'toggle_' + type ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className={`w-3 h-3 ${isPaid ? 'text-emerald-500' : 'text-zinc-700'}`} />
                  <span className="text-[7px] font-black uppercase tracking-widest">{isPaid ? 'Paid' : 'Mark_Paid'}</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Technical Scan HUD */}
        {activeLink && !isEditing && (
          <div className={`absolute inset-0 h-[1px] w-full top-0 animate-[scan_4s_linear_infinite] opacity-30 ${
            isPaid ? 'bg-emerald-500' : 'bg-violet-500'
          }`} />
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <h4 className="text-[9px] font-black text-white uppercase tracking-[0.5em] flex items-center gap-2">
          <CreditCard className="w-3 h-3 text-violet-500" /> Financial_Calibration
        </h4>
        <div className="h-px flex-1 bg-zinc-900" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <FinancialBlade 
          type="build" 
          activeLink={project.invoice_link} 
          amount={project.build_amount} 
          isPaid={project.build_paid} 
        />
        <FinancialBlade 
          type="retainer" 
          activeLink={project.retainer_link} 
          amount={project.retainer_amount} 
          isPaid={project.retainer_active} 
        />
      </div>

      {(project.invoice_link || project.retainer_link) && (
        <button 
          onClick={handleDispatch}
          disabled={loading === 'dispatch'}
          className="group relative w-full py-5 bg-white text-black font-black text-[9px] uppercase tracking-[0.5em] rounded-[20px] hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 overflow-hidden shadow-2xl"
        >
          {loading === 'dispatch' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
          Execute_Master_Synchronization
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
        </button>
      )}
    </div>
  )
}
