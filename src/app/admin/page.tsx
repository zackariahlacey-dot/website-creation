import { createAdminClient } from '@/utils/supabase/admin'
import { AdminMainframe } from '@/components/admin/AdminMainframe'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = createAdminClient()
  
  // Fetch all data server-side using the Service Role (Bypasses RLS)
  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  const { data: projects } = await supabase
    .from('projects')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*, projects(*)')
    .order('created_at', { ascending: false })

  const { data: authData } = await supabase.auth.admin.listUsers()
  const authUsers = authData?.users || []

  const { data: logs } = await supabase
    .from('system_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  // Merge and clean profiles
  const allProfiles = authUsers
    .filter(u => u.email !== 'zackariahlacey@gmail.com')
    .map(u => {
      const profile = profiles?.find(p => p.id === u.id)
      return {
        id: u.id,
        email: u.email,
        full_name: profile?.full_name || u.user_metadata?.full_name || 'NEW_ENTITY',
        is_approved: profile?.is_approved || false,
        projects: profile?.projects || [],
        created_at: u.created_at
      }
    })

  const mainframeData = {
    leads: leads || [],
    projects: projects || [],
    profiles: allProfiles || [],
    logs: logs || []
  }

  return <AdminMainframe initialData={mainframeData} />
}
