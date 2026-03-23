// ─── Email HTML Templates ────────────────────────────────────────────────────
// Edit these templates to change the look/feel of all YOUNGBLOOD emails.

export function welcomeEmail(name) {
  return `
    <div style="background:#111;color:#f5f5f0;font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:0 auto">
      <h1 style="color:#C62828;font-size:36px;margin:0 0 8px">YOUNGBLOOD</h1>
      <p style="color:#999;font-size:14px;letter-spacing:2px;margin:0 0 30px">THE ANTIDOTE TO MODERN LONELINESS</p>
      <p style="font-size:18px;line-height:1.6;color:#f5f5f0">Hey ${name},</p>
      <p style="font-size:18px;line-height:1.6;color:#f5f5f0">You're officially part of the rebellion. No turning back now.</p>
      <p style="font-size:16px;line-height:1.6;color:#ccc">We'll hit you up when the next event drops. Until then — stay restless.</p>
      <div style="border-top:2px solid #C62828;margin:30px 0;padding-top:20px">
        <p style="color:#666;font-size:12px">YOUNGBLOOD — the antidote to modern loneliness</p>
      </div>
    </div>
  `;
}

export function adminNotificationEmail(name, email, age) {
  return `
    <div style="background:#111;color:#f5f5f0;font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:0 auto">
      <h2 style="color:#C62828;margin:0 0 20px">New Member Signup</h2>
      <p style="font-size:16px;color:#f5f5f0"><strong>Name:</strong> ${name}</p>
      <p style="font-size:16px;color:#f5f5f0"><strong>Email:</strong> ${email}</p>
      <p style="font-size:16px;color:#f5f5f0"><strong>Age:</strong> ${age}</p>
    </div>
  `;
}

export function blastEmail(content) {
  return `
    <div style="background:#111;color:#f5f5f0;font-family:Arial,sans-serif;padding:40px;max-width:600px;margin:0 auto">
      <h1 style="color:#C62828;font-size:36px;margin:0 0 8px">YOUNGBLOOD</h1>
      <p style="color:#999;font-size:14px;letter-spacing:2px;margin:0 0 30px">THE ANTIDOTE TO MODERN LONELINESS</p>
      <div style="font-size:16px;line-height:1.8;color:#f5f5f0">${content}</div>
      <div style="border-top:2px solid #C62828;margin:30px 0;padding-top:20px">
        <p style="color:#666;font-size:12px">YOUNGBLOOD — the antidote to modern loneliness</p>
      </div>
    </div>
  `;
}
