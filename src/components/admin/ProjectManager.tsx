'use client'

import { useState } from 'react'
import { updateProjectStatus, linkProjectToClient } from '@/app/actions/admin'
import { Clock, ExternalLink, Loader2, UserLink } from 'lucide-react'
import { ProjectUpdateManager } from './ProjectUpdateManager'
import { useRouter } from 'next/navigation'

const lifecycleSteps = [
  { id: 'strategy', label: 'Strategy' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Build' },
  { id: 'live', label: 'Launch' }
]

export function ProjectManager({ projects, allClients }: { projects: any[], allClients?: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleStatusChange = async (id: string, status: string) => {
    setLoading(id + status)
    await updateProjectStatus(id, status)
    router.refresh()
    setLoading(null)
  }

  const handleLinkClient = async (projectId: string, clientId: string) => {
    if (!clientId) return
    setLoading(projectId + '_link')
    await linkProjectToClient(projectId, clientId)
    router.refresh()
    setLoading(null)
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="glass p-12 rounded-[40px] border border-dashed border-zinc-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 hud-grid opacity-5" />
        <Clock className="w-10 h-10 text-zinc-800 mx-auto mb-6 animate-pulse" />
        <h3 className="text-xl font-bold text-zinc-600 uppercase tracking-tighter italic mb-2">Queue_Standby</h3>
        <p className="text-[10px] font-bold text-zinc-700 uppercase tracking-[0.3em]">Waiting for initial build command...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <div key={project.id} className="glass p-8 rounded-[40px] border-white/5 bg-zinc-950/20 hover:border-white/10 transition-all duration-500 relative overflow-hidden group/project">
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{project.name}</h3>
              {project.client_id ? (
                <p className="text-sm text-zinc-500 font-medium">Architecting for: {project.profiles?.full_name || project.profiles?.email || 'Authorized Node'}</p>
              ) : (
                <div className="mt-2 flex items-center gap-4">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 animate-pulse">Unassigned Node</span>
                  <select 
                    onChange={(e) => handleLinkClient(project.id, e.target.value)}
                    className="bg-zinc-900 text-[10px] font-bold text-white border border-white/10 rounded-lg px-2 py-1 outline-none focus:border-violet-500"
                  >
                    <option value="">Link to Client...</option>
                    {allClients?.map(c => (
                      <option key={c.id} value={c.id}>{c.full_name || c.email}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-violet-500 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                {project.status} PHASE
              </span>
            </div>
          </div>

          {/* Lifecycle Power-Bar */}
          <div className="relative z-10 mb-10">
            <div className="flex justify-between items-center gap-2">
              {lifecycleSteps.map((step, idx) => {
                const isActive = project.status === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStatusChange(project.id, step.id)}
                    disabled={loading === project.id + step.id}
                    className={`flex-1 py-3 px-2 rounded-xl border transition-all duration-500 flex flex-col items-center gap-2 group/step ${
                      isActive 
                        ? 'bg-violet-500 border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.3)]' 
                        : 'bg-white/5 border-white/5 text-zinc-600 hover:border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isActive ? 'text-white' : 'text-zinc-700 group-hover/step:text-zinc-400'}`}>
                      {step.label}
                    </span>
                    {loading === project.id + step.id && <Loader2 className="w-3 h-3 animate-spin text-white" />}
                  </button>
                )
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-6 relative z-10">
            <a 
              href={project.preview_url || '#'} 
              className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${project.preview_url ? 'text-zinc-400 hover:text-white' : 'text-zinc-800 cursor-not-allowed'}`}
            >
              <ExternalLink className="w-3 h-3" /> Preview_Node
            </a>
            <div className="text-[8px] text-zinc-700 font-mono tracking-widest ml-auto">
              LAST_SYNC: {new Date(project.updated_at).toISOString()}
            </div>
          </div>

          <ProjectUpdateManager project={project} clientEmail={project.profiles?.email} />
          
          {/* Laser Scan HUD */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover/project:animate-scan pointer-events-none" />
        </div>
      ))}
    </div>
  )
}
