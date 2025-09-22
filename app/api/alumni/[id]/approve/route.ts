import { db } from "@/db";
import { alumniApplications, userOrgs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const appId = Number(params.id);

  const [application] = await db
    .update(alumniApplications)
    .set({ status: "approved" })
    .where(eq(alumniApplications.id, appId))
    .returning();

  if (!application)
    return new Response("Application not found", { status: 404 });

  await db.insert(userOrgs).values({
    userId: application.userId,
    orgId: application.orgId,
    role: "alumni",
  });

  return NextResponse.json({ success: true });
}
