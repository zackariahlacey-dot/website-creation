'use client'

import { useState } from 'react'
import { addTask, toggleTaskCompletion } from '@/app/actions/admin'
import { Plus, CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function TaskManager({ projectId, tasks }: { projectId: string, tasks: any[] }) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [loading, setLoading] = useState<string | null>(null)

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return
    setLoading('add')
    await addTask(projectId, newTaskTitle)
    setNewTaskTitle('')
    setLoading(null)
  }

  const handleToggleTask = async (taskId: string, current: boolean) => {
    setLoading(taskId)
    await toggleTaskCompletion(taskId, current)
    setLoading(null)
  }

  return (
    <div className="space-y-6">
      <h4 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] flex items-center gap-2">
        <CheckCircle2 className="w-3 h-3" /> Build_Tasks
      </h4>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input 
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1 bg-black border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white focus:border-violet-500 outline-none"
          placeholder="New Task (e.g. SEO optimization...)"
        />
        <button 
          disabled={loading === 'add'}
          className="px-4 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center disabled:opacity-50"
        >
          {loading === 'add' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </form>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
              task.is_completed ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 opacity-60' : 'bg-black/40 border-white/5 text-zinc-400'
            }`}
          >
            <span className="text-[10px] font-bold tracking-tight">{task.title}</span>
            <button 
              onClick={() => handleToggleTask(task.id, task.is_completed)}
              disabled={loading === task.id}
              className="transition-transform active:scale-90"
            >
              {loading === task.id ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : task.is_completed ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Circle className="w-4 h-4 text-zinc-800" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
