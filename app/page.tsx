import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import ThemeSwitch from "@/components/web/theme-switch";
import { GitFork, LucideGitCommitVertical } from "lucide-react";

export function Button({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const buttonVariants = {
    primary:
      "bg-zinc-50 border border-zinc-100 text-zinc-950 hover:bg-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:text-zinc-50 dark:border-zinc-900",
    secondary:
      "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-950",
  };

  return (
    <button
      className={`inline-flex items-center rounded-md px-2.5 py-1.5 text-sm ${buttonVariants[variant]}`}
    >
      {children}
    </button>
  );
}

export function Header() {
  return (
    <header className="relative top-0 z-10 bg-white px-6 py-5 lg:z-10 lg:flex lg:h-16 lg:items-center lg:px-8 lg:py-0 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto flex w-full items-center justify-between md:max-w-7xl">
        <Link href="/" className="relative flex items-center space-x-2">
          <LucideGitCommitVertical className="h-6 w-auto rotate-210" />
          <div className="text-sm font-medium text-zinc-950 dark:text-white">
            alum-hub
          </div>
          <span className="mb-4 ml-0 rounded-sm bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-50 select-none">
            beta
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <nav className="hidden items-center space-x-6 sm:flex">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
            >
              nav.1
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
            <ThemeSwitch />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default function Page() {
  return (
    <>
    <Header />
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              A Unified Alumni Association Platform
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join our vibrant alumni community and unlock a world of
              opportunities. Update your profile, connect with peers, and
              contribute to your alma mater.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Join Now
              </Link>
            </div>
          </div>
          <img
            src="https://sheatcollege.com/wp-content/uploads/2022/05/istockphoto-639698498-612x612-1.jpg"
            width="550"
            height="550"
            alt="Alumni Photo"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Connect with Your Peers
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore job opportunities, access the alumni directory, and
              network with fellow graduates.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Join the Network
            </Link>
            <Link
              href="/directory"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              View Alumni Directory
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Inspiring Alumni Stories
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how our alumni have made a lasting impact in their
              communities and beyond.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col gap-4">
              <CardHeader>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKUTyuU7FkV460KpKlwZDkJC_8qbokMfweA&s"
                  width="64"
                  height="64"
                  alt="Alumni"
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-muted-foreground">CEO, Acme Inc.</p>
                <p className="text-sm text-muted-foreground">
                  John is a successful entrepreneur who founded Acme Inc. after
                  graduating from our college. He is a strong supporter of the
                  alumni association and mentors current students.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4">
              <CardHeader>
                <img
                  src="data:image/jpeg;base64,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"
                  width="64"
                  height="64"
                  alt="Alumni"
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">Jane Smith</h3>
                <p className="text-muted-foreground">
                  Professor, University of XYZ
                </p>
                <p className="text-sm text-muted-foreground">
                  Jane is a respected professor who has made significant
                  contributions to her field. She is actively involved in the
                  alumni association and frequently speaks at campus events.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col gap-4">
              <CardHeader>
                <img
                  src="data:image/jpeg;base64,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"
                  width="64"
                  height="64"
                  alt="Alumni"
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-bold">Michael Johnson</h3>
                <p className="text-muted-foreground">Founder, Startup XYZ</p>
                <p className="text-sm text-muted-foreground">
                  Michael is a successful entrepreneur who founded a thriving
                  startup after graduating from our college. He is a mentor to
                  current students and an active member of the alumni
                  association.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 AlumHub. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
