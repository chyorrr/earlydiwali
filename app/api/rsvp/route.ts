import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function buildEmailHTML(name: string, passCode?: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Your Diwali VIP Invite 🎆</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
</head>
<body style="margin:0;padding:0;background:#0d0305;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0305;min-height:100vh;">
<tr><td align="center" style="padding:40px 16px;">

  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,0.8);">

    <!-- Top gold line -->
    <tr><td style="height:4px;background:linear-gradient(90deg,transparent,#F5A623,#FFD93D,#F5A623,transparent);"></td></tr>

    <!-- Header: Red hero -->
    <tr><td style="background:#800F1B;padding:48px 40px 36px;text-align:center;position:relative;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#FFD93D;opacity:0.9;">YOU HAVE BEEN SUMMONED TO</p>
      <h1 style="margin:0;font-family:Arial Black,Arial,sans-serif;font-size:46px;color:#fff;line-height:1;letter-spacing:1px;text-transform:uppercase;">EARLY DIWALI AT AARYA'S</h1>
      <p style="margin:4px 0 0;font-family:'Playfair Display',Georgia,serif;font-style:italic;font-size:30px;color:#FFD93D;font-weight:700;">2 0 2 6</p>
      <p style="margin:12px 0 0;font-size:12px;letter-spacing:0.2em;color:#FFE082;">HOSTED BY AARYA &amp; FAMILY</p>
    </td></tr>

    <!-- Invite card body (cream) -->
    <tr><td style="background:#FAF6EE;padding:36px 40px;">

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <div style="background:#E91E8C;color:#fff;font-family:Arial Black,Arial,sans-serif;font-size:10px;letter-spacing:0.25em;padding:5px 12px;text-transform:uppercase;border-radius:4px;display:inline-block;">GHAR PE DIWALI HAI.</div>
          </td>
          <td align="right" style="font-size:13px;font-family:monospace;font-weight:bold;color:#800F1B;">
            PASS: ${passCode || 'DWL-VIP'}
          </td>
        </tr>
      </table>

      <br/>

      <p style="margin:0;font-family:Arial Black,Arial,sans-serif;font-size:36px;line-height:1.1;color:#800F1B;text-transform:uppercase;">PLOT TWIST:</p>
      <p style="margin:0;font-family:Arial Black,Arial,sans-serif;font-size:36px;line-height:1.1;color:#1a0a0a;text-transform:uppercase;">${name.split(' ')[0].toUpperCase()},</p>
      <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:36px;line-height:1.1;color:#0A5C36;font-style:italic;font-weight:700;">you're invited</p>
      <p style="margin:0 0 20px;font-family:Arial Black,Arial,sans-serif;font-size:36px;line-height:1.1;color:#800F1B;text-transform:uppercase;">HAI!</p>

      <p style="margin:0 0 24px;font-size:15px;color:#444;line-height:1.6;">
        Unlimited mithai, skyshots, music, and main character moments.<br/>
        <em style="font-family:'Playfair Display',Georgia,serif;color:#111;">This is your official invitation. No excuses accepted.</em>
      </p>

      <!-- Event details -->
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#110406;border-radius:12px;color:#fff;padding:20px;margin-bottom:20px;">
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:11px;letter-spacing:0.2em;color:#FFD93D;text-transform:uppercase;width:80px;">DATE</td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:14px;color:#fff;font-weight:600;">Saturday, 31st October 2026</td>
        </tr>
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:11px;letter-spacing:0.2em;color:#FFD93D;text-transform:uppercase;">TIME</td>
          <td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.1);font-size:14px;color:#fff;font-weight:600;">5:30 PM Onwards</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:11px;letter-spacing:0.2em;color:#FFD93D;text-transform:uppercase;">VENUE</td>
          <td style="padding:8px 0;font-size:14px;color:#fff;font-weight:600;">402, Sumit Pramukh Enclave, Bachhani Nagar, Malad East</td>
        </tr>
      </table>

      <p style="margin:0;font-size:12px;color:#777;text-align:center;">
        Questions? Contact Aarya &amp; Family via WhatsApp. See you there!
      </p>
    </td></tr>

    <!-- Bottom gold line -->
    <tr><td style="height:4px;background:linear-gradient(90deg,transparent,#F5A623,#FFD93D,#F5A623,transparent);"></td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, guestCount, mithai, passCode } = await req.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    console.log(`[RSVP RECEIVED] ${name} | Phone: ${phone || 'N/A'} | Guests: ${guestCount || '1'} | Mithai: ${mithai || 'Kaju Katli'} | Pass: ${passCode || 'DWL'}`);

    // If email provided and Gmail configured, send confirmation email
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (email && gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: gmailUser, pass: gmailPass },
        });

        await transporter.sendMail({
          from: `"Aarya & Family ✦" <${gmailUser}>`,
          to: email,
          subject: `✨ ${name.split(' ')[0]}, your Diwali VIP Pass is Confirmed!`,
          html: buildEmailHTML(name, passCode),
        });
      } catch (mailErr) {
        console.warn('[Mail Send Warning - Skipped]', mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'RSVP registered successfully',
      passCode,
    });
  } catch (err) {
    console.error('[RSVP error]', err);
    return NextResponse.json({ error: 'Failed to process RSVP' }, { status: 500 });
  }
}
