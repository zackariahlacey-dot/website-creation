import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/utils/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl px-8 py-1.5 rounded-xl glass border border-white/5 backdrop-blur-2xl flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2">
        <Image 
          src="/vizulux.png" 
          alt="VIZULUX Logo" 
          width={90} 
          height={24} 
          className="object-contain opacity-90 hover:opacity-100 transition-opacity"
          priority
        />
      </div>
      <div className="hidden md:flex items-center gap-10 text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-500">
        <Link href="#services" className="hover:text-white transition-colors text-zinc-400">Specializations</Link>
        <Link href="#process" className="hover:text-white transition-colors text-zinc-400">Blueprint</Link>
        <Link href="#contact" className="hover:text-white transition-colors text-zinc-400">Contact</Link>
        
        <div className="h-4 w-[1px] bg-white/10 mx-2" />

        {user ? (
          <Link 
            href={user.email === 'zackariahlacey@gmail.com' ? '/admin' : '/portal'} 
            className="px-5 py-2 bg-white text-black rounded-lg hover:scale-105 transition-transform font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Dashboard
          </Link>
        ) : (
          <Link 
            href="/login" 
            className="px-5 py-2 bg-violet-600/10 text-violet-400 rounded-lg hover:bg-violet-600 hover:text-white transition-all border border-violet-500/20 font-bold shadow-[0_0_15px_rgba(139,92,246,0.1)]"
          >
            Portal Access
          </Link>
        )}
      </div>
    </nav>
  )
}
