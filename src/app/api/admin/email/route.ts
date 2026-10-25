import { NextResponse } from "next/server";
import { readJsonFile } from "@/lib/store";
import { sendEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = String(body.type || "");

    if (type === "reply") {
      const email = String(body.email || "").trim();
      const subject = String(body.subject || "Re: Your inquiry").trim();
      const message = String(body.message || "").trim();

      if (!email || !email.includes("@") || !message) {
        return NextResponse.json({ error: "Valid recipient email and message are required." }, { status: 400 });
      }

      await sendEmail({
        to: email,
        subject,
        text: message,
        html: `<p>${message.replace(/\n/g, "<br />")}</p>`,
      });

      return NextResponse.json({ ok: true });
    }

    if (type === "newsletter") {
      const subject = String(body.subject || "Update from Cyber Savvy Pro").trim();
      const message = String(body.message || "").trim();
      if (!message) {
        return NextResponse.json({ error: "Newsletter message is required." }, { status: 400 });
      }

      const subscribers = await readJsonFile<{ email: string }[]>("newsletter.json", []);
      const emails = subscribers
        .map((item) => item.email)
        .filter((email) => !!email && email.includes("@"));

      if (emails.length === 0) {
        return NextResponse.json({ error: "No subscribers available to email." }, { status: 400 });
      }

      await Promise.all(
        emails.map((email) =>
          sendEmail({
            to: email,
            subject,
            text: message,
            html: `<p>${message.replace(/\n/g, "<br />")}</p>`,
          })
        )
      );

      return NextResponse.json({ ok: true, sent: emails.length });
    }

    return NextResponse.json({ error: "Unknown email action." }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to send this email." },
      { status: 500 }
    );
  }
}
