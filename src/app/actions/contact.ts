'use server';

import { Resend } from 'resend';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  error?: string;
  messageId?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactResponse> {
  try {
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return {
        success: false,
        error: 'Please fill in all required fields',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return {
        success: false,
        error: 'Please enter a valid email address',
      };
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error(
        'RESEND_API_KEY is not configured. Add it to your .env.local file.'
      );
      return {
        success: false,
        error: 'Email service is not configured. Please try again later.',
      };
    }

    // Send email to admin
    const adminResponse = await resend.emails.send({
      from: 'noreply@communitycare.org',
      to: 'info@communitycare.org',
      subject: `New Contact Form: ${data.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr />
        <h3>Message:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (adminResponse.error) {
      console.error('Failed to send admin email:', adminResponse.error);
      return {
        success: false,
        error: 'Failed to send your message. Please try again later.',
      };
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: 'noreply@communitycare.org',
      to: data.email,
      subject: 'We received your message - Community Care',
      html: `
        <h2>Thank you, ${data.name}!</h2>
        <p>We received your message and will get back to you as soon as possible.</p>
        <hr />
        <h3>Your Message:</h3>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p>Best regards,<br>Community Care Team</p>
      `,
    });

    console.log('Contact form submitted successfully:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
    });

    return {
      success: true,
      messageId: adminResponse.data?.id,
    };
  } catch (err) {
    console.error('Contact form submission error:', err);
    return {
      success: false,
      error: 'An error occurred while sending your message. Please try again.',
    };
  }
}
