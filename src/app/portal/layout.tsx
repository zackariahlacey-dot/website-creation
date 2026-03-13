import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CyberWebBackground from '@/components/landing/CyberWebBackground'
import { PendingApproval } from '@/components/portal/PendingApproval'

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
    return <PendingApproval />
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
