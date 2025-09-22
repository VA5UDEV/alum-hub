"use client";

import { useEffect, useState } from "react";
import AlumniCard from "@/components/alumini-card";

export default function AlumniDirectory({ orgId }: { orgId: number }) {
  const [alumni, setAlumni] = useState<any[]>([]);
  const [filters, setFilters] = useState({ search: "", branch: "", year: "" });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.branch) params.set("branch", filters.branch);
    if (filters.year) params.set("year", filters.year);

    fetch(`/api/orgs/${orgId}/alumni?${params.toString()}`)
      .then((res) => res.json())
      .then(setAlumni);
  }, [orgId, filters]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          placeholder="Search alumni..."
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />

        <select
          className="border p-2 rounded"
          value={filters.branch}
          onChange={(e) =>
            setFilters((f) => ({ ...f, branch: e.target.value }))
          }
        >
          <option value="">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="ME">Mechanical</option>
          <option value="CE">Civil</option>
        </select>

        <select
          className="border p-2 rounded"
          value={filters.year}
          onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value }))}
        >
          <option value="">All Years</option>
          {[2024, 2023, 2022, 2021, 2020].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Directory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {alumni.map((a) => (
          <AlumniCard key={a.id} alumni={a} />
        ))}
      </div>
    </div>
  );
}
