'use server'

import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { logSystemEvent } from './logs'
import { vizuluxEmailWrapper, emailButton } from '@/lib/email-templates'

export async function updateLeadStatus(leadId: string, status: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('leads').update({ status }).eq('id', leadId)
    if (error) throw error
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('warning', 'LEAD_STATUS_UPDATE_FAILED', { leadId, status, error: err.message })
    return { error: err.message }
  }
}

export async function convertLeadToProject(leadId: string, leadData: { name: string, email: string, industry: string }) {
  try {
    const supabase = createAdminClient()
    const { data: project, error: pError } = await supabase.from('projects').insert({
      name: `${leadData.industry} Build: ${leadData.name}`,
      status: 'strategy',
    }).select().single()
    if (pError) throw pError

    const { error: lError } = await supabase.from('leads').update({ status: 'converted' }).eq('id', leadId)
    if (lError) throw lError

    revalidatePath('/admin')
    return { success: true, projectId: project.id }
  } catch (err: any) {
    await logSystemEvent('critical', 'LEAD_CONVERSION_FAILED', { leadId, error: err.message })
    return { error: err.message }
  }
}

export async function toggleUserApproval(userId: string, email: string, currentStatus: boolean) {
  try {
    const supabase = createAdminClient()
    const newStatus = !currentStatus
    
    const { error: profileError } = await supabase.from('profiles').upsert({ 
      id: userId, 
      email: email, 
      is_approved: newStatus,
      updated_at: new Date().toISOString()
    })
    if (profileError) throw profileError

    if (newStatus) {
      const { data: existingProjects } = await supabase.from('projects').select('id').eq('client_id', userId)
      if (!existingProjects || existingProjects.length === 0) {
        await supabase.from('projects').insert({ client_id: userId, name: "Initial Build Node", status: 'strategy' })
      }

      // 3. Send Congratulations Email
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'Vizulux <no-reply@vizulux.com>',
            to: [email],
            subject: 'Congratulations: Your Digital HQ is Live',
            html: vizuluxEmailWrapper(`
              <h2 style="color: #8b5cf6; font-size: 32px; letter-spacing: -1px; margin-bottom: 20px;">CONGRATULATIONS.</h2>
              <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 30px;">
                Zack Lacey has reviewed your vision and authorized your Digital HQ node. You now have full access to our project synchronization systems.
              </p>
              <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px; text-align: center;">
                <p style="text-transform: uppercase; font-size: 9px; font-weight: bold; letter-spacing: 3px; color: #555555; margin-bottom: 10px;">AUTHORIZED_ACCESS_GRANTED</p>
                <p style="color: #ffffff; font-size: 14px; margin-bottom: 20px;">Your initial build sequence has been initialized in the Strategy phase.</p>
                ${emailButton('Enter the Mainframe', 'https://vizulux.com/portal')}
              </div>
            `, 'Your access to the Vizulux Digital HQ has been authorized.'),
          }),
        })
      } catch (err) {
        console.error('Approval email failed:', err)
      }
    }

    revalidatePath('/admin', 'layout')
    revalidatePath('/portal', 'layout')
    await logSystemEvent('info', 'USER_AUTH_TOGGLED', { email, newStatus })
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('critical', 'USER_AUTH_FAILED', { email, error: err.message })
    return { error: err.message }
  }
}

export async function linkProjectToClient(projectId: string, clientId: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('projects').update({ client_id: clientId }).eq('id', projectId)
    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('warning', 'PROJECT_LINK_FAILED', { projectId, clientId, error: err.message })
    return { error: err.message }
  }
}

export async function initializeProject(clientId: string, projectName: string) {
  try {
    const supabase = createAdminClient()
    
    // 1. Check for existing nodes
    const { data: existingProjects } = await supabase
      .from('projects')
      .select('id')
      .eq('client_id', clientId)

    if (existingProjects && existingProjects.length > 0) {
      return { error: 'NODE_LIMIT_REACHED: This user already has an active build sequence.' }
    }

    // 2. Initialize new node
    const { data, error } = await supabase
      .from('projects')
      .insert({ client_id: clientId, name: projectName, status: 'strategy' })
      .select()
      .single()
    
    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true, projectId: data.id }
  } catch (err: any) {
    await logSystemEvent('critical', 'PROJECT_INIT_FAILED', { clientId, projectName, error: err.message })
    return { error: err.message }
  }
}

export async function addTask(projectId: string, title: string) {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('tasks')
      .insert({ project_id: projectId, title })
      .select()
      .single()

    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true, task: data }
  } catch (err: any) {
    await logSystemEvent('warning', 'TASK_CREATION_FAILED', { projectId, title, error: err.message })
    return { error: err.message }
  }
}

export async function toggleTaskCompletion(taskId: string, currentStatus: boolean) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('tasks')
      .update({ is_completed: !currentStatus })
      .eq('id', taskId)

    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('warning', 'TASK_TOGGLE_FAILED', { taskId, error: err.message })
    return { error: err.message }
  }
}

export async function updateProjectStatus(projectId: string, status: string) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('projects').update({ status, updated_at: new Date().toISOString() }).eq('id', projectId)
    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('warning', 'PROJECT_STATUS_UPDATE_FAILED', { projectId, status, error: err.message })
    return { error: err.message }
  }
}

export async function updateProjectTechnicalSpecs(projectId: string, specs: {
  github_repo?: string,
  stripe_customer_id?: string,
  tech_stack?: string[],
  admin_notes?: string,
  preview_url?: string,
  invoice_link?: string
}) {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('projects').update({ ...specs, updated_at: new Date().toISOString() }).eq('id', projectId)
    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('warning', 'PROJECT_SPECS_UPDATE_FAILED', { projectId, error: err.message })
    return { error: err.message }
  }
}

export async function deleteProject(projectId: string) {
  try {
    const supabase = createAdminClient()
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) throw error
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('critical', 'PROJECT_DELETION_FAILED', { projectId, error: err.message })
    return { error: err.message }
  }
}

export async function addProjectUpdate(projectId: string, clientEmail: string, title: string, content: string, type: 'update' | 'milestone' | 'alert') {
  try {
    const supabase = createAdminClient()
    const { error } = await supabase.from('project_updates').insert({ project_id: projectId, title, content, type })
    if (error) throw error

    // Notify Client
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Vizulux <no-reply@vizulux.com>',
          to: [clientEmail],
          subject: `Build Synchronization: ${title}`,
          html: vizuluxEmailWrapper(`
            <div style="margin-bottom: 30px;">
              <span style="background: #111; border: 1px solid #222; padding: 5px 12px; border-radius: 20px; color: #8b5cf6; font-size: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                ${type === 'milestone' ? 'MILESTONE_REACHED' : 'SYSTEM_UPDATE'}
              </span>
            </div>
            <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 15px; letter-spacing: -0.5px;">${title}</h2>
            <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px; color: #a1a1aa; font-size: 14px; line-height: 1.7;">
              ${content}
            </div>
            ${emailButton('Open Technical Stream', 'https://vizulux.com/portal')}
          `, `New build synchronization for your Vizulux project: ${title}`),
        }),
      })
    } catch (err) {
      console.error('Update email failed:', err)
    }

    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    await logSystemEvent('warning', 'PROJECT_UPDATE_FAILED', { projectId, title, error: err.message })
    return { error: err.message }
  }
}
