import { LucideGitCommitVertical } from "lucide-react";
import Link from "next/link";

export default function SharedLogo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="relative flex items-center space-x-2">
          <LucideGitCommitVertical className="h-6 w-auto rotate-210" />
          <div className="text-sm font-medium text-zinc-950 dark:text-white">
            alum-hub
          </div>
          <span className="mb-4 ml-0 rounded-sm bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-50 select-none">
            beta
          </span>
        </Link>
    </div>
  );
}
