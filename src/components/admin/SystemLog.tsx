'use client'

import { motion } from 'framer-motion'
import { Terminal, AlertCircle, Info, ShieldAlert } from 'lucide-react'

export function SystemLog({ logs }: { logs: any[] }) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5">
          <Terminal className="w-5 h-5 text-zinc-500" />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight uppercase italic">Mainframe_Event_Log</h2>
      </div>

      <div className="glass rounded-[40px] border border-white/5 bg-zinc-950/40 overflow-hidden relative group">
        <div className="absolute inset-0 hud-grid opacity-5" />
        
        <div className="max-h-[400px] overflow-y-auto p-8 font-mono space-y-4 relative z-10 scrollbar-hide">
          {logs.length > 0 ? (
            logs.map((log, i) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 items-start border-b border-white/[0.03] pb-4 group/log"
              >
                <div className={`mt-1 shrink-0`}>
                  {log.level === 'critical' && <ShieldAlert className="w-3 h-3 text-red-500" />}
                  {log.level === 'warning' && <AlertCircle className="w-3 h-3 text-amber-500" />}
                  {log.level === 'info' && <Info className="w-3 h-3 text-blue-500" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      log.level === 'critical' ? 'text-red-400' : 
                      log.level === 'warning' ? 'text-amber-400' : 
                      'text-blue-400'
                    }`}>
                      {log.event}
                    </span>
                    <span className="text-[8px] text-zinc-700 font-bold uppercase">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  <pre className="text-[10px] text-zinc-500 whitespace-pre-wrap break-all leading-relaxed bg-black/20 p-3 rounded-lg border border-white/[0.02]">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center text-[10px] font-bold text-zinc-800 uppercase tracking-[0.5em]">
              NO_LOGS_FOUND_IN_BUFFER
            </div>
          )}
        </div>

        {/* Scan Line Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-1/4 w-full -translate-y-full animate-[scan_12s_linear_infinite] pointer-events-none" />
      </div>
    </section>
  )
}
