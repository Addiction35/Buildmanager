import Link from "next/link"
import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, you'd check authentication here
  // If not authenticated, show landing page
  // If authenticated, redirect to dashboard
  redirect("/dashboard")

  return (
    <div className="flex min-h-screen flex-col">
      {/* This would be your landing page if not redirecting */}
      <main className="flex-1">
        <div className="container flex flex-col items-center justify-center space-y-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Construction Management Software for Studio1:1
          </h1>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Streamline your construction projects with our comprehensive management solution
          </p>
          <div className="space-x-4">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Get Started
            </Link>
            <Link
              href="/about"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

