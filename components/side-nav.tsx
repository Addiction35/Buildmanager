"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Building,
  Calendar,
  CreditCard,
  FileText,
  FolderOpen,
  Home,
  PieChart,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
  Plus,
  ChevronLeft,
  Briefcase,
  Clock,
  FileSpreadsheet,
  Layers,
} from "lucide-react"
import { useProject } from "@/contexts/project-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SideNavProps {
  isMobile?: boolean
  onNavItemClick?: () => void
  className?: string
}

export function SideNav({ isMobile = false, onNavItemClick, className }: SideNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { selectedProject, clearSelectedProject } = useProject()

  // Base navigation items (always visible) - Inspired by Buildern
  const baseItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: Briefcase,
    },
    {
      title: "Clients",
      href: "/dashboard/clients",
      icon: Users,
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  // Project-specific navigation items - Inspired by Buildern and Zoho Books
  const projectItems = selectedProject
    ? [
        {
          title: "Project Overview",
          href: `/dashboard/projects/${selectedProject.id}`,
          icon: Building,
        },
        {
          title: "Estimates",
          href: `/dashboard/projects/${selectedProject.id}/estimates`,
          icon: FileText,
        },
        {
          title: "Budget & Finance",
          href: `/dashboard/projects/${selectedProject.id}/budget`,
          icon: PieChart,
        },
        {
          title: "Purchase Orders",
          href: `/dashboard/projects/${selectedProject.id}/purchase-orders`,
          icon: ShoppingCart,
        },
        {
          title: "Labor & Wages",
          href: `/dashboard/projects/${selectedProject.id}/wages`,
          icon: Wallet,
        },
        {
          title: "Expenses",
          href: `/dashboard/projects/${selectedProject.id}/expenses`,
          icon: Receipt,
        },
        {
          title: "Proposals",
          href: `/dashboard/projects/${selectedProject.id}/proposals`,
          icon: FileSpreadsheet,
        },
        {
          title: "Schedule",
          href: `/dashboard/projects/${selectedProject.id}/schedule`,
          icon: Calendar,
        },
        {
          title: "Documents",
          href: `/dashboard/projects/${selectedProject.id}/documents`,
          icon: FolderOpen,
        },
        {
          title: "Time Tracking",
          href: `/dashboard/projects/${selectedProject.id}/time-tracking`,
          icon: Clock,
        },
      ]
    : []

  const handleNavItemClick = () => {
    if (onNavItemClick) {
      onNavItemClick()
    }
  }

  const handleCreateProject = () => {
    router.push("/dashboard/projects/new")
  }

  return (
    <div className={cn("h-screen w-full bg-background border-r", className)}>
      <ScrollArea className="h-full">
        <div className="flex flex-col h-full p-4 space-y-6">
          {/* Logo or App Name - Styled like Buildern */}
          <div className="flex items-center h-16">
            <div className="flex items-center gap-2">
              <Layers className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">BuildManager</h1>
            </div>
          </div>

          {/* Project Selection Section */}
          {selectedProject ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Current Project</h2>
                <Button variant="ghost" size="sm" onClick={clearSelectedProject}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h3 className="text-xl font-bold">{selectedProject.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {selectedProject.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{selectedProject.id}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Client: {selectedProject.client?.name || "No client assigned"}
                </p>
              </div>

              <Separator className="my-4" />

              {/* Project Navigation */}
              <div className="space-y-1">
                {projectItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavItemClick}
                    className={cn(
                      "sidebar-item",
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "sidebar-item-active"
                        : "sidebar-item-inactive",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted">
                <h3 className="font-medium">No Project Selected</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select an existing project or create a new one to access project-specific features.
                </p>
                <Button onClick={handleCreateProject} className="mt-4 w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Project
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard/projects")}>
                View All Projects
              </Button>
            </div>
          )}

          <Separator className="my-4" />

          {/* Base Navigation */}
          <div className="space-y-1">
            <h2 className="px-3 text-lg font-semibold">General</h2>
            {baseItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavItemClick}
                className={cn(
                  "sidebar-item",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "sidebar-item-active"
                    : "sidebar-item-inactive",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </div>

          {/* Payroll Section (always visible) - Zoho Books inspired */}
          <div className="space-y-1 pt-4">
            <h2 className="px-3 text-lg font-semibold">Finance</h2>
            <Link
              href="/dashboard/payroll"
              onClick={handleNavItemClick}
              className={cn(
                "sidebar-item",
                pathname === "/dashboard/payroll" || pathname.startsWith("/dashboard/payroll/")
                  ? "sidebar-item-active"
                  : "sidebar-item-inactive",
              )}
            >
              <CreditCard className="h-4 w-4" />
              Payroll
            </Link>
            <Link
              href="/dashboard/invoices"
              onClick={handleNavItemClick}
              className={cn(
                "sidebar-item",
                pathname === "/dashboard/invoices" || pathname.startsWith("/dashboard/invoices/")
                  ? "sidebar-item-active"
                  : "sidebar-item-inactive",
              )}
            >
              <FileText className="h-4 w-4" />
              Invoices
            </Link>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

