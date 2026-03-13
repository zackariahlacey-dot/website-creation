'use client'

import { useState } from 'react'
import { Mail, Clock, Cpu, Terminal, Activity, Layout } from 'lucide-react'
import { LeadManager } from '@/components/admin/LeadManager'
import { ProjectManager } from '@/components/admin/ProjectManager'
import { UserApprover } from '@/components/admin/UserApprover'
import { SystemLog } from '@/components/admin/SystemLog'
import { ProjectWorkspace } from './ProjectWorkspace'
import { motion, AnimatePresence } from 'framer-motion'

type AdminNode = 'operations' | 'builds' | 'users' | 'logs'

export function AdminMainframe({ initialData }: { initialData: any }) {
  const [activeNode, setActiveNode] = useState<AdminNode>('operations')
  
  const navItems = [
    { id: 'operations', label: 'Operations', icon: Activity, count: initialData.leads.filter((l: any) => l.status === 'new').length },
    { id: 'builds', label: 'Build_Queue', icon: Layout, count: initialData.projects.length },
    { id: 'users', label: 'Node_Control', icon: Cpu, count: initialData.profiles.length },
    { id: 'logs', label: 'System_Logs', icon: Terminal, count: null }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20">
      {/* Terminal Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Mainframe_Connected</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tighter italic">Command Center</h1>
        </div>

        {/* Node Switcher */}
        <nav className="flex gap-2 p-1.5 bg-zinc-950 border border-white/5 rounded-2xl backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNode(item.id as AdminNode)}
              className={`px-6 py-3 rounded-xl transition-all duration-500 flex items-center gap-3 group relative ${
                activeNode === item.id ? 'bg-white/5 text-white' : 'text-zinc-600 hover:text-zinc-400'
              }`}
            >
              <item.icon className={`w-4 h-4 transition-colors ${activeNode === item.id ? 'text-violet-400' : 'group-hover:text-zinc-400'}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              {item.count !== null && item.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-black border ${
                  activeNode === item.id ? 'bg-violet-500 border-violet-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}>
                  {item.count}
                </span>
              )}
              {activeNode === item.id && (
                <motion.div layoutId="tab-glow" className="absolute inset-0 border border-violet-500/30 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.1)] pointer-events-none" />
              )}
            </button>
          ))}
        </nav>
      </header>

      {/* Node View Area */}
      <main className="relative min-h-[60vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeNode === 'operations' && (
              <div className="space-y-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight italic uppercase">Lead_Operations</h2>
                </div>
                <LeadManager leads={initialData.leads} />
              </div>
            )}

            {activeNode === 'builds' && (
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                    <Layout className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight italic uppercase">Active_Build_Queue</h2>
                </div>
                <div className="space-y-6">
                  {initialData.projects.map((project: any) => (
                    <ProjectWorkspace 
                      key={project.id} 
                      project={project} 
                      clientEmail={project.profiles?.email} 
                    />
                  ))}
                </div>
              </div>
            )}

            {activeNode === 'users' && (
              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 text-violet-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight italic uppercase">Authorized_Node_Network</h2>
                </div>
                <UserApprover users={initialData.profiles} />
              </div>
            )}

            {activeNode === 'logs' && (
              <div className="space-y-8">
                <SystemLog logs={initialData.logs} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
