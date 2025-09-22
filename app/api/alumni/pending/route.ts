import { db } from "@/db";
import { alumniApplications, users, orgs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const applications = await db
    .select({
      id: alumniApplications.id,
      userId: alumniApplications.userId,
      email: users.email,
      orgName: orgs.name,
      graduationYear: alumniApplications.graduationYear,
      branch: alumniApplications.branch,
      proofUrl: alumniApplications.proofUrl,
      status: alumniApplications.status,
      createdAt: alumniApplications.createdAt,
    })
    .from(alumniApplications)
    .leftJoin(users, eq(alumniApplications.userId, users.id))
    .leftJoin(orgs, eq(alumniApplications.orgId, orgs.id))
    .where(eq(alumniApplications.status, "pending"));

  return NextResponse.json(applications);
}
