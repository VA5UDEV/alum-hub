import { LucideGitCommitVertical } from "lucide-react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      className={`h-6 w-auto rotate-210 ${className}`}
    >
      <LucideGitCommitVertical />
    </div>
  );
}
