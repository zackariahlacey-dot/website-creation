'use server'

import Stripe from 'stripe'
import { createAdminClient } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { logSystemEvent } from './logs'
import { vizuluxEmailWrapper, emailButton } from '@/lib/email-templates'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function togglePaymentStatus(projectId: string, type: 'build' | 'retainer', currentStatus: boolean) {
  try {
    const supabase = createAdminClient()
    const updateField = type === 'build' ? 'build_paid' : 'retainer_active'
    
    const { error } = await supabase
      .from('projects')
      .update({ [updateField]: !currentStatus })
      .eq('id', projectId)

    if (error) throw error
    
    await logSystemEvent('info', 'PAYMENT_STATUS_TOGGLED', { projectId, type, status: !currentStatus })
    
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true }
  } catch (err: any) {
    console.error('Payment Toggle Failure:', err)
    return { error: err.message }
  }
}

export async function provisionStripeLink(projectId: string, projectName: string, amount: number, isSubscription: boolean) {
  try {
    const supabase = createAdminClient()
    
    // 1. Create Price in Stripe
    const price = await stripe.prices.create({
      unit_amount: amount * 100,
      currency: 'usd',
      recurring: isSubscription ? { interval: 'month' } : undefined,
      product_data: {
        name: isSubscription ? `Vizulux Retainer: ${projectName}` : `Vizulux Build: ${projectName}`,
      },
    })

    // 2. Create Payment Link
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      after_completion: { type: 'redirect', redirect: { url: 'https://vizulux.com/portal/induction' } },
    })

    // 3. Sync to Supabase only (No email yet)
    const updateField = isSubscription ? 'retainer_link' : 'invoice_link'
    const amountField = isSubscription ? 'retainer_amount' : 'build_amount'
    
    const { error } = await supabase
      .from('projects')
      .update({
        [updateField]: paymentLink.url,
        [amountField]: amount,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)

    if (error) throw error

    await logSystemEvent('info', 'STRIPE_LINK_PROVISIONED', { projectId, type: isSubscription ? 'retainer' : 'build', amount })
    
    revalidatePath('/admin')
    revalidatePath('/portal')
    return { success: true, url: paymentLink.url }
  } catch (err: any) {
    console.error('Provisioning Failure:', err)
    return { error: err.message }
  }
}

export async function broadcastFinancialSync(projectId: string) {
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

    if (!project.invoice_link && !project.retainer_link) {
      throw new Error('NO_ACTIVE_LINKS: Please provision at least one node before dispatching.')
    }

    // 2. Send Master Sync Email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Vizulux Finance <no-reply@vizulux.com>',
        to: [client.email],
        cc: ['zackariahlacey@gmail.com'],
        subject: `Financial Synchronization: ${project.name}`,
        html: vizuluxEmailWrapper(`
          <h2 style="color: #ffffff; font-size: 32px; letter-spacing: -1px; margin-bottom: 20px;">MASTER SYNC AUTHORIZED.</h2>
          <p style="color: #a1a1aa; font-size: 16px; margin-bottom: 30px;">
            Hello ${client.full_name.split(' ')[0]},<br><br>
            The financial nodes for <strong>${project.name}</strong> have been calibrated. Please synchronize the following allocations to activate the next build phase.
          </p>

          ${project.invoice_link ? `
            <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px; margin-bottom: 20px;">
              <p style="text-transform: uppercase; font-size: 8px; font-weight: bold; color: #fbbf24; margin-bottom: 10px;">Node: BUILD_FEE</p>
              <p style="color: #ffffff; font-size: 14px; margin-bottom: 20px;">Required for Engine Ignition and initial architecture deployment.</p>
              <a href="${project.invoice_link}" style="background: #ffffff; color: #000000; padding: 12px 25px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 10px; text-transform: uppercase;">Sync Build Node</a>
            </div>
          ` : ''}

          ${project.retainer_link ? `
            <div style="background: #09090b; border: 1px solid #1a1a1a; padding: 30px; border-radius: 20px; margin-bottom: 20px;">
              <p style="text-transform: uppercase; font-size: 8px; font-weight: bold; color: #8b5cf6; margin-bottom: 10px;">Node: MONTHLY_RETAINER</p>
              <p style="color: #ffffff; font-size: 14px; margin-bottom: 20px;">Includes managed hosting, 24/7 security, and unlimited minor tweaks.</p>
              <a href="${project.retainer_link}" style="background: #8b5cf6; color: #ffffff; padding: 12px 25px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block; font-size: 10px; text-transform: uppercase;">Activate Protection Node</a>
            </div>
          ` : ''}

          <p style="margin-top: 40px; font-size: 12px; color: #555555; text-align: center;">
            Once synchronized, your Digital HQ will automatically reflect the updated system status.
          </p>
        `, `Master financial synchronization required for ${project.name}`),
      }),
    })

    await logSystemEvent('info', 'FINANCIAL_SYNC_DISPATCHED', { projectId, email: client.email })
    
    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    console.error('Dispatch Failure:', err)
    return { error: err.message }
  }
}
