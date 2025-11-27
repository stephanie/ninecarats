import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Send email using Resend (or you can use any email service)
    // For now, we'll use a simple approach - you can replace this with Resend
    const recipientEmail = process.env.NEWSLETTER_RECIPIENT_EMAIL || 'info@ninecarats.com';
    
    // Option 1: Use Resend (recommended - install: pnpm add resend)
    // Uncomment this after installing Resend:
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'newsletter@ninecarats.com', // or your verified domain
      to: recipientEmail,
      subject: 'New Newsletter Subscription',
      html: `<p>New newsletter subscription:</p><p><strong>Email:</strong> ${email}</p>`,
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}