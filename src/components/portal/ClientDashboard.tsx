'use client'

import { motion } from 'framer-motion'
import { 
  Layout, MessageSquare, Globe, ChevronRight, Milestone, 
  AlertCircle, FileCode, CheckCircle2, Target, UserCheck, 
  Mail, Activity, Zap, TrendingUp, DollarSign, Repeat
} from 'lucide-react'
import { AssetUploader } from '@/components/portal/AssetUploader'
import { MeetingRequester } from '@/components/portal/MeetingRequester'
import { WelcomeSuccess } from '@/components/portal/WelcomeSuccess'
import { DesignBriefForm } from '@/components/portal/DesignBriefForm'

export function ClientDashboard({ 
  activeProject, 
  profile, 
  clientLeads, 
  updates, 
  user 
}: { 
  activeProject: any, 
  profile: any, 
  clientLeads: any[], 
  updates: any[],
  user: any
}) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-8 space-y-16 pb-32">
      <WelcomeSuccess name={profile?.full_name || 'Prospect'} />
      
      {activeProject.status === 'strategy' && !activeProject.brief_submitted ? (
        <DesignBriefForm project={activeProject} user={user} />
      ) : (
        <>
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Project_Node: ACTIVE</span>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-tighter italic">{activeProject.name}</h1>
            </div>
            <div className="flex gap-4">
              <div className="glass px-8 py-4 rounded-3xl border-white/5 bg-violet-500/[0.02]">
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Current_Phase</p>
                <p className="text-xl font-black text-white uppercase tracking-widest">{activeProject.status}</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Main Feed */}
            <div className="lg:col-span-8 space-y-12 md:y-16">
              
              {/* Build Lifecycle */}
              <section className="glass p-6 md:p-10 rounded-[32px] md:rounded-[48px] border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 hud-grid opacity-5" />
                <div className="flex justify-between items-center mb-10 relative z-10">
                  <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Milestone className="w-3 h-3 text-violet-500" /> Build Lifecycle
                  </h3>
                </div>
                
                <div className="relative pt-2 pb-6 px-2 md:px-4">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-zinc-900 -translate-y-1/2" />
                  <div className="flex justify-between relative z-10">
                    {['Strategy', 'Design', 'Build', 'Launch'].map((step, i) => {
                      const statusMap: Record<string, number> = { 'strategy': 0, 'design': 1, 'development': 2, 'live': 3, 'maintenance': 3 }
                      const currentIdx = statusMap[activeProject.status] || 0
                      const isActive = currentIdx === i
                      const isPast = currentIdx > i

                      return (
                        <div key={step} className="flex flex-col items-center gap-4">
                          <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 transition-all duration-1000 flex items-center justify-center ${
                            isActive ? 'bg-violet-500 border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.6)] scale-110' : 
                            isPast ? 'bg-zinc-800 border-zinc-800' : 'bg-black border-zinc-900'
                          }`}>
                            {isPast && <CheckCircle2 className="w-2.5 h-2.5 text-zinc-400" />}
                          </div>
                          <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${
                            isActive ? 'text-white' : 'text-zinc-700'
                          }`}>{step}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>

              {/* Lead Stream */}
              <section className="space-y-8">
                <div className="flex justify-between items-end">
                  <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Target className="w-3 h-3 text-emerald-500" /> Live Lead Stream
                  </h3>
                  <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest">Captured_by_Vizulux_Engine</p>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {clientLeads && clientLeads.length > 0 ? (
                    clientLeads.map((lead: any) => (
                      <div key={lead.id} className="glass p-6 rounded-[32px] border-white/5 flex items-center justify-between group hover:border-emerald-500/20 transition-all duration-500">
                        <div className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 flex items-center justify-center border border-emerald-500/10">
                            <UserCheck className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div>
                            <p className="text-white font-bold tracking-tight">{lead.name}</p>
                            <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">{new Date(lead.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest border border-zinc-900 px-3 py-1 rounded-full italic">SECURE_DATA</span>
                          <button className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-zinc-500 group-hover:text-white transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-16 text-center border border-dashed border-zinc-900 rounded-[40px] bg-zinc-950/20">
                      <Activity className="w-8 h-8 text-zinc-800 mx-auto mb-4" />
                      <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.3em]">Lead_Engine_Synchronizing...</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Technical Updates */}
              <section className="space-y-8">
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <FileCode className="w-3 h-3 text-violet-500" /> Technical Sync History
                </h3>
                
                <div className="space-y-6">
                  {updates.length > 0 ? (
                    updates.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((update: any) => (
                      <div key={update.id} className="glass p-8 rounded-[40px] border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${
                              update.type === 'milestone' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                              update.type === 'alert' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                              'bg-violet-500/10 border-violet-500/20 text-violet-400'
                            }`}>
                              <Zap className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-white tracking-tight">{update.title}</h4>
                              <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                                UTC_TIMESTAMP: {new Date(update.created_at).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                            {update.type}
                          </div>
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed pl-12 border-l border-white/5 ml-4">
                          {update.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center border border-dashed border-zinc-900 rounded-[40px]">
                      <p className="text-zinc-700 text-[10px] font-bold uppercase tracking-[0.3em]">Awaiting initial synchronization log</p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Visibility Node */}
              <section className="glass p-8 rounded-[48px] border-violet-500/20 bg-violet-500/[0.02] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 blur-[60px]" />
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3 text-violet-400" /> 
                  {activeProject.status === 'live' ? 'Visibility Score' : 'Market Calibration'}
                </h3>

                {activeProject.status === 'live' ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-5xl font-black text-white italic tracking-tighter">84%</span>
                      <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mb-2">+12.4% THIS_WEEK</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '84%' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-violet-600 to-cyan-400"
                      />
                    </div>
                    <p className="text-zinc-500 text-[10px] leading-relaxed">
                      Your engine is currently outperforming <span className="text-white">72% of local Vermont competitors</span> in your industry niche.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-2xl font-black text-white italic tracking-tighter uppercase">Initializing</span>
                      <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest mb-2 animate-pulse font-mono">STATUS: INDEXING_NODES</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden relative">
                      <motion.div 
                        animate={{ 
                          x: ['-100%', '100%'],
                          opacity: [0.3, 1, 0.3]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                      />
                    </div>
                    <div className="space-y-2 pt-2">
                      {["SCANNING_COMPETITOR_GAPS...", "MAPPING_VERMONT_GEO_NODES...", "CALIBRATING_CONVERSION_PATH..."].map((text, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-violet-900" />
                          <span className="text-[7px] font-mono text-zinc-600 uppercase tracking-widest">{text}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-zinc-500 text-[10px] leading-relaxed italic">
                      Advanced SEO nodes are being pre-loaded. Your Visibility Score will activate upon system launch.
                    </p>
                  </div>
                )}
              </section>

              <MeetingRequester 
                projectId={activeProject.id} 
                clientEmail={user.email!} 
                projectName={activeProject.name} 
              />

              {/* Secure Payment Nodes */}
              {(activeProject.invoice_link || activeProject.retainer_link) && (
                <section className="space-y-4">
                  <h3 className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.4em] ml-4">Financial_Sync_Required</h3>
                  
                  {activeProject.invoice_link && (
                    <div className="glass p-6 rounded-[32px] border-violet-500/20 bg-violet-500/[0.02] relative overflow-hidden group">
                      <div className="relative z-10 flex justify-between items-center">
                        <div>
                          <p className="text-[8px] font-black text-violet-400 uppercase tracking-widest mb-1">Node: BUILD_FEE</p>
                          <p className="text-sm font-bold text-white uppercase tracking-tighter italic">Engine_Ignition</p>
                        </div>
                        <a href={activeProject.invoice_link} className="p-3 rounded-xl bg-white text-black hover:scale-110 transition-all">
                          <DollarSign className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}

                  {activeProject.retainer_link && (
                    <div className="glass p-6 rounded-[32px] border-cyan-500/20 bg-cyan-500/[0.02] relative overflow-hidden group">
                      <div className="relative z-10 flex justify-between items-center">
                        <div>
                          <p className="text-[8px] font-black text-cyan-400 uppercase tracking-widest mb-1">Node: RETAINER</p>
                          <p className="text-sm font-bold text-white uppercase tracking-tighter italic">Support_Node</p>
                        </div>
                        <a href={activeProject.retainer_link} className="p-3 rounded-xl bg-cyan-500 text-black hover:scale-110 transition-all">
                          <Repeat className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Asset Vault */}
              <section className="glass p-8 rounded-[48px] border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 hud-grid opacity-5" />
                <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <AlertCircle className="w-3 h-3 text-violet-400" /> Project Assets
                </h3>
                <AssetUploader projectId={activeProject.id} userId={user.id} />
              </section>

              {/* Support Node */}
              <div className="p-10 bg-zinc-950 border border-white/5 rounded-[48px] text-center shadow-2xl relative overflow-hidden group">
                <p className="text-[8px] font-black text-zinc-700 uppercase tracking-[0.4em] mb-6 text-center">Direct Architect Access</p>
                <p className="text-2xl font-bold text-white mb-2 tracking-tighter">802-585-9179</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black">Zack Lacey</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
