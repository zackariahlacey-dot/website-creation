'use client'

import { useState } from 'react'
import { addProjectUpdate } from '@/app/actions/admin'
import { Send, Zap, Milestone, AlertTriangle } from 'lucide-react'

export function ProjectUpdateManager({ project, clientEmail }: { project: any, clientEmail: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<{
    title: string,
    content: string,
    type: 'update' | 'milestone' | 'alert'
  }>({
    title: '',
    content: '',
    type: 'update'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await addProjectUpdate(project.id, clientEmail, formData.title, formData.content, formData.type)
    setLoading(false)
    setIsOpen(false)
    setFormData({ title: '', content: '', type: 'update' })
  }

  return (
    <div className="mt-6 border-t border-white/5 pt-6">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.2em] hover:text-violet-300 transition-colors flex items-center gap-2"
        >
          <Zap className="w-3 h-3" /> Broadcast Project Sync
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {(['update', 'milestone', 'alert'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type })}
                className={`text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-all ${
                  formData.type === type 
                    ? 'bg-violet-500/20 border-violet-500/50 text-violet-400' 
                    : 'bg-zinc-900 border-white/5 text-zinc-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <input 
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:border-violet-500 outline-none"
            placeholder="Update Title (e.g. Navigation HUD Synced)"
          />
          <textarea 
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-zinc-400 focus:border-violet-500 outline-none h-20 resize-none"
            placeholder="Technical details for the client..."
          />
          <div className="flex gap-2">
            <button 
              disabled={loading}
              className="flex-1 py-2 bg-white text-black font-bold text-[10px] uppercase tracking-widest rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3 h-3" /> {loading ? 'Broadcasting...' : 'Post Update'}
            </button>
            <button 
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
