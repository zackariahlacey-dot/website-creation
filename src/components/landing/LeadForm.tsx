'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, User, Mail, MessageSquare, 
  ChevronRight, Zap, Loader2, CheckCircle2, Shield
} from 'lucide-react'
import { submitLead } from '@/app/actions/leads'
import SignupModal from './SignupModal'

const industries = [
  'Healthcare', 'Construction', 'Real Estate', 'Other'
]

export default function LeadForm() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: 'Other',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const result = await submitLead(formData)
    
    if (result.success) {
      setSubmitted(true)
      setShowSignup(true)
    } else {
      setError(result.error || 'Transmission failed. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <section id="contact" className="py-32 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto glass p-12 md:p-20 rounded-[40px] text-center border-emerald-500/20 bg-emerald-500/[0.02] relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-4xl font-bold text-white tracking-tighter uppercase italic mb-4">Message Sent</h3>
            <p className="text-zinc-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Your vision has been received. I'll review your project and reach out within 24 hours.
            </p>
            
            <button 
              onClick={() => setShowSignup(true)}
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
            >
              Access Client Portal <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <SignupModal 
            isOpen={showSignup} 
            onClose={() => setShowSignup(false)} 
            initialEmail={formData.email} 
          />
        </motion.div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 md:py-64 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          
          {/* Left Side: Value Prop */}
          <div className="space-y-12 pt-4 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-black uppercase tracking-[0.4em]">
              <Shield className="w-3 h-3" /> Secure Inquiry
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic">
              Ready to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-800 to-zinc-500">Transform?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-zinc-400 md:text-zinc-500 font-medium leading-tight max-w-md">
              Fill out the form to start your high-performance web project. No deposits. Pay only when your site is live.
            </p>

            <div className="space-y-6 pt-4 flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" /> 
                Direct Architect Communication
              </div>
              <div className="flex items-center gap-4 text-zinc-400 font-bold text-xs uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-500 shadow-[0_0_10px_#8b5cf6]" /> 
                Priority Build Queue
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="relative">
            <div className="glass p-1.5 rounded-[40px] border-white/5 bg-zinc-950/20 shadow-3xl overflow-hidden group">
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8 relative z-10">
                
                {/* Inputs */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-violet-500/50 outline-none transition-all placeholder:text-zinc-800"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Work Email</label>
                      <input 
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white focus:border-violet-500/50 outline-none transition-all placeholder:text-zinc-800"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Industry</label>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {industries.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => setFormData({...formData, industry: ind})}
                          className={`px-6 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${
                            formData.industry === ind 
                            ? 'bg-violet-500 border-violet-500 text-white shadow-lg shadow-violet-500/20' 
                            : 'bg-black/40 border-white/5 text-zinc-600 hover:border-white/20'
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1">Your Vision</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-white focus:border-violet-500/50 outline-none h-40 transition-all placeholder:text-zinc-800 resize-none"
                      placeholder="Tell me about your project goals..."
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">{error}</p>
                )}

                <button 
                  disabled={loading}
                  className="w-full py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl hover:bg-zinc-200 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.05)] flex items-center justify-center gap-4 group/btn disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Start Your Project 
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Decorative Scan Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-20" />
            </div>
            
            {/* Background Glow */}
            <div className="absolute -inset-10 bg-violet-600/5 blur-[100px] -z-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
