import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import CyberWebBackground from '@/components/landing/CyberWebBackground'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== 'zackariahlacey@gmail.com') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <CyberWebBackground />
      
      {/* Background Grid Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #27272a 1px, transparent 1px), linear-gradient(to bottom, #27272a 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          transform: 'perspective(1200px) rotateX(65deg) translateY(100px)',
        }}
      />

      <nav className="border-b border-white/5 px-8 py-4 flex items-center justify-between relative z-50 backdrop-blur-xl bg-black/40">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <Link href="/" className="font-black text-white tracking-[0.3em] text-xs uppercase">Vizulux_Mainframe</Link>
          </div>
          <div className="flex items-center gap-8 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            <Link href="/admin" className="hover:text-white transition-colors">Operations</Link>
            <Link href="/admin/projects" className="hover:text-white transition-colors">Build_Queue</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{user.email}</span>
          <div className="h-4 w-[1px] bg-white/10" />
          <form action="/auth/signout" method="post">
            <button className="text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Sign_Out</button>
          </form>
        </div>
      </nav>
      <main className="flex-1 p-8 relative z-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
