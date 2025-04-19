"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useProject } from "@/contexts/project-context"
import {
  BarChart,
  Building,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  Folder,
  Home,
  LayoutDashboard,
  Menu,
  PieChart,
  Plus,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { selectedProject, clearSelectedProject } = useProject()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex h-14 items-center border-b px-4">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Building className="h-5 w-5" />
          <span>Construction Manager</span>
        </Link>
      </div>
      <SheetContent side="left" className="p-0">
        <div className="border-b px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
            <Building className="h-5 w-5" />
            <span>Construction Manager</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-57px)]">
          <div className="px-3 py-4">
            {selectedProject ? (
              <>
                {/* Project header */}
                <div className="mb-6 px-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{selectedProject.name}</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        clearSelectedProject()
                        setOpen(false)
                      }}
                      title="Return to dashboard"
                    >
                      <Home className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="block">ID: {selectedProject.id}</span>
                    <span className="block">Client: {selectedProject.client.name}</span>
                  </div>
                </div>

                {/* Project navigation */}
                <div className="space-y-1">
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === `/dashboard/projects/${selectedProject.id}`
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Project Overview
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/estimates`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/estimates`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <FileText className="h-4 w-4" />
                    Estimates
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/budget`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/budget`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <PieChart className="h-4 w-4" />
                    Budget
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/purchase-orders`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/purchase-orders`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Purchase Orders
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/wages`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/wages`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Wages
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/expenses`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/expenses`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Receipt className="h-4 w-4" />
                    Expenses
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/proposals`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/proposals`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <ClipboardList className="h-4 w-4" />
                    Proposals
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/schedule`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/schedule`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule
                  </Link>
                  <Link
                    href={`/dashboard/projects/${selectedProject.id}/documents`}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith(`/dashboard/projects/${selectedProject.id}/documents`)
                        ? "bg-accent text-accent-foreground"
                        : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Folder className="h-4 w-4" />
                    Documents
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Main navigation when no project is selected */}
                <div className="mb-4 px-3">
                  <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">No Project Selected</h2>
                    <Button variant="outline" size="sm" asChild onClick={() => setOpen(false)}>
                      <Link href="/dashboard/projects/new">
                        <Plus className="mr-2 h-3 w-3" />
                        New Project
                      </Link>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Select or create a project to access project-specific features
                  </p>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === "/dashboard" ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/projects"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === "/dashboard/projects" ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Building className="h-4 w-4" />
                    Projects
                  </Link>
                  <Link
                    href="/dashboard/clients"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith("/dashboard/clients") ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Users className="h-4 w-4" />
                    Clients
                  </Link>
                  <Link
                    href="/dashboard/reports"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith("/dashboard/reports") ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <BarChart className="h-4 w-4" />
                    Reports
                  </Link>
                </div>

                <div className="mt-6 space-y-1">
                  <p className="px-3 text-xs font-medium text-muted-foreground">Company</p>
                  <Link
                    href="/dashboard/payroll"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith("/dashboard/payroll") ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <CreditCard className="h-4 w-4" />
                    Payroll
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname.startsWith("/dashboard/settings") ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

