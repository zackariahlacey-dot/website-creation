'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Palette, Type, Layout, Image as ImageIcon, 
  ChevronRight, ChevronLeft, Upload, CheckCircle2, 
  Stethoscope, HardHat, Building2, Zap, Send
} from 'lucide-react'
import { AssetUploader } from './AssetUploader'
import { submitDesignBrief } from '@/app/actions/design'

const designProfiles = [
  { id: 'minimalist', name: 'Ultra-Minimalist', desc: 'High-contrast, breathable, and razor-sharp.', icon: Layout },
  { id: 'industrial', name: 'Industrial HUD', desc: 'Heavy technical aesthetics with grid foundations.', icon: HardHat },
  { id: 'luxury', name: 'Premium Glass', desc: 'Soft glows, deep blurs, and elegant motion.', icon: Zap },
  { id: 'clinical', name: 'High-Trust Clinical', desc: 'Professional, secure, and authority-focused.', icon: Stethoscope }
]

export function DesignBriefForm({ project, user }: { project: any, user: any }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    profile: '',
    palette: '',
    competitors: '',
    goals: '',
    typography: 'modern'
  })

  const handleComplete = async () => {
    setLoading(true)
    const result = await submitDesignBrief(project.id, formData)
    if (result.success) {
      setSubmitted(true)
    } else {
      alert(`SUBMISSION_ERROR: ${result.error}`)
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 md:p-20 rounded-[60px] text-center border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden"
      >
        <div className="absolute inset-0 hud-grid opacity-10" />
        <div className="relative z-10 space-y-8">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.2)]">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
          </div>
          <h3 className="text-4xl font-bold text-white tracking-tighter uppercase italic">Schematic Synchronized</h3>
          <p className="text-zinc-500 text-lg max-w-md mx-auto">
            Your design vision has been transmitted directly to Zack's terminal. He will now review the specs and move your project into the Design Phase.
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[8px] font-black uppercase tracking-[0.4em]">
          Project_Calibration_v1.0
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter italic uppercase">Define Your Vision</h2>
        <p className="text-zinc-500">Configure the visual engine for {project.name}</p>
      </header>

      <div className="glass p-[1px] rounded-[60px] border border-white/5 relative overflow-hidden bg-zinc-950/20">
        <div className="p-8 md:p-16 relative overflow-hidden hud-grid">
          
          {/* Progress Bar */}
          <div className="flex justify-between items-center gap-4 mb-16 relative z-10 px-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex flex-col gap-3">
                <div className={`h-1 rounded-full transition-all duration-700 ${step >= s ? 'bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-zinc-900'}`} />
                <span className={`text-[8px] font-bold uppercase tracking-widest text-center ${step >= s ? 'text-white' : 'text-zinc-700'}`}>Node_0{s}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 relative z-10"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Choose Your Visual Profile</h3>
                  <p className="text-zinc-500 text-sm">Select the core aesthetic foundation for your engine.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {designProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setFormData({ ...formData, profile: p.id })}
                      className={`p-8 rounded-[32px] border transition-all duration-500 text-left group ${formData.profile === p.id ? 'bg-violet-500/10 border-violet-500/40' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
                    >
                      <p.icon className={`w-8 h-8 mb-6 ${formData.profile === p.id ? 'text-violet-400' : 'text-zinc-600'}`} />
                      <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-xs">{p.name}</h4>
                      <p className="text-zinc-500 text-[10px] leading-relaxed tracking-wide">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 relative z-10"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Color & Vibe</h3>
                  <p className="text-zinc-500 text-sm">How should the interface feel to your clients?</p>
                </div>
                <textarea 
                  value={formData.palette}
                  onChange={(e) => setFormData({ ...formData, palette: e.target.value })}
                  className="w-full bg-black border border-white/5 rounded-3xl p-8 text-white focus:border-violet-500 outline-none h-40 text-lg italic"
                  placeholder="e.g. Deep ocean blues, gold accents, high-end dark mode..."
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 relative z-10"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Competitors & Goals</h3>
                  <p className="text-zinc-500 text-sm">Who are we beating, and what is the #1 goal?</p>
                </div>
                <div className="space-y-6">
                  <input 
                    value={formData.competitors}
                    onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                    className="w-full bg-black border border-white/5 rounded-2xl px-8 py-5 text-white focus:border-violet-500 outline-none"
                    placeholder="Competitor websites (URLs)..."
                  />
                  <textarea 
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="w-full bg-black border border-white/5 rounded-2xl px-8 py-5 text-white focus:border-violet-500 outline-none h-32"
                    placeholder="Describe your primary goal (e.g. Booking 5 new patients a week)..."
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 relative z-10"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">System Assets</h3>
                  <p className="text-zinc-500 text-sm">Upload logos, brand guides, or site imagery.</p>
                </div>
                <div className="p-12 border-2 border-dashed border-zinc-900 rounded-[40px] text-center bg-zinc-950/20">
                  <ImageIcon className="w-12 h-12 text-zinc-800 mx-auto mb-6" />
                  <p className="text-xs text-zinc-600 uppercase font-bold tracking-widest mb-8">Asset_Uploader_Initialized</p>
                  <AssetUploader projectId={project.id} userId={user.id} />
                </div>
                <div className="flex items-center gap-3 justify-center text-[10px] font-bold text-violet-500 uppercase tracking-widest">
                  <Zap className="w-3 h-3 animate-pulse" /> Final Step: Sync Blueprint
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-16 flex justify-between items-center relative z-10 pt-10 border-t border-white/5">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white disabled:opacity-0 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous_Step
            </button>
            
            {step < 4 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-10 py-4 bg-white text-black font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all shadow-xl"
              >
                Next_Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center gap-2 px-10 py-4 bg-violet-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-violet-500 transition-all shadow-[0_0_40px_rgba(139,92,246,0.3)] disabled:opacity-50"
              >
                {loading ? 'SYNCHRONIZING...' : 'FINALIZE_SCHEMATIC'} 
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Internal Scan HUD */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full animate-[scan_10s_linear_infinite] pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
