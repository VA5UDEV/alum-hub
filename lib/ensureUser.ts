// lib/ensureUser.ts
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function ensureUser() {
  const { userId } = await auth();
      if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  // Fetch from Clerk
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;

  // Check if user exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, userId))
    .limit(1);

  const existing = existingUser[0] || null;

  if (!existing && email) {
    await db.insert(users).values({
      clerkId: userId,
      email,
      role: "student", // default
    });
  }

  return existing;
}
