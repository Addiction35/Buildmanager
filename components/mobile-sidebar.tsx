"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Building,
  Calendar,
  DollarSign,
  FileText,
  FolderOpen,
  HardHat,
  Home,
  Menu,
  Receipt,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: Building,
  },
  {
    title: "Estimates",
    href: "/dashboard/estimates",
    icon: FileText,
  },
  {
    title: "Proposals",
    href: "/dashboard/proposals",
    icon: FileText,
  },
  {
    title: "Purchase Orders",
    href: "/dashboard/purchase-orders",
    icon: ShoppingCart,
  },
  {
    title: "Resources",
    href: "/dashboard/resources",
    icon: HardHat,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Wages & Payroll",
    href: "/dashboard/wages",
    icon: DollarSign,
  },
  {
    title: "Expenses",
    href: "/dashboard/expenses",
    icon: Receipt,
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FolderOpen,
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

export function MobileSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span className="font-bold">BuildPro</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col gap-2 p-4 overflow-y-auto">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-muted text-primary"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

