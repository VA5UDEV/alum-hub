import { NextResponse } from "next/server";
import { getAlumniDirectory } from "@/lib/queries/alumni";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);

  const filters = {
    orgId: Number(params.id),
    branch: searchParams.get("branch") || undefined,
    year: searchParams.get("year")
      ? Number(searchParams.get("year"))
      : undefined,
    search: searchParams.get("search") || undefined,
  };

  const alumni = await getAlumniDirectory(filters);
  return NextResponse.json(alumni);
}
