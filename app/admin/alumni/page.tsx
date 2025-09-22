"use client";

import { useEffect, useState } from "react";

export default function AlumniAdminPage() {
  const [apps, setApps] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/alumni/pending")
      .then((res) => res.json())
      .then(setApps);
  }, []);

  async function handleAction(id: number, action: "approve" | "reject") {
    await fetch(`/api/alumni/${id}/${action}`, { method: "POST" });
    setApps((prev) => prev.filter((a) => a.id !== id)); // remove from list
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Pending Alumni Applications</h1>

      {apps.length === 0 ? (
        <p className="text-gray-500">No pending applications 🎉</p>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="border rounded p-4 shadow-sm">
              <h3 className="font-semibold">{app.email}</h3>
              <p className="text-sm text-gray-600">
                {app.branch} • {app.graduationYear} • {app.orgName}
              </p>
              <a
                href={app.proofUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Proof Document
              </a>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleAction(app.id, "approve")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(app.id, "reject")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
