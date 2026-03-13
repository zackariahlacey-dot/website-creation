'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { vizuluxEmailWrapper, emailButton } from '@/lib/email-templates'

export async function requestMeeting(projectId: string, clientEmail: string, projectName: string) {
  const supabase = await createClient()
  
  // 1. Log the request as a project update/alert for internal tracking
  const { error } = await supabase
    .from('project_updates')
    .insert({ 
      project_id: projectId, 
      title: 'Meeting Requested', 
      content: `Client has requested a Blueprint Review session for project: ${projectName}`, 
      type: 'alert' 
    })

  if (error) return { error: error.message }

  // 2. Notify Zack (Internal Alert)
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
        subject: `[SYNC REQUEST] ${projectName}`,
        html: vizuluxEmailWrapper(`
          <h2 style="color: #fbbf24; font-size: 24px; margin-bottom: 20px;">Blueprint Sync Requested</h2>
          <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px;">
            <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Project</p>
            <p style="margin: 0 0 20px 0; font-size: 18px; color: #ffffff; font-weight: bold;">${projectName}</p>
            
            <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Client</p>
            <p style="margin: 0; font-size: 18px; color: #ffffff; font-weight: bold;">${clientEmail}</p>
          </div>
          <p style="margin-top: 30px; color: #71717a; font-size: 14px;">The client is ready for a strategic synchronization session. Reach out via secure line.</p>
          ${emailButton('Access Project Workspace', 'https://vizulux.com/portal')}
        `, `Meeting request for project: ${projectName}`),
      }),
    })
  } catch (err) {
    console.error('Meeting alert failed:', err)
  }

  // 3. Notify Client (Confirmation)
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Zack Lacey | Vizulux <no-reply@vizulux.com>',
        to: [clientEmail],
        subject: 'Synchronization Initialized: Blueprint Review',
        html: vizuluxEmailWrapper(`
          <h2 style="color: #8b5cf6; font-size: 32px; letter-spacing: -1px; margin-bottom: 20px;">SYNC INITIALIZED.</h2>
          <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 30px;">
            Your request for a Blueprint Review has been received. I am currently reviewing your latest build integrity and market data points.<br><br>
            I will reach out shortly to coordinate our strategic synchronization.
          </p>
          <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px; text-align: center;">
            <p style="text-transform: uppercase; font-size: 9px; font-weight: bold; letter-spacing: 3px; color: #555555; margin-bottom: 10px;">Sync_Node_Status</p>
            <p style="font-size: 18px; font-weight: bold; color: #ffffff; margin: 0;">WAITING_FOR_ARCHITECT</p>
          </div>
        `, 'Your meeting request has been logged in the Vizulux system.'),
      }),
    })
  } catch (err) {
    console.error('Meeting confirmation failed:', err)
  }

  revalidatePath('/admin')
  revalidatePath('/portal')
  return { success: true }
}
