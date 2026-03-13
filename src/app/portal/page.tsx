import { createClient } from '@/utils/supabase/server'
import AdminDashboard from '../admin/page'
import { BlueprintInitializing } from '@/components/portal/BlueprintInitializing'
import { ClientDashboard } from '@/components/portal/ClientDashboard'

export const dynamic = 'force-dynamic'

export default async function PortalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  if (user.email === 'zackariahlacey@gmail.com') {
    return <AdminDashboard />
  }

  // Fetch Profile for personalization
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Fetch Projects
  const { data: projects, error: projectError } = await supabase
    .from('projects')
    .select('*, project_updates(*)')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  if (projectError) {
    console.error('PORTAL_PROJECT_FETCH_ERROR:', projectError)
  }

  if (!projects || projects.length === 0) {
    return <BlueprintInitializing />
  }

  const activeProject = projects[0]
  const updates = activeProject.project_updates || []

  // Fetch leads associated with this project (if converted)
  const { data: clientLeads } = await supabase
    .from('leads')
    .select('*')
    .eq('email', user.email) 
    .order('created_at', { ascending: false })

  return (
    <ClientDashboard 
      activeProject={activeProject}
      profile={profile}
      clientLeads={clientLeads || []}
      updates={updates}
      user={user}
    />
  )
}
