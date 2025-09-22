import { db } from "@/db";
import { alumniApplications, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const authResult = await auth();
  const { userId: clerkUserId } = authResult;
  if (!clerkUserId) return new Response("Unauthorized", { status: 401 });

  // Find the user in the database based on Clerk ID
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkUserId))
    .limit(1);

  if (!user) {
    return new Response("User not found in database", { status: 404 });
  }

  const body = await req.json();
  const { orgId, graduationYear, branch } = body;

  const [application] = await db
    .insert(alumniApplications)
    .values({
      userId: user.id,
      orgId,
      graduationYear,
      branch,
    })
    .returning();

  return NextResponse.json(application);
}
