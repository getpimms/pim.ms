import { CreateEmailOptions, Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Send email using Resend (Recommended for production)
export const sendEmailViaResend = async ({
  email,
  subject,
  from,
  bcc,
  replyTo,
  text,
  react,
  scheduledAt,
  marketing,
}: Omit<CreateEmailOptions, "to" | "from"> & {
  email: string;
  from?: string;
  replyTo?: string;
  marketing?: boolean;
}) => {
  if (!resend) {
    console.info(
      "RESEND_API_KEY is not set in the .env. Skipping sending email.",
    );
    return;
  }

  return await resend.emails.send({
    to: email,
    from:
      from ||
      (marketing
        ? "Alexandre from PIMMS <alexandre@pimms.io>"
        : "PIMMS <system@pimms.io>"),
    bcc: bcc,
    replyTo,
    subject,
    text,
    react,
    scheduledAt,
    ...(marketing && {
      headers: {
        "List-Unsubscribe": "https://app.pimms.io/account/settings",
      },
    }),
  });
};
