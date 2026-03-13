'use client'

import { useState } from 'react'
import { updateProjectTechnicalSpecs, updateProjectStatus, deleteProject } from '@/app/actions/admin'
import { Github, CreditCard, Link as LinkIcon, Database, Terminal, CheckCircle2, Loader2, Save, Globe, Eye, Settings2, Trash2, AlertTriangle, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProjectUpdateManager } from './ProjectUpdateManager'
import { TaskManager } from './TaskManager'
import { useRouter } from 'next/navigation'

const lifecycleSteps = [
  { id: 'strategy', label: 'Strategy' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Build' },
  { id: 'live', label: 'Launch' }
]

export function ProjectWorkspace({ project, clientEmail }: { project: any, clientEmail: string }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()
  const [specs, setSpecs] = useState({
    github_repo: project.github_repo || '',
    stripe_customer_id: project.stripe_customer_id || '',
    preview_url: project.preview_url || '',
    invoice_link: project.invoice_link || '',
    admin_notes: project.admin_notes || ''
  })

  const handleSaveSpecs = async () => {
    setLoading('specs')
    await updateProjectTechnicalSpecs(project.id, specs)
    router.refresh()
    setLoading(null)
  }

  const handleStatusChange = async (status: string) => {
    setLoading('status_' + status)
    await updateProjectStatus(project.id, status)
    router.refresh()
    setLoading(null)
  }

  const handleDelete = async () => {
    setLoading('delete')
    await deleteProject(project.id)
    router.refresh()
    setLoading(null)
  }

  return (
    <motion.div 
      layout
      className={`glass rounded-[48px] border transition-all duration-700 overflow-hidden hud-grid group ${
        isExpanded ? 'border-violet-500/40 shadow-[0_0_80px_rgba(139,92,246,0.15)] mb-12' : 'border-white/5 hover:border-white/10'
      }`}
    >
      {/* Header Blade */}
      <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
        <div className="flex items-center gap-6">
          <div className={`w-14 h-14 rounded-[20px] flex items-center justify-center border transition-all duration-500 ${isExpanded ? 'bg-violet-500/20 border-violet-500/40 text-violet-400' : 'bg-white/5 border-white/5 text-zinc-600'}`}>
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-bold text-white tracking-tighter italic">{project.name}</h3>
              <span className="text-[8px] font-black text-violet-500 uppercase tracking-[0.3em] bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">Active_Node</span>
            </div>
            <p className="text-xs text-zinc-500 font-medium">Authorized_Client: {project.profiles?.full_name || 'REDACTED'}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 relative z-20">
          <div className="flex gap-1 mr-4">
            {lifecycleSteps.map((step) => (
              <div key={step.id} className={`w-3 h-1 rounded-full ${project.status === step.id ? 'bg-violet-500 animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'bg-zinc-800'}`} />
            ))}
          </div>

          <div className="flex gap-2">
            {!confirmDelete ? (
              <button 
                onClick={() => setConfirmDelete(true)}
                className="p-3 rounded-xl bg-zinc-900 text-zinc-600 border border-white/5 hover:text-red-500 hover:border-red-500/30 transition-all"
                title="Deconstruct Node"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
                <button 
                  onClick={handleDelete}
                  disabled={loading === 'delete'}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl font-black text-[8px] uppercase tracking-widest hover:bg-red-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                >
                  {loading === 'delete' ? <Loader2 className="w-3 h-3 animate-spin" /> : <AlertTriangle className="w-3 h-3" />}
                  CONFIRM_DECONSTRUCTION
                </button>
                <button 
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl font-black text-[8px] uppercase tracking-widest hover:text-white transition-all"
                >
                  CANCEL
                </button>
              </div>
            )}

            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${isExpanded ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-400 border border-white/5'}`}
            >
              {isExpanded ? 'CLOSE_WORKSPACE' : 'ACCESS_WORKSPACE'}
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Workspace */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-zinc-950/40"
          >
            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Column 1: System Vitals & Lifecycle */}
              <div className="space-y-10">
                <section className="space-y-6">
                  <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] flex items-center gap-2">
                    <Activity className="w-3 h-3" /> System_Vitals
                  </h4>
                  <div className="space-y-4">
                    {lifecycleSteps.map((step) => (
                      <button
                        key={step.id}
                        onClick={() => handleStatusChange(step.id)}
                        disabled={loading === 'status_' + step.id}
                        className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group/step ${
                          project.status === step.id 
                            ? 'bg-violet-500 border-violet-500 text-white shadow-lg shadow-violet-500/20' 
                            : 'bg-black/40 border-white/5 text-zinc-500 hover:border-white/10'
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">{step.label} Phase</span>
                        {loading === 'status_' + step.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <div className={`w-1.5 h-1.5 rounded-full ${project.status === step.id ? 'bg-white animate-ping' : 'bg-zinc-800'}`} />}
                      </button>
                    ))}
                  </div>
                </section>

                <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 space-y-4">
                  <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Network_Sync_Status</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Latency</span>
                    <span className="text-[10px] font-mono text-emerald-500">OPTIMAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Last_Push</span>
                    <span className="text-[8px] font-mono text-zinc-600">{new Date(project.updated_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Technical Specifications */}
              <div className="space-y-10">
                <section className="space-y-6">
                  <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> Technical_Specs
                  </h4>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold text-zinc-700 uppercase ml-1">GitHub Repository</label>
                      <div className="relative">
                        <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                        <input 
                          value={specs.github_repo}
                          onChange={(e) => setSpecs({ ...specs, github_repo: e.target.value })}
                          className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-[10px] text-white focus:border-violet-500 outline-none"
                          placeholder="vizulux/client-repo"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold text-zinc-700 uppercase ml-1">Vercel Preview URL</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                        <input 
                          value={specs.preview_url}
                          onChange={(e) => setSpecs({ ...specs, preview_url: e.target.value })}
                          className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-[10px] text-white focus:border-violet-500 outline-none"
                          placeholder="https://client-preview.vercel.app"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-bold text-zinc-700 uppercase ml-1">Stripe Customer ID</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                        <input 
                          value={specs.stripe_customer_id}
                          onChange={(e) => setSpecs({ ...specs, stripe_customer_id: e.target.value })}
                          className="w-full bg-black border border-white/5 rounded-xl pl-12 pr-4 py-3 text-[10px] text-white focus:border-violet-500 outline-none"
                          placeholder="cus_R123..."
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleSaveSpecs}
                      disabled={loading === 'specs'}
                      className="w-full py-4 bg-zinc-900 text-white font-black text-[9px] uppercase tracking-[0.3em] rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 border border-white/5"
                    >
                      {loading === 'specs' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      Sync_Technical_Nodes
                    </button>
                  </div>
                </section>
              </div>

              {/* Column 3: Build Tasks & Broadcast */}
              <div className="space-y-10">
                <TaskManager projectId={project.id} tasks={project.tasks || []} />
                <ProjectUpdateManager project={project} clientEmail={clientEmail} />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Internal Laser Scan HUD */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-10" />
    </motion.div>
  )
}
