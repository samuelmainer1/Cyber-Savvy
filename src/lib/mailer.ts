import nodemailer from "nodemailer";

export function hasEmailConfig() {
  const required = [process.env.SMTP_HOST, process.env.SMTP_USER, process.env.SMTP_PASS, process.env.SMTP_FROM];
  return required.every(Boolean);
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
}) {
  if (!hasEmailConfig()) {
    throw new Error(
      "SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM to your environment variables."
    );
  }

  const port = Number(process.env.SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true" || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    replyTo: replyTo || process.env.SMTP_FROM,
    subject,
    text,
    html: html || text,
  });
}
