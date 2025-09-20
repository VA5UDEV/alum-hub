import Link from "next/link";
import { GitFork } from "lucide-react";
import SharedLogo from "@/components/shared-logo";
import { ModeToggle } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
  SignedOut,
  SignIn,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="relative top-0 z-10 bg-white px-6 py-5 lg:z-10 lg:flex lg:h-16 lg:items-center lg:px-8 lg:py-0 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-7xl">
        <SharedLogo />
        <div className="flex items-center space-x-6">
          <nav className="hidden items-center space-x-6 sm:flex">
            <Link
              href="/directory"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            >
              Directory
            </Link>
          </nav>
          <nav className="hidden items-center space-x-6 sm:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            >
              nav.2
            </Link>
          </nav>
          <nav className="hidden items-center space-x-6 sm:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            >
              nav.3
            </Link>
          </nav>
          <div className="hidden h-8 w-[0.5px] bg-zinc-200 sm:flex dark:bg-zinc-800" />
          <nav className="flex items-center space-x-2">
            <a
              href="https://github.com/VA5UDEV"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 items-center justify-center"
            >
              <GitFork className="h-4 w-4 fill-zinc-950 dark:fill-white" />
            </a>
          </nav>
          <ModeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "size-8" } }} />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
