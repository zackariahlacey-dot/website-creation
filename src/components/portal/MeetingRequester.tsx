'use client'

import { useState } from 'react'
import { requestMeeting } from '@/app/actions/meetings'
import { Calendar, Loader2, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function MeetingRequester({ projectId, clientEmail, projectName }: { projectId: string, clientEmail: string, projectName: string }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleRequest = async () => {
    setLoading(true)
    const result = await requestMeeting(projectId, clientEmail, projectName)
    if (result.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    }
    setLoading(false)
  }

  return (
    <div className="relative group">
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest text-center">
              Request Logged <br />
              <span className="text-[8px] opacity-60">Architect notified via secure line</span>
            </span>
          </motion.div>
        ) : (
          <motion.button 
            disabled={loading}
            onClick={handleRequest}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-violet-600/10 border border-violet-500/20 text-violet-400 rounded-2xl flex items-center justify-center gap-3 hover:bg-violet-600 hover:text-white transition-all duration-500 group/btn"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Calendar className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            )}
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              {loading ? 'Initializing Sync...' : 'Request Blueprint Review'}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
