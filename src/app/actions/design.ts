'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { logSystemEvent } from './logs'
import { vizuluxEmailWrapper, emailButton } from '@/lib/email-templates'

export async function submitDesignBrief(projectId: string, briefData: any) {
  try {
    const supabase = createAdminClient()
    
    // 1. Fetch Project and Profile
    const { data: project, error: pError } = await supabase
      .from('projects')
      .select('*, profiles(email, full_name)')
      .eq('id', projectId)
      .single()

    if (pError) throw pError
    const client = project.profiles as any

    // 2. Update Project with Brief
    const { error: updateError } = await supabase
      .from('projects')
      .update({
        design_brief: briefData,
        brief_submitted: true,
        status: 'design', // Advance status to design phase
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)

    if (updateError) throw updateError

    // 3. Send Design Schematic Email to Zack
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Vizulux Engine <no-reply@vizulux.com>',
          to: ['zackariahlacey@gmail.com'],
          subject: `[DESIGN SCHEMATIC] ${project.name}`,
          html: vizuluxEmailWrapper(`
            <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">Design Blueprint Captured</h2>
            <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px;">
              <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Visual Profile</p>
              <p style="margin: 0 0 20px 0; font-size: 18px; color: #ffffff; font-weight: bold;">${briefData.profile}</p>
              
              <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Color & Vibe</p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #ffffff;">${briefData.palette}</p>
              
              <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Goals</p>
              <p style="margin: 0; font-size: 14px; color: #ffffff;">${briefData.goals}</p>
            </div>
            ${emailButton('Access Project Workspace', 'https://vizulux.com/portal')}
          `, `New design schematic submitted by ${client.full_name}`),
        }),
      })
    } catch (err) {
      console.error('Design alert email failed:', err)
    }

    await logSystemEvent('info', 'DESIGN_BRIEF_SUBMITTED', { projectId, profile: briefData.profile })
    
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    console.error('Brief Submission Failure:', err)
    return { error: err.message }
  }
}
