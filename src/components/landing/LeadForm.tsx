'use client'

import { useState, useEffect, useMemo } from 'react'
import { submitLead } from '@/app/actions/leads'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle2, Zap, Stethoscope, HardHat, Building2, Globe, Lock, ChevronRight } from 'lucide-react'
import SignupModal from './SignupModal'

const industries = [
  { id: 'Healthcare', icon: Stethoscope },
  { id: 'Construction', icon: HardHat },
  { id: 'Real Estate', icon: Building2 },
  { id: 'Other', icon: Globe }
]

export default function LeadForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showReminder, setShowReminder] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    industry: 'Healthcare',
    message: ''
  })

  // Timer Logic
  useEffect(() => {
    if (!showReminder) return
    if (timeLeft <= 0) {
      setShowReminder(false)
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [showReminder, timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateProgress = (state: typeof formState) => {
    let score = 0
    if (state.name.length > 2) score++
    if (state.email.includes('@') && state.email.includes('.')) score++
    if (state.industry) score++
    if (state.message.length > 10) score++
    return (score / 4) * 100
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    const newState = { ...formState, [name]: value }
    setFormState(newState)
    setProgress(calculateProgress(newState))
  }

  const handleIndustrySelect = (id: string) => {
    const newState = { ...formState, industry: id }
    setFormState(newState)
    setProgress(calculateProgress(newState))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData()
    formData.append('name', formState.name)
    formData.append('email', formState.email)
    formData.append('industry', formState.industry)
    formData.append('message', formState.message)

    const result = await submitLead(formData)

    if (result.success) {
      setSuccess(true)
      setTimeout(() => setIsModalOpen(true), 1500)
    } else {
      setError(result.error || 'Failed to submit lead')
    }
    setLoading(false)
  }

  return (
    <section id="contact" className="py-64 px-8 bg-black relative overflow-hidden">
      {/* Background Grid Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          transform: 'perspective(1000px) rotateX(60deg) translateY(50px)'
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-violet-600/10 blur-[160px] rounded-full pointer-events-none opacity-50" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mb-10"
          >
            <Zap className={`w-3 h-3 transition-colors duration-700 ${progress === 100 ? 'text-amber-400' : 'text-zinc-700'}`} />
            Blueprint Node Status: {progress}% Charged
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter italic">Ready to Scale?</h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-xl font-medium leading-relaxed mb-8">Your vision is the fuel. Our architecture is the engine.</p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block p-4 rounded-2xl bg-violet-500/5 border border-violet-500/10"
          >
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              Direct Access Promise: You will receive my personal line immediately upon submission.
            </p>
          </motion.div>
        </div>

        <motion.div layout className="group relative">
          <div className={`relative bg-zinc-950/40 backdrop-blur-3xl rounded-[60px] p-8 md:p-20 border transition-all duration-700 hud-grid overflow-hidden shadow-2xl ${progress === 100 ? 'border-violet-500/50 shadow-[0_0_50px_rgba(139,92,246,0.1)]' : 'border-white/5'}`}>
            
            <div className="absolute top-8 left-8 w-3 h-3 border-t-2 border-l-2 border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute top-8 right-8 w-3 h-3 border-t-2 border-r-2 border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute bottom-8 left-8 w-3 h-3 border-b-2 border-l-2 border-zinc-800 transition-colors group-hover:border-zinc-600" />
            <div className="absolute bottom-8 right-8 w-3 h-3 border-b-2 border-r-2 border-zinc-800 transition-colors group-hover:border-zinc-600" />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none" />

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20 space-y-10"
                >
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_60px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold text-white mb-4 tracking-tight">Transmission Complete</h3>
                    <p className="text-zinc-500 text-xl max-w-md mx-auto">Your vision is now in our architecture queue. Check your email for the next steps.</p>
                  </div>

                  <div className="pt-10">
                    <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 inline-block relative group">
                      <div className="absolute inset-0 bg-violet-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] mb-4 relative z-10">Direct Architect Access</p>
                      <p className="text-4xl font-bold text-white relative z-10 select-all">802-585-9179</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  exit={{ opacity: 0, scale: 0.98, filter: 'blur(20px)' }}
                  transition={{ duration: 0.8 }}
                  onSubmit={handleSubmit} 
                  className="space-y-16"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group/input relative">
                      <input 
                        required
                        name="name"
                        value={formState.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl text-white outline-none focus:border-violet-500 transition-colors peer placeholder-transparent"
                        placeholder="Name"
                      />
                      <label className="absolute left-0 top-0 text-[10px] font-bold text-zinc-600 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-violet-400 pointer-events-none">
                        Full Name
                      </label>
                    </div>
                    <div className="group/input relative">
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl text-white outline-none focus:border-violet-500 transition-colors peer placeholder-transparent"
                        placeholder="Email"
                      />
                      <label className="absolute left-0 top-0 text-[10px] font-bold text-zinc-600 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-violet-400 pointer-events-none">
                        Work Email
                      </label>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest block ml-1">Specialization</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {industries.map((ind) => (
                        <button
                          key={ind.id}
                          type="button"
                          onClick={() => handleIndustrySelect(ind.id)}
                          className={`flex flex-col items-center gap-4 p-6 rounded-3xl border transition-all duration-500 group/item ${
                            formState.industry === ind.id 
                              ? 'bg-violet-500/10 border-violet-500/30 text-white shadow-[0_0_20px_rgba(139,92,246,0.05)]' 
                              : 'bg-zinc-900/50 border-white/5 text-zinc-500 hover:bg-white/5 hover:border-white/10'
                          }`}
                        >
                          <ind.icon className={`w-6 h-6 transition-colors duration-500 ${formState.industry === ind.id ? 'text-violet-400' : 'group-hover/item:text-zinc-300'}`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{ind.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="group/input relative">
                    <textarea 
                      required
                      name="message"
                      rows={1}
                      value={formState.message}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-zinc-800 py-4 text-2xl text-white outline-none focus:border-violet-500 transition-all peer placeholder-transparent min-h-[60px] resize-none"
                      placeholder="Vision"
                    />
                    <label className="absolute left-0 top-0 text-[10px] font-bold text-zinc-600 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xl peer-focus:top-0 peer-focus:text-[10px] peer-focus:text-violet-400 pointer-events-none">
                      Your Vision
                    </label>
                  </div>
                  
                  {error && <p className="text-red-400 text-xs font-bold uppercase tracking-widest">{error}</p>}

                  <div className="pt-8">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={loading}
                      className={`w-full py-8 rounded-3xl font-bold transition-all duration-700 flex items-center justify-center gap-4 disabled:opacity-50 text-xl tracking-tighter ${
                        progress === 100 
                          ? 'bg-white text-black shadow-[0_30px_60px_rgba(255,255,255,0.2)]' 
                          : 'bg-zinc-900 text-zinc-600 border border-white/5'
                      }`}
                    >
                      {loading ? (
                        <span className="animate-pulse tracking-[0.2em]">SYNCHRONIZING...</span>
                      ) : (
                        <>INITIALIZE CONSULTATION <Send className={`w-5 h-5 transition-transform duration-700 ${progress === 100 ? 'translate-x-2 -translate-y-2' : ''}`} /></>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <SignupModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false)
          setShowReminder(true)
        }} 
        initialEmail={formState.email} 
      />

      <AnimatePresence>
        {showReminder && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-10 right-10 z-[90] max-w-xs"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="glass p-6 rounded-3xl border border-violet-500/30 bg-zinc-950/80 backdrop-blur-2xl shadow-3xl text-left group transition-all hover:border-violet-500/60"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 group-hover:scale-110 transition-transform">
                  <Lock className="w-5 h-5 text-violet-400" />
                </div>
                <div className="text-[10px] font-black text-amber-400 font-mono tracking-widest bg-amber-400/10 px-2 py-1 rounded">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <p className="text-white font-bold text-sm mb-1 tracking-tight">Portal Access Pending</p>
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                Click to secure your digital HQ before the session expires.
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest italic">Node: SECURITY_GATE_01</span>
                <ChevronRight className="w-3 h-3 text-violet-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
