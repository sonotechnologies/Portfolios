"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/content/site-config";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Tell me your name.").max(120),
  business: z.string().trim().min(1, "What do you sell?").max(160),
  broken: z.string().trim().max(80).optional().default(""),
  budget: z.string().trim().min(1, "Pick a budget range."),
  timeline: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(1, "Say a little about what you need.").max(4000),
  // Honeypot — real visitors never fill this in; bots that autofill every
  // field do. Never surfaced as a "field" in the UI or in error state.
  // No .max(0) here on purpose — a non-empty value must reach the
  // post-parse honeypot check below and get a fake "success", not a real
  // validation error that would tip a bot off that it was caught.
  company: z.string().optional().default(""),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof contactSchema>, string[]>>;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

// Per-instance, in-memory — a "basic rate limit" per the brief, not a
// distributed one. Resets on cold start; good enough to stop a script
// hammering the form from one IP without adding infrastructure.
const submissionsByIp = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (submissionsByIp.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  submissionsByIp.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headerList.get("x-real-ip") ?? "unknown";
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    business: formData.get("business")?.toString() ?? "",
    broken: formData.get("broken")?.toString() ?? "",
    budget: formData.get("budget")?.toString() ?? "",
    timeline: formData.get("timeline")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Fix the highlighted fields and send it again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Honeypot tripped — report success so the bot doesn't learn anything,
  // but never send the email.
  if (parsed.data.company.length > 0) {
    return { status: "success" };
  }

  const ip = await getClientIp();
  if (isRateLimited(ip)) {
    return {
      status: "error",
      message: "That's a few in a row — give it a few minutes and try again, or use WhatsApp instead.",
    };
  }

  const { name, business, broken, budget, timeline, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("submitContactForm: RESEND_API_KEY is not set — email not sent.", {
      name,
      business,
    });
    return {
      status: "error",
      message:
        "The email service isn't configured yet on this deploy — message not sent. WhatsApp is the reliable path for now.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;

    const { error } = await resend.emails.send({
      // Swap to a verified-domain sender once siteConfig.domain is set —
      // Resend's shared onboarding domain works without DNS setup until then.
      from: `${siteConfig.brand} <onboarding@resend.dev>`,
      to: toEmail,
      subject: `New enquiry from ${name} — ${business}`,
      text: [
        `NAME: ${name}`,
        `BUSINESS: ${business}`,
        broken ? `WHAT'S BROKEN: ${broken}` : null,
        `BUDGET: ${budget}`,
        timeline ? `TIMELINE: ${timeline}` : null,
        "",
        "MESSAGE:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      console.error("submitContactForm: Resend error", error);
      return {
        status: "error",
        message: "That didn't send — try again, or message me directly on WhatsApp.",
      };
    }
  } catch (err) {
    console.error("submitContactForm: unexpected error", err);
    return {
      status: "error",
      message: "That didn't send — try again, or message me directly on WhatsApp.",
    };
  }

  return { status: "success" };
}
