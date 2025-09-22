import { db } from "@/db";
import { users, alumniProfiles, userOrgs } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";

interface Filters {
  orgId: number;
  branch?: string;
  year?: number;
  search?: string;
}

export async function getAlumniDirectory(filters: Filters) {
  const conditions = [eq(userOrgs.role, "alumni")];
  if (filters.branch) {
    conditions.push(eq(alumniProfiles.branch, filters.branch));
  }
  if (filters.year) {
    conditions.push(eq(alumniProfiles.graduationYear, filters.year));
  }
  if (filters.search) {
    conditions.push(sql`${users.email} ILIKE ${"%" + filters.search + "%"}`);
  }

  const query = db
    .select({
      id: users.id,
      email: users.email,
      graduationYear: alumniProfiles.graduationYear,
      branch: alumniProfiles.branch,
      bio: alumniProfiles.bio,
      avatarUrl: alumniProfiles.avatarUrl,
      location: alumniProfiles.location,
      skills: alumniProfiles.skills,
      socialLinks: alumniProfiles.socialLinks,
      role: userOrgs.role,
    })
    .from(users)
    .leftJoin(alumniProfiles, eq(users.id, alumniProfiles.userId))
    .leftJoin(
      userOrgs,
      and(eq(users.id, userOrgs.userId), eq(userOrgs.orgId, filters.orgId))
    )
    .where(and(...conditions));

  return await query;
}
