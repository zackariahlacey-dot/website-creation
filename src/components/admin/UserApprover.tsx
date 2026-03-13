'use client'

import { useState } from 'react'
import { toggleUserApproval, initializeProject } from '@/app/actions/admin'
import { ShieldCheck, ShieldAlert, UserPlus, Fingerprint, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import ProjectInitModal from './ProjectInitModal'

export function UserApprover({ users }: { users: any[] }) {
  const [loading, setLoading] = useState<string | null>(null)
  const [initModal, setInitModal] = useState<{ isOpen: boolean, clientId: string, clientName: string }>({
    isOpen: false,
    clientId: '',
    clientName: ''
  })
  const router = useRouter()

  const handleToggle = async (id: string, email: string, current: boolean) => {
    setLoading(id)
    const result = await toggleUserApproval(id, email, current)
    if (result?.error) {
      alert(`AUTH_FAILURE: ${result.error}`)
    } else {
      router.refresh()
    }
    setLoading(null)
  }

  const handleConfirmInit = async (projectName: string) => {
    const { clientId } = initModal
    setLoading(clientId + '_init')
    const result = await initializeProject(clientId, projectName)
    
    if (result?.error) {
      alert(`INIT_FAILURE: ${result.error}`)
    } else {
      router.refresh()
    }
    setLoading(null)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {users.map((user) => (
        <motion.div 
          key={user.id}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="group relative perspective-1000"
        >
          <div className={`glass p-[1px] rounded-[40px] border transition-all duration-700 ${
            user.is_approved 
              ? 'border-violet-500/20 hover:border-violet-400/50 shadow-[0_0_40px_rgba(139,92,246,0.05)]' 
              : 'border-amber-500/20 hover:border-rose-500/40 shadow-[0_0_40px_rgba(245,158,11,0.05)]'
          }`}>
            <div className="bg-zinc-950/90 backdrop-blur-3xl rounded-[39px] p-8 md:p-10 relative overflow-hidden hud-grid">
              
              {/* HUD Elements */}
              <div className={`absolute top-6 left-6 w-2 h-2 border-t border-l transition-colors ${user.is_approved ? 'border-violet-800 group-hover:border-violet-500' : 'border-amber-800 group-hover:border-amber-500'}`} />
              <div className={`absolute top-6 right-6 w-2 h-2 border-t border-r transition-colors ${user.is_approved ? 'border-violet-800 group-hover:border-violet-500' : 'border-amber-800 group-hover:border-amber-500'}`} />

              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Fingerprint className={`w-3 h-3 ${user.is_approved ? 'text-cyan-400' : 'text-rose-400'}`} />
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Node_Identity</span>
                  </div>
                  <p className="text-[10px] font-mono text-zinc-400">{user.id.split('-')[0].toUpperCase()}_CORE</p>
                </div>
                <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${
                  user.is_approved 
                    ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' 
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                }`}>
                  {user.is_approved ? 'Authorized' : 'Verification_Req'}
                </div>
              </div>

              <div className="relative z-10 mb-10">
                <h3 className="text-2xl font-bold text-white tracking-tighter mb-1 italic">
                  {user.full_name || 'UNIDENTIFIED_ENTITY'}
                </h3>
                <p className="text-xs font-medium text-zinc-500 font-mono tracking-tight lowercase">{user.email}</p>
              </div>

              {/* Integrity bar */}
              <div className="space-y-3 mb-10 relative z-10">
                <div className="flex justify-between items-end text-[8px] font-bold uppercase tracking-widest text-zinc-700">
                  <div className="flex items-center gap-2"><Cpu className="w-2.5 h-2.5" /> Build_Integrity</div>
                  <span className="font-mono">{user.projects?.length || 0} Nodes</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: user.projects?.length > 0 ? '100%' : '15%' }}
                    className={`h-full rounded-full ${user.is_approved ? 'bg-gradient-to-r from-violet-600 to-cyan-400' : 'bg-zinc-800'}`}
                  />
                </div>
              </div>

              <div className="relative z-10 flex gap-2">
                <button 
                  onClick={() => handleToggle(user.id, user.email, user.is_approved)}
                  disabled={loading === user.id}
                  className={`flex-1 py-4 font-black text-[9px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 border ${
                    user.is_approved 
                      ? 'bg-zinc-900/80 border-white/5 text-zinc-500 hover:text-rose-400 hover:border-rose-500/30' 
                      : 'bg-gradient-to-r from-amber-500 to-rose-500 text-black border-none hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]'
                  }`}
                >
                  {loading === user.id ? 'SYNCHRONIZING...' : user.is_approved ? 'Revoke_Node' : 'Authorize_Entry'}
                </button>
                {user.is_approved && (
                  <button 
                    onClick={() => setInitModal({ isOpen: true, clientId: user.id, clientName: user.full_name || 'Prospect' })}
                    disabled={loading === user.id + '_init' || (user.projects?.length > 0)}
                    className={`px-5 py-4 rounded-2xl transition-all flex items-center justify-center shadow-xl hover:scale-[1.05] ${
                      (user.projects?.length > 0) 
                        ? 'bg-zinc-900 text-zinc-700 border border-white/5 cursor-not-allowed grayscale' 
                        : 'bg-white text-black hover:bg-cyan-50 hover:shadow-cyan-500/20'
                    }`}
                    title={user.projects?.length > 0 ? "Node already active" : "Initialize New Project"}
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                )}

              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/4 w-full -translate-y-full group-hover:animate-scan pointer-events-none opacity-20" />
              <div className={`absolute -bottom-24 -right-24 w-80 h-80 blur-[120px] transition-all duration-1000 ${user.is_approved ? 'bg-cyan-500/5 group-hover:bg-violet-500/10' : 'bg-rose-500/5 group-hover:bg-amber-500/10'}`} />
            </div>
          </div>
        </motion.div>
      ))}

      <ProjectInitModal 
        isOpen={initModal.isOpen}
        onClose={() => setInitModal({ ...initModal, isOpen: false })}
        onConfirm={handleConfirmInit}
        clientName={initModal.clientName}
      />
    </div>
  )
}
