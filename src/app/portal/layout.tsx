import { Shield } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CyberWebBackground from '@/components/landing/CyberWebBackground'

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check Approval Status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_approved')
    .eq('id', user.id)
    .single()

  if (profile?.is_approved === false) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden text-center cursor-wait">
        <CyberWebBackground />
        
        {/* Luminous Atmospheric Depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl w-full glass p-[1px] rounded-[60px] relative z-10 border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
        >
          <div className="bg-zinc-950/60 backdrop-blur-3xl rounded-[59px] p-12 md:p-20 relative overflow-hidden hud-grid">
            
            {/* Corner HUD Markers */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-zinc-800 animate-pulse" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-zinc-800 animate-pulse" />
            
            <div className="relative z-10 space-y-10">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-violet-500/10 rounded-3xl flex items-center justify-center mx-auto border border-violet-500/20 relative group">
                  <Shield className="w-12 h-12 text-violet-400 animate-pulse" />
                  {/* Rotating Outer Ring */}
                  <div className="absolute inset-[-8px] border border-violet-500/20 rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/5 border border-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-[0.4em]">
                  Verification_In_Progress
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase italic leading-none">Authorization <br /><span className="text-zinc-700">Pending.</span></h1>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                  Your project node is currently synchronizing with the Vizulux terminal. Access requires a manual signature from Zack Lacey.
                </p>
              </div>

              {/* Fake System Progress Bar */}
              <div className="space-y-3 pt-4">
                <div className="flex justify-between items-end">
                  <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Protocol: ALPHA_SYNC</span>
                  <span className="text-[10px] font-mono text-zinc-500">99.2%</span>
                </div>
                <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "99.2%" }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-gradient-to-r from-violet-600 via-rose-400 to-amber-300 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <form action="/auth/signout" method="post">
                  <button className="text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-[0.5em] transition-all hover:tracking-[0.6em] group flex items-center gap-3 mx-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-red-500 transition-colors" />
                    Terminate_Session
                  </button>
                </form>
              </div>
            </div>

            {/* Scanning Laser HUD */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent h-1/4 w-full -translate-y-full animate-[scan_6s_linear_infinite] pointer-events-none" />
          </div>
        </motion.div>

        {/* Global Telemetry HUD */}
        <div className="absolute bottom-12 left-12 text-left space-y-1 font-mono text-[8px] text-zinc-800 font-bold tracking-widest uppercase">
          <div>[ NODE_IP: REDACTED ]</div>
          <div>[ ENCRYPTION: AES_256 ]</div>
        </div>
        <div className="absolute bottom-12 right-12 text-right space-y-1 font-mono text-[8px] text-zinc-800 font-bold tracking-widest uppercase">
          <div>[ REGION: VT_EXT_NODE ]</div>
          <div>[ STATUS: WAITING_FOR_ARCHITECT ]</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <CyberWebBackground />
      
      {/* Background Grid Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-5 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          transform: 'perspective(1200px) rotateX(65deg) translateY(100px)',
        }}
      />

      <nav className="border-b border-white/5 px-8 py-4 flex items-center justify-between relative z-50 backdrop-blur-xl bg-black/40">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-black text-white tracking-[0.3em] text-xs uppercase hover:text-violet-400 transition-colors text-zinc-400">Vizulux_HQ</Link>
          <Link href="/" className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 border-l border-white/10 pl-8">
            <div className="w-1 h-1 rounded-full bg-zinc-800" />
            Public_View
          </Link>
        </div>
        <div className="flex items-center gap-8">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{user.email}</span>
          <form action="/auth/signout" method="post">
            <button className="text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Terminate_Session</button>
          </form>
        </div>
      </nav>
      <main className="flex-1 p-8 pt-12 relative z-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
