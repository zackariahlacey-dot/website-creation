'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { vizuluxEmailWrapper, emailButton } from '@/lib/email-templates'

const LeadSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid work email"),
  industry: z.enum(['Healthcare', 'Construction', 'Real Estate', 'Other']),
  message: z.string().min(10, "Please provide more details about your vision"),
})

export async function submitLead(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    industry: formData.get('industry') as string,
    message: formData.get('message') as string,
  }

  const validatedData = LeadSchema.safeParse(rawData)

  if (!validatedData.success) {
    return { error: validatedData.error.issues[0].message }
  }

  const { name, email, industry, message } = validatedData.data

  const { error } = await supabase.from('leads').insert({
    name,
    email,
    industry,
    message,
  })

  if (error) {
    return { error: error.message }
  }

  // Resend Notification Logic
  try {
    // 1. Notify Zack (Internal Alert)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Vizulux <no-reply@vizulux.com>',
        to: ['zackariahlacey@gmail.com'],
        subject: `[SIGNAL INTERCEPT] ${name} - ${industry}`,
        html: vizuluxEmailWrapper(`
          <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 20px;">New Signal Captured</h2>
          <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px;">
            <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Identity</p>
            <p style="margin: 0 0 20px 0; font-size: 18px; color: #ffffff; font-weight: bold;">${name}</p>
            
            <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Industry</p>
            <p style="margin: 0 0 20px 0; font-size: 18px; color: #ffffff; font-weight: bold;">${industry}</p>
            
            <p style="margin: 0 0 10px 0; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Vision_Data</p>
            <p style="margin: 0; font-size: 14px; color: #71717a; font-style: italic; line-height: 1.6;">"${message}"</p>
          </div>
          ${emailButton('Access Admin Mainframe', 'https://vizulux.com/portal')}
        `, `New signal intercept from ${name} in ${industry}`),
      }),
    })

    // 2. Notify Client (Premium Welcome)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Zack Lacey | Vizulux <no-reply@vizulux.com>',
        to: [email],
        subject: `Blueprint Initialized: Your vision for ${industry}`,
        html: vizuluxEmailWrapper(`
          <h2 style="color: #8b5cf6; font-size: 32px; letter-spacing: -1px; margin-bottom: 20px;">BLUEPRINT INITIALIZED.</h2>
          <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 30px;">
            Hello ${name.split(' ')[0]},<br><br>
            Your vision for a high-end digital engine has been successfully captured. I work directly with a limited number of clients to ensure architectural excellence.<br><br>
            <strong>Feel free to call or text me directly at any time before I reach out via email.</strong>
          </p>
          <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px; text-align: center;">
            <p style="text-transform: uppercase; font-size: 9px; font-weight: bold; letter-spacing: 3px; color: #555555; margin-bottom: 10px;">Direct Architect Line</p>
            <p style="font-size: 28px; font-weight: bold; color: #ffffff; margin: 0;">802-585-9179</p>
          </div>
          <p style="margin-top: 30px; font-size: 12px; color: #555555;">
            I am currently reviewing your vision. You will receive a strategic synchronization response within 24 hours.
          </p>
        `, 'Your Vizulux project blueprint has been initialized.'),
      }),
    })
    
  } catch (err) {
    console.error('Email pipeline failed:', err)
  }

  revalidatePath('/admin')
  return { success: true }
}
