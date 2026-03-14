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

export async function submitLead(data: { name: string, email: string, industry: string, message: string }) {
  const supabase = await createClient()

  const validatedData = LeadSchema.safeParse(data)

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
        from: 'Zack | Vizulux <no-reply@vizulux.com>',
        to: [email],
        subject: `Project Initialized: Your vision for ${industry}`,
        html: vizuluxEmailWrapper(`
          <h2 style="color: #ffffff; font-size: 32px; letter-spacing: -1.5px; margin-bottom: 20px; font-weight: 900; font-style: italic; text-transform: uppercase;">A New Project <span style="color: #8b5cf6;">Begins.</span></h2>
          <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 30px; line-height: 1.6;">
            Hello ${name.split(' ')[0]},<br><br>
            Thank you for reaching out. Your vision for a high-performance digital presence in the <strong>${industry}</strong> industry has been successfully received.<br><br>
            I personally review every project inquiry to ensure we can build something truly exceptional. You can expect a detailed response from me within the next 24 hours.
          </p>
          
          <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 40px; border-radius: 24px; text-align: center; margin: 40px 0;">
            <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; letter-spacing: 4px; color: #52525b; margin-bottom: 15px;">Direct Line & Text</p>
            <p style="font-size: 32px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: -1px;">802-585-9179</p>
            <p style="font-size: 12px; color: #71717a; margin-top: 15px;">Feel free to reach out directly if you have any immediate questions.</p>
          </div>

          <p style="color: #52525b; font-size: 13px; font-style: italic; margin-top: 40px;">
            "We don't just build websites. We architect growth engines."
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #1a1a1a;">
            <p style="margin: 0; color: #ffffff; font-weight: bold; font-size: 14px;">Zack Lacey</p>
            <p style="margin: 5px 0 0 0; color: #71717a; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Founder & Lead Architect, Vizulux</p>
          </div>
        `, `Your project blueprint for ${industry} has been initialized.`),
      }),
    })
    
  } catch (err) {
    console.error('Email pipeline failed:', err)
  }

  revalidatePath('/admin')
  return { success: true }
}
