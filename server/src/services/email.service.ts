import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAlertEmail(input: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: "ClearFlow Alerts <alerts@yourdomain.com>",
    to: input.to,
    subject: input.subject,
    html: input.html,
  });
}