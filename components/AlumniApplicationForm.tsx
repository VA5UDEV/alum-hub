"use client";

import { useState } from "react";

export default function AlumniApplicationForm({ orgId }: { orgId: number }) {
  const [graduationYear, setGraduationYear] = useState("");
  const [branch, setBranch] = useState("");
  const [proofUrl, setProofUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-proof", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setProofUrl(data.url);

    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/alumni/apply", {
      method: "POST",
      body: JSON.stringify({
        orgId,
        graduationYear,
        branch,
        proofUrl,
      }),
    });

    const data = await res.json();
    console.log("Application submitted:", data);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <input
        className="border p-2 rounded w-full"
        placeholder="Graduation Year"
        value={graduationYear}
        onChange={(e) => setGraduationYear(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />

      <input type="file" onChange={handleFileChange} />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      {proofUrl && <p className="text-sm text-green-600">Proof uploaded ✅</p>}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply as Alumni
      </button>
    </form>
  );
}
