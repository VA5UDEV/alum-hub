import { db } from "@/db";
import { alumniApplications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const appId = Number(params.id);

  await db
    .update(alumniApplications)
    .set({ status: "rejected" })
    .where(eq(alumniApplications.id, appId));

  return NextResponse.json({ success: true });
}
