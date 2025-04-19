import type React from "react"
import { SideNav } from "@/components/side-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ProjectProvider } from "@/contexts/project-context"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProjectProvider>
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <SideNav className="w-64 h-screen" />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="flex-1">
          <div className="flex h-16 items-center border-b px-4 md:px-6">
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
          <main className="flex-1 space-y-4 p-4 md:p-8">{children}</main>
          <footer className="border-t py-4 px-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Studio1:1. All rights reserved.</p>
          </footer>
        </div>
      </div>
      <Toaster />
    </ProjectProvider>
  )
}

