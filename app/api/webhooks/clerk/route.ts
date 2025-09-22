import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  // Verify signature
  const payload = await req.text();
  const headerPayload = Object.fromEntries((await headers()).entries());
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;
  try {
    evt = wh.verify(payload, headerPayload) as WebhookEvent;
  } catch (err) {
    console.error("❌ Webhook verification failed:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  // Handle events
  if (evt.type === "user.created") {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[0]?.email_address;

    if (email) {
      await db
        .insert(users)
        .values({
          clerkId: id,
          email,
        })
        .onConflictDoNothing({ target: users.clerkId });
    }
  }

  if (evt.type === "user.deleted") {
    const clerkId = evt.data.id as string;

    await db.delete(users).where(eq(users.clerkId, clerkId));
  }

  return NextResponse.json({ success: true });
}
