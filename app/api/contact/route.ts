import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAIL = 'zackariahlacey@gmail.com';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      firstName,
      businessName,
      industry,
      websiteStatus,
      packageInterest,
      goal,
      phone,
      email,
      timeline,
    } = data;

    // Validate required fields
    if (!firstName || !businessName || (!email && !phone)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Store in Supabase
    try {
      const { error: supabaseError } = await supabase.from('leads').insert([{
        first_name: firstName,
        business_name: businessName,
        industry,
        package_interest: packageInterest,
        website_status: websiteStatus,
        email,
        phone,
        goal,
        timeline,
        created_at: new Date().toISOString(),
      }]);
      
      if (supabaseError) throw supabaseError;
    } catch (dbError) {
      console.error("Supabase storage error:", dbError);
    }

    // 2. Send Emails via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        // A. Email to Admin (Zack)
        await resend.emails.send({
          from: 'Vizulux Leads <onboarding@resend.dev>',
          to: [ADMIN_EMAIL],
          subject: `🚨 New Lead: ${firstName} — ${businessName}`,
          html: buildAdminEmailHtml(data),
        });

        // B. Confirmation Email to Client
        if (email) {
          await resend.emails.send({
            from: 'Zack from Vizulux <onboarding@resend.dev>',
            to: [email],
            subject: `We've received your project details! — Vizulux`,
            html: buildClientConfirmationHtml(data),
          });
        }
      } catch (emailError) {
        console.error("Resend email error:", emailError);
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Admin Notification Template
function buildAdminEmailHtml(data: any) {
  const isHighValue = data.packageInterest === 'pro' || data.packageInterest === 'core';
  
  return `
    <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D1A; color: #F0F0F8; padding: 40px; border-radius: 24px; border: 1px solid #2D2D44;">
      <!-- Header -->
      <div style="margin-bottom: 32px;">
        <div style="display: inline-block; background: ${isHighValue ? 'rgba(0, 200, 150, 0.1)' : 'rgba(108, 99, 255, 0.1)'}; border: 1px solid ${isHighValue ? '#00C896' : '#6C63FF'}; border-radius: 100px; padding: 4px 12px; margin-bottom: 16px;">
          <span style="color: ${isHighValue ? '#00C896' : '#6C63FF'}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
            ${isHighValue ? '🔥 High Value Lead' : '📩 New Project Inquiry'}
          </span>
        </div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #FFFFFF; letter-spacing: -0.5px;">
          ${data.firstName} from ${data.businessName}
        </h1>
      </div>

      <!-- Quick Stats Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: #1A1A2E; padding: 16px; border-radius: 16px; border: 1px solid #2D2D44;">
          <p style="margin: 0; color: #7B7B9D; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Package Interest</p>
          <p style="margin: 4px 0 0 0; color: #FFFFFF; font-size: 15px; font-weight: 700;">${data.packageInterest || 'Not Specified'}</p>
        </div>
        <div style="background: #1A1A2E; padding: 16px; border-radius: 16px; border: 1px solid #2D2D44;">
          <p style="margin: 0; color: #7B7B9D; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Timeline</p>
          <p style="margin: 4px 0 0 0; color: #FFFFFF; font-size: 15px; font-weight: 700;">${data.timeline || 'Not Specified'}</p>
        </div>
      </div>

      <!-- Full Details -->
      <div style="background: #1A1A2E; border-radius: 20px; padding: 24px; border: 1px solid #2D2D44; margin-bottom: 32px;">
        <h3 style="margin: 0 0 16px 0; font-size: 13px; color: #6C63FF; text-transform: uppercase; letter-spacing: 1px;">Project Details</h3>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2D2D44; color: #7B7B9D; font-size: 14px;">Industry</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #2D2D44; color: #FFFFFF; font-size: 14px; font-weight: 600; text-align: right;">${data.industry || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2D2D44; color: #7B7B9D; font-size: 14px;">Current Status</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #2D2D44; color: #FFFFFF; font-size: 14px; font-weight: 600; text-align: right;">${data.websiteStatus || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #2D2D44; color: #7B7B9D; font-size: 14px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #2D2D44; color: #FFFFFF; font-size: 14px; font-weight: 600; text-align: right;"><a href="mailto:${data.email}" style="color: #6C63FF; text-decoration: none;">${data.email || '—'}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #7B7B9D; font-size: 14px;">Phone</td>
            <td style="padding: 12px 0; color: #FFFFFF; font-size: 14px; font-weight: 600; text-align: right;"><a href="tel:${data.phone}" style="color: #6C63FF; text-decoration: none;">${data.phone || '—'}</a></td>
          </tr>
        </table>

        <!-- Goal Section -->
        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #2D2D44;">
          <p style="margin: 0; color: #7B7B9D; font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">The Goal</p>
          <p style="margin: 8px 0 0 0; color: #FFFFFF; font-size: 14px; line-height: 1.6; font-style: italic;">
            "${data.goal || 'No goal provided.'}"
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div style="text-align: center;">
        <a href="mailto:${data.email}" style="display: block; background: #6C63FF; color: white; padding: 18px; border-radius: 16px; text-decoration: none; font-weight: 800; font-size: 16px; margin-bottom: 12px; box-shadow: 0 4px 20px rgba(108, 99, 255, 0.3);">
          Reply via Email
        </a>
        ${data.phone ? `
          <a href="tel:${data.phone}" style="display: block; background: transparent; color: #FFFFFF; padding: 14px; border-radius: 16px; text-decoration: none; font-weight: 600; font-size: 14px; border: 1px solid #2D2D44;">
            Call or Text Client
          </a>
        ` : ''}
      </div>

      <p style="text-align: center; color: #4B4B6D; font-size: 11px; margin-top: 32px;">
        Lead received via Vizulux Engine • ${new Date().toLocaleString()}
      </p>
    </div>
  `;
}

// Client Confirmation Template (Matches Site Aesthetic)
function buildClientConfirmationHtml(data: any) {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0D0D1A; color: #F0F0F8; padding: 40px; border-radius: 16px; border: 1px solid #2D2D44;">
      <div style="text-align: center; margin-bottom: 32px;">
        <span style="font-size: 28px; font-weight: 900; color: #6C63FF; letter-spacing: -1px;">VIZULUX</span>
        <p style="color: #7B7B9D; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px;">Premium Web Design • Vermont</p>
      </div>
      
      <h1 style="color: #FFFFFF; margin-top: 0; font-size: 24px; font-weight: 800; text-align: center;">Nice. You're In, ${data.firstName}! 🎉</h1>
      <p style="color: #A0A0C0; font-size: 16px; line-height: 1.6; text-align: center;">
        Thanks for reaching out about <strong>${data.businessName}</strong>. Your project details just landed in my inbox.
      </p>

      <div style="background: #1A1A2E; border-radius: 16px; padding: 24px; margin: 32px 0; border: 1px solid #2D2D44;">
        <h3 style="color: #6C63FF; font-size: 14px; text-transform: uppercase; margin-top: 0; letter-spacing: 1px;">What Happens Next</h3>
        
        <div style="margin-top: 16px;">
          <p style="margin: 0; color: #FFFFFF; font-weight: bold; font-size: 15px;">1. Reviewing your project</p>
          <p style="margin: 4px 0 16px 0; color: #7B7B9D; font-size: 14px;">I'll personally review your industry and goals within the next 2 hours.</p>
          
          <p style="margin: 0; color: #FFFFFF; font-weight: bold; font-size: 15px;">2. Confirmation Call/Text</p>
          <p style="margin: 4px 0 16px 0; color: #7B7B9D; font-size: 14px;">I'll reach out to confirm your package and timeline so we can start building.</p>
          
          <p style="margin: 0; color: #FFFFFF; font-weight: bold; font-size: 15px;">3. Building your site</p>
          <p style="margin: 4px 0 0 0; color: #7B7B9D; font-size: 14px;">Your first draft will be ready in 1–7 days. You don't pay a dime until you approve it.</p>
        </div>
      </div>

      <p style="color: #7B7B9D; font-size: 13px; text-align: center; margin-top: 32px;">
        Questions? Feel free to reply directly to this email or text me at <strong>(802) 585-9179</strong>.
      </p>
      
      <hr style="border: 0; border-top: 1px solid #2D2D44; margin: 32px 0;" />
      
      <p style="color: #4B4B6D; font-size: 11px; text-align: center;">
        © ${new Date().getFullYear()} Vizulux LLC. All rights reserved.<br/>
        Vermont, USA • Built for Service Businesses
      </p>
    </div>
  `;
}
